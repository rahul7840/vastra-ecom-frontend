import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import BaseProvider from '@/providers/base-provider';
import 'swiper/swiper-bundle.css';
import 'react-toastify/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const fraunces = Fraunces({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-fraunces',
});

export const metadata: Metadata = {
	title: 'Vastra',
	description: 'Vastra',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={fraunces.variable}>
			<link
				rel='stylesheet'
				href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
			/>
			<body className={inter.className}>
				<BaseProvider>{children}</BaseProvider>
			</body>
		</html>
	);
}
