import { useEffect, useRef, useState } from "react";

const OPTIONS = [
    { label: "7d", value: 7 },
    { label: "30d", value: 30 },
    { label: "90d", value: 90 },
];

export default function DaysProgressSelector({
    defaultValue = 30,
    onChange,
}: {
    defaultValue?: number;
    onChange: (days: number) => void;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(
        OPTIONS.findIndex((o) => o.value === defaultValue)
    );
    const [dragging, setDragging] = useState(false);

    const percent = (index / (OPTIONS.length - 1)) * 100;

    const updateByPosition = (clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const ratio = Math.min(Math.max(x / rect.width, 0), 1);
        const newIndex = Math.round(ratio * (OPTIONS.length - 1));
        setIndex(newIndex);
        onChange(OPTIONS[newIndex].value);
    };

    // Mouse + touch listeners
    useEffect(() => {
        const move = (e: MouseEvent | TouchEvent) => {
            if (!dragging) return;
            const clientX =
                "touches" in e ? e.touches[0].clientX : e.clientX;
            updateByPosition(clientX);
        };

        const stop = () => setDragging(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("touchmove", move);
        window.addEventListener("mouseup", stop);
        window.addEventListener("touchend", stop);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("touchmove", move);
            window.removeEventListener("mouseup", stop);
            window.removeEventListener("touchend", stop);
        };
    }, [dragging]);

    // Keyboard accessibility
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight" && index < OPTIONS.length - 1) {
            setIndex((i) => i + 1);
            onChange(OPTIONS[index + 1].value);
        }
        if (e.key === "ArrowLeft" && index > 0) {
            setIndex((i) => i - 1);
            onChange(OPTIONS[index - 1].value);
        }
    };

    return (
        <div className="w-full max-w-md">
            {/* Labels */}
            <div className="flex justify-between text-xs text-gray-500 mb-2">
                {OPTIONS.map((o) => (
                    <span key={o.value}>{o.label}</span>
                ))}
            </div>

            {/* Track */}
            <div
                ref={trackRef}
                className="relative h-2 rounded-full bg-gray-200 cursor-pointer"
                onClick={(e) => updateByPosition(e.clientX)}
            >
                {/* Animated Gradient Fill */}
                <div
                    className="absolute h-2 rounded-full transition-all duration-300
                     bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
                    style={{ width: `${percent}%` }}
                />

                {/* Knob */}
                <div
                    role="slider"
                    tabIndex={0}
                    aria-valuemin={0}
                    aria-valuemax={OPTIONS.length - 1}
                    aria-valuenow={index}
                    onKeyDown={handleKeyDown}
                    onMouseDown={() => setDragging(true)}
                    onTouchStart={() => setDragging(true)}
                    className="absolute top-1/2 w-5 h-5 bg-white border-2 border-indigo-600
                     rounded-full shadow-md -translate-y-1/2
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                        left: `${percent}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {/* Tooltip */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2
                          bg-indigo-600 text-white text-xs px-2 py-1 rounded
                          whitespace-nowrap">
                        {OPTIONS[index].label}
                    </div>
                </div>
            </div>

            {/* Selected text */}
            <p className="mt-3 text-sm font-medium text-gray-700">
                Showing data for{" "}
                <span className="text-indigo-600 font-semibold">
                    {OPTIONS[index].value} days
                </span>
            </p>
        </div>
    );
}
