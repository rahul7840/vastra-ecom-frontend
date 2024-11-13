import { Icon } from '@/modules/common/components/Icon';

// ... (keep your TRACKING_DATA const)
const TRACKING_DATA = {
	tracking_data: {
		track_status: 1,
		shipment_status: 7,
		shipment_track: [
			{
				id: 236612717,
				awb_code: '141123221084922',
				courier_name: 'Xpressbees Surface',
				pickup_date: '2022-07-18 20:28:00',
				delivered_date: '2022-07-19 11:37:00',
				current_status: 'Delivered',
				origin: 'Banglore',
				destination: 'Chittoor',
				edd: null,
			},
		],
		shipment_track_activities: [
			{
				date: '2022-07-19 11:37:00',
				status: 'DLVD',
				activity: 'Delivered',
				location: 'MADANPALLI, Madanapalli, ANDHRA PRADESH',
				'sr-status': '7',
				'sr-status-label': 'DELIVERED',
			},
			{
				date: '2022-07-19 08:57:00',
				status: 'OFD',
				activity:
					'Out for Delivery Out for delivery: 383439-Nandinayani Reddy Bhaskara Sitics Logistics  (356231) (383439)-PDS22200085719383439-FromMob , MobileNo:- 9963133564',
				location: 'MADANPALLI, Madanapalli, ANDHRA PRADESH',
				'sr-status': '17',
				'sr-status-label': 'OUT FOR DELIVERY',
			},
			{
				date: '2022-07-19 07:33:00',
				status: 'RAD',
				activity:
					'Reached at Destination Shipment BagOut From Bag : nxbg03894488',
				location: 'MADANPALLI, Madanapalli, ANDHRA PRADESH',
				'sr-status': '38',
				'sr-status-label': 'REACHED AT DESTINATION HUB',
			},
			{
				date: '2022-07-18 21:02:00',
				status: 'IT',
				activity: 'InTransit Shipment added in Bag nxbg03894488',
				location: 'BLR/FC1, BANGALORE, KARNATAKA',
				'sr-status': '18',
				'sr-status-label': 'IN TRANSIT',
			},
			{
				date: '2022-07-18 20:28:00',
				status: 'PKD',
				activity: 'Picked Shipment InScan from Manifest',
				location: 'BLR/FC1, BANGALORE, KARNATAKA',
				'sr-status': '6',
				'sr-status-label': 'SHIPPED',
			},
			{
				date: '2022-07-18 13:50:00',
				status: 'PUD',
				activity: 'PickDone ',
				location: 'RTO/CHD, BANGALORE, KARNATAKA',
				'sr-status': '42',
				'sr-status-label': 'PICKED UP',
			},
			{
				date: '2022-07-18 10:04:00',
				status: 'OFP',
				activity: 'Out for Pickup ',
				location: 'RTO/CHD, BANGALORE, KARNATAKA',
				'sr-status': '19',
				'sr-status-label': 'OUT FOR PICKUP',
			},
			{
				date: '2022-07-18 09:51:00',
				status: 'DRC',
				activity: 'Pending Manifest Data Received',
				location: 'RTO/CHD, BANGALORE, KARNATAKA',
				'sr-status': 'NA',
				'sr-status-label': 'NA',
			},
		],
		track_url: 'https://shiprocket.co//tracking/141123221084922',
		etd: '2022-07-20 19:28:00',
	},
};

const TRACKING_STEPS = [
	{
		key: 'ORDER_RECEIVED',
		label: 'Order Received',
		matchStatus: ['DRC'], // Manifest received
		icon: 'inventory',
	},
	{
		key: 'ORDER_PICKED',
		label: 'Order Picked',
		matchStatus: ['OFP', 'PUD', 'PKD'], // Out for Pickup, Picked up, Picked
		icon: 'inventory_2',
	},
	{
		key: 'IN_TRANSIT',
		label: 'In Transit',
		matchStatus: ['IT', 'RAD'], // In Transit, Reached at Destination
		icon: 'local_shipping',
	},
	{
		key: 'OUT_FOR_DELIVERY',
		label: 'Out for Delivery',
		matchStatus: ['OFD'], // Out for Delivery
		icon: 'delivery_dining',
	},
	{
		key: 'DELIVERED',
		label: 'Delivered',
		matchStatus: ['DLVD'], // Delivered
		icon: 'check_circle',
	},
];

