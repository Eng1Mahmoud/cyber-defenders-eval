"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { QuadrantLabelProps } from "@/types";

export const QuadrantLabel = (props: QuadrantLabelProps) => {
    const { viewBox, text, hasBackground = false } = props;
    // Recharts passes viewBox sometimes as null on initial render
    if (!viewBox) return null;

    const { x, y, width, height } = viewBox;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isMobile = useIsMobile();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isDark } = useTheme();

    // Responsive configuration
    const rectWidth = isMobile ? 100 : 140;
    const rectHeight = isMobile ? 24 : 30;
    const fontSize = isMobile ? "9px" : "11px";
    const yMargin = 3;

    const isBottom = text === "Visionaries" || text === "Niche Players";
    const yPos = isBottom ? y + height - yMargin : y + yMargin;

    // Calculate Rect position - center vertically
    const rectY = isBottom
        ? yPos - rectHeight + 4
        : yPos - 4;

    // Center text Y position in the rectangle
    const textY = rectY + rectHeight / 2;

    // Consistent background for both light and dark modes
    const rectFillClass = "fill-gray-200 dark:fill-slate-800 opacity-90";

    return (
        <g>
            <rect
                x={x + width / 2 - rectWidth / 2}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                rx={4}
                className={rectFillClass}
            />
            <text
                x={x + width / 2}
                y={textY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-600 dark:fill-slate-400 font-bold uppercase tracking-widest pointer-events-none select-none"
                style={{ fontWeight: 600, fontSize: fontSize }}
            >
                {text}
            </text>
        </g>
    );
};
