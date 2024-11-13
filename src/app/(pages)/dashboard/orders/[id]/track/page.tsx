import { TrackingTimeline } from '@/modules/dashboard/template/tracking';

interface TrackPageProps {
	params: {
		id: string;
	};
}

export default function TrackPage({ params }: TrackPageProps) {
	return <TrackingTimeline id={params.id} />;
}
