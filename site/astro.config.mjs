// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://bennie-ng.github.io',
	base: '/AgCel',
	integrations: [
		starlight({
			title: 'AgCel',
			social: [
				{
					label: 'GitHub',
					icon: 'github',
					href: 'https://github.com/bennie-ng/AgCel',
				},
			],
			sidebar: [
				{
					label: 'Start Here',
					items: [
						{ label: 'Introduction', slug: 'intro' },
						{ label: 'Installation', slug: 'installation' },
					],
				},
				{
					label: 'Workflows',
					autogenerate: { directory: 'workflows' },
				},
				{
					label: 'Skills',
					autogenerate: { directory: 'skills' },
				},
				{
					label: 'References',
					items: [
						{ label: 'CLI Commands', slug: 'reference/cli' },
						{ label: 'Rule System', slug: 'concepts/rules' },
					],
				},
			],
		}),
	],
});
