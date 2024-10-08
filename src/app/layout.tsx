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
			<body className={inter.className}>
				<BaseProvider>{children}</BaseProvider>
			</body>
		</html>
	);
}
