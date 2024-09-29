import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				fraunces: ['var(--font-fraunces)'],
			},
			colors: {
				colors: {
					themeColor: 'rgba(33, 33, 33, 1)',
					fontColor: 'rgba(34, 34, 34, 1)',
					grayFont: 'rgba(158, 158, 158, 1)',
					darkGrayFont: 'rgba(117, 117, 117, 1)',
					grayBorder: 'rgba(117, 117, 117, 1)',
				},
			},
			boxShadow: {
				'custom-1':
					'3px 4px 10px 0px #00000003, 11px 15px 18px 0px #00000003, 25px 34px 25px 0px #00000003,   44px 60px 30px 0px #00000000,   68px 93px 32px 0px #00000000',
			},
		},
	},
	plugins: [],
};
export default config;
