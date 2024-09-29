import { Footer } from '@/components/layouts/footer/Footer';
import { Navbar } from '@/components/layouts/navbar/Navbar';

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
}
