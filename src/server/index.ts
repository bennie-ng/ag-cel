import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { getAgCelDir } from '../utils/index.js';

// Argument parsing for transport mode
const args = process.argv.slice(2);
const modeIndex = args.indexOf('--mode');
const mode = modeIndex !== -1 ? args[modeIndex + 1] : 'stdio'; // Default to stdio if not specified

const server = new Server(
    {
        name: "ag-cel",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
            resources: {}
        },
    }
);

// Helper to load skills
function getSkills() {
    const agCelDir = getAgCelDir();
    const skillsDir = path.join(agCelDir, 'skills');
    if (!fs.existsSync(skillsDir)) return [];

    return fs.readdirSync(skillsDir).filter(skill => {
        return fs.statSync(path.join(skillsDir, skill)).isDirectory() && fs.existsSync(path.join(skillsDir, skill, 'SKILL.md'));
    });
}

// List Tools Handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
    const skills = getSkills();
    const tools = skills.map(skill => {
        return {
            name: skill,
            description: `Retrieve instructions for the ${skill} skill`,
            inputSchema: {
                type: "object",
                properties: {
                    instruction: {
                        type: "string",
                        description: "Context or specific requirements for retrieving the skill"
                    }
                },
                required: ["instruction"]
            }
        };
    });

    return {
        tools: tools
    };
});

// Call Tool Handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const skills = getSkills();

    if (skills.includes(name)) {
        const agCelDir = getAgCelDir();
        const skillPath = path.join(agCelDir, 'skills', name, 'SKILL.md');

        if (fs.existsSync(skillPath)) {
            const content = fs.readFileSync(skillPath, 'utf-8');
            const ironRule = `
## Iron Rules
1. If there is anything unclear, ask the user instead of inventing new stuff. Unless the user explicitly tells the AI to invent or suggest ideas.
`;
            return {
                content: [
                    {
                        type: "text",
                        text: content + ironRule
                    }
                ]
            };
        }
    }

    throw new Error(`Tool not found: ${name}`);
});

// List Resources Handler
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const skills = getSkills();
    const resources = skills.map(skill => ({
        uri: `ag-cel://skills/${skill}/SKILL.md`,
        name: `${skill} Documentation`,
        mimeType: "text/markdown"
    }));

    return { resources };
});

// Read Resource Handler
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    const match = uri.match(/^ag-cel:\/\/skills\/([^\/]+)\/SKILL.md$/);

    if (match) {
        const skill = match[1];
        const agCelDir = getAgCelDir();
        const skillPath = path.join(agCelDir, 'skills', skill, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
            const content = fs.readFileSync(skillPath, 'utf-8');
            return {
                contents: [{ uri, mimeType: "text/markdown", text: content }]
            };
        }
    }

    throw new Error(`Resource not found: ${uri}`);
});

async function main() {
    if (mode === 'sse') {
        const app = express();
        app.use(cors());

        const agCelDir = getAgCelDir();
        const configPath = path.join(agCelDir, 'config.json');
        let port = 3000;

        if (fs.existsSync(configPath)) {
            try {
                const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
                if (config.port) port = config.port;
            } catch (e) {
                console.error("Failed to read config:", e);
            }
        }

        let transport: SSEServerTransport;

        app.get('/sse', async (req, res) => {
            transport = new SSEServerTransport('/message', res);
            await server.connect(transport);
        });

        app.post('/message', async (req, res) => {
            if (transport) {
                await transport.handlePostMessage(req, res);
            } else {
                res.status(404).json({ error: "Session not found" });
            }
        });

        app.listen(port, () => {
            console.log(`Ag-Cel MCP Server running on SSE at http://localhost:${port}/sse`);
        });

    } else {
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error("Ag-Cel MCP Server running on stdio");
    }
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
