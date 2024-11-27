import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/(pages)/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/modules/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			xs: '320px',
			sm: '576px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1440px',
		},
		extend: {
			fontFamily: {
				fraunces: ['var(--font-fraunces)'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
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
