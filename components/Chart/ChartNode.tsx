import { ChartNodeProps } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

export const ChartNode = (props: ChartNodeProps) => {
    const { cx, cy, fill, payload, onClick } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isMobile = useIsMobile();

    if (!payload || cx === undefined || cy === undefined) return null;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick && onClick(props);
        }
    };

    const ariaLabel = `${payload.title} (${payload.abbreviation}), ${payload.cert_type === "blue" ? "Blue Team" : payload.cert_type === "red" ? "Red Team" : "InfoSec"} certification, Satisfaction: ${payload.satisfaction}, Market Presence: ${payload.market_presence}`;

    return (
        <g
            onClick={() => onClick && onClick(props)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={ariaLabel}
            className="text-slate-400 dark:text-slate-400 focus:outline-none focus-visible:outline-none"
        >
            {/* Larger invisible hit area for mobile */}
            {isMobile && <circle cx={cx} cy={cy} r={20} fill="transparent" className="cursor-pointer" />}

            {/* Focus ring - visible when focused via keyboard */}
            <circle
                cx={cx}
                cy={cy}
                r={isMobile ? 12 : 10}
                fill="transparent"
                className="stroke-transparent group-focus-visible:stroke-blue-500 transition-all"
                strokeWidth={2}
                style={{ stroke: "transparent" }}
            />

            <circle cx={cx} cy={cy} r={isMobile ? 8 : 6} fill={fill} className="stroke-gray-100 dark:stroke-slate-50 cursor-pointer hover:opacity-80 transition-opacity" strokeWidth={1} />
            <text x={cx} y={cy + 15} textAnchor="middle" className="fill-gray-500 dark:fill-slate-400 pointer-events-none select-none font-medium" fontSize={isMobile ? 11 : 10}>
                {payload.abbreviation}
            </text>
        </g>
    );
};
