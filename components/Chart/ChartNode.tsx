import { ChartNodeProps } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

export const ChartNode = (props: ChartNodeProps) => {
    const { cx, cy, fill, payload, onClick } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isMobile = useIsMobile();

    if (!payload || cx === undefined || cy === undefined) return null;

    return (
        <g onClick={() => onClick && onClick(props)} className="text-slate-400 dark:text-slate-400">
            {/* Larger invisible hit area for mobile */}
            {isMobile && <circle cx={cx} cy={cy} r={20} fill="transparent" className="cursor-pointer" />}

            <circle cx={cx} cy={cy} r={isMobile ? 8 : 6} fill={fill} className="stroke-gray-100 dark:stroke-slate-50 cursor-pointer hover:opacity-80 transition-opacity" strokeWidth={1} />
            <text x={cx} y={cy + 15} textAnchor="middle" className="fill-gray-500 dark:fill-slate-400 pointer-events-none select-none font-medium" fontSize={isMobile ? 11 : 10}>
                {payload.abbreviation}
            </text>
        </g>
    );
};
