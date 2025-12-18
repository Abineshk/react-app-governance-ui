import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { CustomSelect } from './reusable/CustomSelect';
import { TimelineButtonGroup } from './TimeLineButtonGroup';

interface DashboardFiltersProps {
    category: string;
    setCategory: (value: string) => void;
    owner: string;
    setOwner: (value: string) => void;
    timeline: string;
    setTimeline: (value: string) => void;
}

export function DashboardFilters({
    category,
    setCategory,
    owner,
    setOwner,
    timeline,
    setTimeline,
}: DashboardFiltersProps) {
    const categoryOptions = [
        { value: 'all', label: 'All Categories' },
        { value: 'iimDelivery', label: 'IIM Delivery' },
        { value: 'category1', label: 'Category 1' },
        { value: 'category2', label: 'Category 2' },
    ];

    const ownerOptions = [
        { value: 'all', label: 'All Owners' },
        { value: 'owner1', label: 'Owner 1' },
        { value: 'owner2', label: 'Owner 2' },
    ];

    const timelineOptions = [
        { value: '7', label: '7D', icon: Clock },
        { value: '30', label: '30D', icon: Calendar },
        { value: '90', label: '90D', icon: TrendingUp },
    ];

    return (
        <div className="flex gap-3 flex-wrap">
            <CustomSelect
                label="Category"
                options={categoryOptions}
                value={category}
                onChange={setCategory}
            />

            <CustomSelect
                label="Application Owner"
                options={ownerOptions}
                value={owner}
                onChange={setOwner}
            />

            {/* <CustomSelect
                label="Timeline"
                options={timelineOptions}
                value={timeline}
                onChange={setTimeline}
            /> */}

            <TimelineButtonGroup timeLineOptions={timelineOptions} value={timeline} onChange={(days) => setTimeline(days.toString())} />

        </div>
    );
}