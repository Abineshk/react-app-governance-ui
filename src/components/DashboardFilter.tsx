import { CustomSelect } from './reusable/CustomSelect';

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
        { value: '7', label: 'Last 7 Days' },
        { value: '30', label: 'Last 30 Days' },
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

            <CustomSelect
                label="Timeline"
                options={timelineOptions}
                value={timeline}
                onChange={setTimeline}
            />
        </div>
    );
}