export const TrackingTimeline = ({ id }: { id: string }) => {
	const trackInfo = TRACKING_DATA.tracking_data.shipment_track[0];
	const activities = TRACKING_DATA.tracking_data.shipment_track_activities;

	// Enhanced getCurrentStep to handle the new steps
	const getCurrentStep = () => {
		const latestActivity = activities[0];

		// Find the matching step index
		const currentStep = TRACKING_STEPS.findIndex((step) =>
			step.matchStatus.includes(latestActivity.status)
		);

		// If no match found, determine based on status progression
		if (currentStep === -1) {
			if (latestActivity.status === 'NA') return 0; // Order Received
			if (['OFP', 'PUD', 'PKD'].includes(latestActivity.status)) return 1; // Order Picked
			if (['IT', 'RAD'].includes(latestActivity.status)) return 2; // In Transit
			if (latestActivity.status === 'OFD') return 3; // Out for Delivery
			if (latestActivity.status === 'DLVD') return 4; // Delivered
			return 0; // Default to Order Received
		}

		return currentStep;
	};

	const currentStep = getCurrentStep();

	// Get status label for activity
	const getActivityStatus = (activity: any) => {
		const step = TRACKING_STEPS.find((step) =>
			step.matchStatus.includes(activity.status)
		);

		if (step) return step.label;

		// Map other statuses
		switch (activity.status) {
			case 'NA':
				return 'Order Received';
			case 'OFP':
				return 'Pickup Scheduled';
			case 'PUD':
				return 'Picked Up';
			case 'PKD':
				return 'Package Picked';
			case 'IT':
				return 'In Transit';
			case 'RAD':
				return 'Reached Destination';
			case 'OFD':
				return 'Out for Delivery';
			case 'DLVD':
				return 'Delivered';
			default:
				return activity['sr-status-label'];
		}
	};

	// Get status color
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'DLVD':
				return 'bg-green-100 text-green-600';
			case 'OFD':
				return 'bg-blue-100 text-blue-600';
			case 'IT':
			case 'RAD':
				return 'bg-yellow-100 text-yellow-600';
			case 'PKD':
			case 'PUD':
			case 'OFP':
				return 'bg-purple-100 text-purple-600';
			default:
				return 'bg-gray-100 text-gray-600';
		}
	};

	return (
		<div className='px-6 py-6'>
			{/* Tracking Overview */}
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
				<div className='p-4 bg-gray-50 rounded-lg'>
					<p className='text-sm text-gray-600 mb-1'>AWB Number</p>
					<p className='font-medium'>{trackInfo.awb_code}</p>
				</div>
				<div className='p-4 bg-gray-50 rounded-lg'>
					<p className='text-sm text-gray-600 mb-1'>Courier</p>
					<p className='font-medium'>{trackInfo.courier_name}</p>
				</div>
				<div className='p-4 bg-gray-50 rounded-lg'>
					<p className='text-sm text-gray-600 mb-1'>Current Status</p>
					<p className='font-medium'>{TRACKING_STEPS[currentStep].label}</p>
				</div>
				<div className='p-4 bg-gray-50 rounded-lg'>
					<p className='text-sm text-gray-600 mb-1'>Expected Delivery</p>
					<p className='font-medium'>
						{trackInfo.delivered_date
							? new Date(trackInfo.delivered_date).toLocaleDateString()
							: new Date(TRACKING_DATA.tracking_data.etd).toLocaleDateString()}
					</p>
				</div>
			</div>

			{/* Progress Steps - Updated with new steps */}
			<div className='relative mb-12'>
				<div className='flex justify-between items-center'>
					{TRACKING_STEPS.map((step, index) => (
						<div
							key={step.key}
							className='flex flex-col items-center relative z-10'
						>
							<div
								className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${
									index <= currentStep
										? 'bg-primary text-white'
										: 'bg-gray-100 text-gray-400'
								}
              `}
							>
								<Icon name={step.icon} className='text-xl' />
							</div>
							<p
								className={`
                mt-2 text-sm font-medium text-center
                ${index <= currentStep ? 'text-primary' : 'text-gray-400'}
              `}
							>
								{step.label}
							</p>
						</div>
					))}
				</div>
				{/* Progress Line */}
				<div className='absolute top-5 left-8 right-4 h-[2px] bg-gray-200 -z-0'>
					<div
						className='h-full bg-primary transition-all duration-500'
						style={{
							width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%`,
						}}
					/>
				</div>
			</div>

			{/* Latest Activities - Updated with new status labels */}
			<div className='space-y-4'>
				{activities.slice(0, 3).map((activity, index) => (
					<div key={index} className='p-4 bg-gray-50 rounded-lg'>
						<div className='flex justify-between items-start'>
							<div>
								<p className='font-medium'>{activity.activity}</p>
								<p className='text-sm text-gray-600'>{activity.location}</p>
								<p className='text-sm text-gray-500 mt-1'>
									{new Date(activity.date).toLocaleString()}
								</p>
							</div>
							<span
								className={`
                text-xs px-2 py-1 rounded-full
                ${getStatusColor(activity.status)}
              `}
							>
								{getActivityStatus(activity)}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
