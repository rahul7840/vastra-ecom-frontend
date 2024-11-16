import { ProtectedRoute } from '@/modules/common/components/ProtectedRoute';
import { AddressTemplate } from '@/modules/dashboard/template/addresses';

export default function Addresses() {
	return (
		// <ProtectedRoute>
		<AddressTemplate />
		// {/* </ProtectedRoute> */}
	);
}
