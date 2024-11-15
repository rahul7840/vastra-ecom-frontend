import { ProtectedRoute } from '@/modules/common/components/ProtectedRoute';

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <ProtectedRoute>{children}</ProtectedRoute>;
}
