import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { CustomSelect } from './reusable/CustomSelect';
import { TimelineSlider } from './TimelineSlider';

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
        { value: '1-5', label: '1-5 D', icon: Clock },
        { value: '6-30', label: '6-30 D', icon: Calendar },
        { value: '31-90', label: '31-90 D', icon: TrendingUp },
    ];

    return (
        <div className="flex gap-4 flex-wrap lg:items-end flex-grow lg:justify-end">
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

            {/* <TimelineButtonGroup timeLineOptions={timelineOptions} value={timeline} onChange={(days) => setTimeline(days.toString())} /> */}
            <TimelineSlider value={timeline} onChange={setTimeline} />
        </div>
    );
}