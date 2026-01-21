import { Certification, ChartTooltipProps } from "@/types";

export const ChartTooltip = ({ active, payload }: ChartTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload as Certification;
        return (
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-slate-700 p-3 rounded-lg shadow-xl text-gray-900 dark:text-slate-100 text-sm z-50">
                <p className="font-bold mb-1 text-gray-900 dark:text-slate-100">{data.abbreviation}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{data.title}</p>
                <div className="flex flex-col gap-1 text-xs text-gray-600 dark:text-slate-300">
                    <div className="flex gap-2 justify-between">
                        <span>Market: {data.market_presence}</span>
                        <span>Sat: {data.satisfaction}</span>
                    </div>
                    <div>Votes: {data.total_votes}</div>
                </div>
            </div>
        );
    }
    return null;
};
