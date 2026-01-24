import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "AgCel",
  description: "Automated Governance Layer for AI Agents",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Global Rules', link: '/rules/global' },
      { text: 'Roles', link: '/roles/developer' },
    ],

    sidebar: {
      '/rules/': [
        {
          text: 'AgCel Rules',
          items: [
            { text: 'Global Rules', link: '/rules/global' },
            { text: 'Java / Spring Boot', link: '/rules/springboot' },
            { text: 'Python', link: '/rules/python' },
            { text: 'Node.js', link: '/rules/nodejs' },
            { text: 'React', link: '/rules/react' },
            { text: 'Mobile', link: '/rules/mobile' },
            { text: 'Database', link: '/rules/database' }
          ]
        }
      ],
      '/roles/': [
        {
          text: 'Roles',
          items: [
            { text: 'Developer', link: '/roles/developer' },
            { text: 'Product Owner', link: '/roles/product-owner' },
            { text: 'Tester / QA', link: '/roles/tester' },
            { text: 'Business Analyst', link: '/roles/business-analyst' },
            { text: 'Market Researcher', link: '/roles/market-researcher' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hoangna1204/ag-cel' }
    ]
  }
})
