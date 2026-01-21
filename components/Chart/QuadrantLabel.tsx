"use client";
import { useIsMobile } from "@/hooks/use-mobile";

import { QuadrantLabelProps } from "@/types";

export const QuadrantLabel = (props: QuadrantLabelProps) => {
    const { viewBox, text } = props;
    // Recharts passes viewBox sometimes as null on initial render
    if (!viewBox) return null;

    const { x, y, width, height } = viewBox;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isMobile = useIsMobile();

    // Responsive configuration
    const rectWidth = isMobile ? 100 : 140;
    const rectHeight = isMobile ? 24 : 30;
    const fontSize = isMobile ? "9px" : "11px";
    const yMargin = isMobile ? 5 : 10;

    const isBottom = text === "Visionaries" || text === "Niche Players";
    const yPos = isBottom ? y + height - yMargin : y + yMargin;

    // Calculate Rect Y based on position and height
    const rectY = isBottom
        ? yPos - rectHeight + (isMobile ? 2 : 4)
        : yPos - (isMobile ? 2 : 4);

    return (
        <g>
            <rect
                x={x + width / 2 - rectWidth / 2}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                rx={4}
                fill="#1e293b"
                className="opacity-90"
            />
            <text
                x={x + width / 2}
                y={yPos}
                fill="#94a3b8"
                textAnchor="middle"
                dominantBaseline={isBottom ? "auto" : "hanging"}
                className="font-bold uppercase tracking-widest pointer-events-none select-none"
                style={{ fontWeight: 600, fontSize: fontSize }}
            >
                {text}
            </text>
        </g>
    );
};
