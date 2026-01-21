import { ChartNodeProps } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

export const ChartNode = (props: ChartNodeProps) => {
    const { cx, cy, fill, payload, onClick } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isMobile = useIsMobile();

    if (!payload || cx === undefined || cy === undefined) return null;

    return (
        <g onClick={() => onClick && onClick(props)}>
            {/* Larger invisible hit area for mobile */}
            {isMobile && <circle cx={cx} cy={cy} r={20} fill="transparent" className="cursor-pointer" />}

            <circle cx={cx} cy={cy} r={isMobile ? 8 : 6} fill={fill} stroke="#f8fafc" strokeWidth={1} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <text x={cx} y={cy + 15} textAnchor="middle" fill="#94a3b8" fontSize={isMobile ? 11 : 10} className="pointer-events-none select-none font-medium">
                {payload.abbreviation}
            </text>
        </g>
    );
};
