import { ChartNodeProps } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

export const ChartNode = (props: ChartNodeProps) => {
    const { cx, cy, fill, payload, onClick } = props;
    const isMobile = useIsMobile();

    if (!payload || cx === undefined || cy === undefined) return null;

    const handleKeyDown = (e: React.KeyboardEvent<SVGGElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (onClick) onClick(props);
        }
        
        // Arrow key navigation between nodes
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
            const currentElement = e.currentTarget;
            const parent = currentElement.parentElement;
            if (!parent) return;
            
            // Get all focusable nodes in the chart
            const allNodes = Array.from(parent.querySelectorAll('g[tabindex="0"]')) as SVGGElement[];
            const currentIndex = allNodes.indexOf(currentElement);
            
            let nextIndex = currentIndex;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                nextIndex = (currentIndex + 1) % allNodes.length;
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                nextIndex = (currentIndex - 1 + allNodes.length) % allNodes.length;
            }
            
            allNodes[nextIndex]?.focus();
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
            className="focus:outline-none cursor-pointer"
            style={{ outline: "none" }}
        >
            {/* Larger invisible hit area for mobile */}
            {isMobile && <circle cx={cx} cy={cy} r={20} fill="transparent" />}

            {/* Main node circle */}
            <circle 
                cx={cx} 
                cy={cy} 
                r={isMobile ? 8 : 6} 
                fill={fill} 
                className="stroke-gray-100 dark:stroke-slate-50 hover:opacity-80 transition-opacity" 
                strokeWidth={1} 
            />
            
            {/* Focus ring - shown when focused via keyboard */}
            <circle
                cx={cx}
                cy={cy}
                r={isMobile ? 12 : 10}
                fill="none"
                className="stroke-transparent transition-all"
                strokeWidth={2}
                style={{ stroke: "var(--focus-ring-color, transparent)" }}
            />
            
            <text x={cx} y={cy + 15} textAnchor="middle" className="fill-gray-500 dark:fill-slate-400 pointer-events-none select-none font-medium" fontSize={isMobile ? 11 : 10}>
                {payload.abbreviation}
            </text>
            
            <style>{`
                g:focus circle:nth-of-type(${isMobile ? 3 : 2}) {
                    stroke: #3b82f6 !important;
                }
            `}</style>
        </g>
    );
};
