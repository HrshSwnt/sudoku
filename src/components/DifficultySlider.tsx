interface Props {
    value: number;
    onChange: (value: number) => void;
}

export default function DifficultySlider({ value, onChange }: Props) {
    const min = 17;
    const max = 55;

    const difficultyMarks = [
        { label: 'Very Hard', percent: 0 },
        { label: 'Hard', percent: 25 },
        { label: 'Medium', percent: 50 },
        { label: 'Easy', percent: 75 },
        { label: 'Very Easy', percent: 100 },
    ];

    const percentToValue = (percent: number) =>
        Math.round(min + (percent / 100) * (max - min));

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty (Pre-filled Cells): <strong>{value}</strong>
            </label>

            <div className="relative w-full pb-10">
                {/* Slider track */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full appearance-none h-2 bg-gray-300 rounded"
                />

                {/* Markers */}
                <div className="absolute top-5 left-0 right-0 h-10 pointer-events-none">
                    {difficultyMarks.map((mark, i) => (
                        <div
                            key={i}
                            style={{ left: `${mark.percent}%`, transform: 'translateX(-50%)' }}
                            className="absolute flex flex-col items-center pointer-events-auto cursor-pointer group"
                            onClick={() => onChange(percentToValue(mark.percent))}
                        >
                            <div className="w-px h-3 bg-gray-500" />
                            <div className="text-[10px] text-gray-600 group-hover:font-semibold mt-0.5 whitespace-nowrap">
                                {mark.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
