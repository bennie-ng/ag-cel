import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const siteDocs = path.join(__dirname, 'src/content/docs');

// Sync Skills
const skillsSource = path.join(projectRoot, 'skills');
const skillsDest = path.join(siteDocs, 'skills');

if (fs.existsSync(skillsDest)) fs.rmSync(skillsDest, { recursive: true });
fs.mkdirSync(skillsDest, { recursive: true });

// Copy skills recursively
function copySkills(source, dest) {
    if (!fs.existsSync(source)) return;
    const items = fs.readdirSync(source, { withFileTypes: true });

    items.forEach(item => {
        const srcPath = path.join(source, item.name);
        if (item.isDirectory()) {
            const destPath = path.join(dest, item.name);
            fs.mkdirSync(destPath, { recursive: true });
            copySkills(srcPath, destPath);
        } else if (item.name === 'SKILL.md') {
            const destPath = path.join(dest, 'index.md');
            let content = fs.readFileSync(srcPath, 'utf8');
            if (content.startsWith('---')) {
                const frontMatterEnd = content.indexOf('---', 3);
                if (frontMatterEnd !== -1) {
                    const frontMatter = content.slice(3, frontMatterEnd);
                    if (!frontMatter.includes('title:')) {
                        const title = path.basename(source);
                        const newFrontMatter = `title: ${title}\n` + frontMatter;
                        content = `---${newFrontMatter}---` + content.slice(frontMatterEnd + 3);
                    }
                }
            } else {
                const title = path.basename(source);
                content = `---\ntitle: ${title}\n---\n\n` + content;
            }
            fs.writeFileSync(destPath, content);
        } else if (item.name.endsWith('.md')) {
            const destPath = path.join(dest, item.name);
            let content = fs.readFileSync(srcPath, 'utf8');

            if (content.startsWith('---')) {
                const frontMatterEnd = content.indexOf('---', 3);
                if (frontMatterEnd !== -1) {
                    const frontMatter = content.slice(3, frontMatterEnd);
                    if (!frontMatter.includes('title:')) {
                        const title = item.name.replace('.md', '');
                        const newFrontMatter = `title: ${title}\n` + frontMatter;
                        content = `---${newFrontMatter}---` + content.slice(frontMatterEnd + 3);
                    }
                }
            } else {
                const title = item.name.replace('.md', '');
                content = `---\ntitle: ${title}\n---\n\n` + content;
            }
            fs.writeFileSync(destPath, content);
        }
    });
}

console.log('Syncing Skills...');
copySkills(skillsSource, skillsDest);


// Sync Workflows
const workflowsSource = path.join(projectRoot, '.agent/workflows');
const workflowsDest = path.join(siteDocs, 'workflows');

if (fs.existsSync(workflowsDest)) fs.rmSync(workflowsDest, { recursive: true });
fs.mkdirSync(workflowsDest, { recursive: true });

console.log('Syncing Workflows...');
const workflows = fs.readdirSync(workflowsSource).filter(f => f.endsWith('.md'));
workflows.forEach(file => {
    const srcPath = path.join(workflowsSource, file);
    const destPath = path.join(workflowsDest, file);
    let content = fs.readFileSync(srcPath, 'utf8');

    if (content.startsWith('---')) {
        const frontMatterEnd = content.indexOf('---', 3);
        if (frontMatterEnd !== -1) {
            const frontMatter = content.slice(3, frontMatterEnd);
            if (!frontMatter.includes('title:')) {
                const title = file.replace('.md', '');
                const newFrontMatter = `title: ${title}\n` + frontMatter;
                content = `---${newFrontMatter}---` + content.slice(frontMatterEnd + 3);
            }
        }
    } else {
        const title = file.replace('.md', '');
        content = `---\ntitle: ${title}\n---\n\n` + content;
    }
    fs.writeFileSync(destPath, content);
});

console.log('Sync complete.');
