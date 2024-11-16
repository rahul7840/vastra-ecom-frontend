import { DashboardTemplate } from '@/modules/dashboard/template';
import { ProtectedRoute } from '@/modules/common/components/ProtectedRoute';

export default function DashboardPage() {
	return (
		<ProtectedRoute>
			<DashboardTemplate />
		</ProtectedRoute>
	);
}
