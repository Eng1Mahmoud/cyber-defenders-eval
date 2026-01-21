"use client";
import { useMemo } from "react";
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceArea,
    Label,
} from "recharts";
import { CertType, CertScatterPlotProps } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Info } from "lucide-react";
import { QuadrantLabel } from "./QuadrantLabel";
import { ChartTooltip } from "./ChartTooltip";
import { ChartNode } from "./ChartNode";

const COLOR_MAP: Record<CertType, string> = {
    blue: "#3b82f6",
    red: "#ef4444",
    infoSec: "#94a3b8",
};

export default function CertScatterPlot({ data, onNodeClick }: CertScatterPlotProps) {
    // Responsive hook for mobile detection
    const isMobile = useIsMobile();

    const blueCerts = useMemo(() => data.filter(c => c.cert_type === "blue"), [data]);
    const redCerts = useMemo(() => data.filter(c => c.cert_type === "red"), [data]);
    const infoSecCerts = useMemo(() => data.filter(c => c.cert_type === "infoSec"), [data]);

    return (
        <div className="w-full h-[500px] sm:h-[500px] md:h-[550px] lg:h-[600px] relative">
            <ResponsiveContainer width="100%" height="100%" >
                <ScatterChart
                    margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
                >
                    <ReferenceArea x1={0} x2={0.5} y1={2.5} y2={5} fill="transparent" strokeOpacity={0}>
                        <Label content={<QuadrantLabel text="Challengers" />} />
                    </ReferenceArea>

                    <ReferenceArea x1={0.5} x2={1} y1={2.5} y2={5} fill="#1e293b" fillOpacity={0.4} strokeOpacity={0}>
                        <Label content={<QuadrantLabel text="Leaders" />} />
                    </ReferenceArea>

                    <ReferenceArea x1={0} x2={0.5} y1={0} y2={2.5} fill="#1e293b" fillOpacity={0.4} strokeOpacity={0}>
                        <Label content={<QuadrantLabel text="Niche Players" />} />
                    </ReferenceArea>

                    <ReferenceArea x1={0.5} x2={1} y1={0} y2={2.5} fill="transparent" strokeOpacity={0}>
                        <Label content={<QuadrantLabel text="Visionaries" />} />
                    </ReferenceArea>

                    <XAxis
                        type="number"
                        dataKey="market_presence"
                        domain={[0, 1.0]}
                        axisLine={{ stroke: '#ffffff', strokeWidth: 1 }}
                        tick={false}
                        tickLine={false}
                    />
                    <YAxis
                        type="number"
                        dataKey="satisfaction"
                        domain={[0, 5.0]}
                        axisLine={{ stroke: '#ffffff', strokeWidth: 1 }}
                        tick={false}
                        tickLine={false}
                        width={isMobile ? 30 : 60}
                    />

                    <Tooltip content={<ChartTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "#94a3b8" }} />

                    <Scatter
                        name="Blue Team"
                        data={blueCerts}
                        fill={COLOR_MAP.blue}
                        onClick={(props) => onNodeClick(props.payload)}
                        shape={<ChartNode />}
                    />
                    <Scatter
                        name="Red Team"
                        data={redCerts}
                        fill={COLOR_MAP.red}
                        onClick={(props) => onNodeClick(props.payload)}
                        shape={<ChartNode />}
                    />
                    <Scatter
                        name="InfoSec"
                        data={infoSecCerts}
                        fill={COLOR_MAP.infoSec}
                        onClick={(props) => onNodeClick(props.payload)}
                        shape={<ChartNode />}
                    />
                </ScatterChart>
            </ResponsiveContainer>

            {/* X-Axis Label */}
            <div className="absolute bottom-4 left-8 sm:left-16 md:left-[80px] lg:left-[110px] flex items-center gap-1.5 sm:gap-2 pointer-events-none z-10 translate-y-1/2">
                <span className="text-[10px] sm:text-xs text-white font-bold uppercase tracking-wider">Market Presence</span>
                <Info className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <svg width="80" className="sm:w-[100px] md:w-[120px]" height="6" viewBox="0 0 120 6" fill="none">
                    <path d="M0 3H116M116 3L113 0.5M116 3L113 5.5" stroke="white" strokeWidth="1.5" />
                </svg>
            </div>

            {/* Y-Axis Label */}
            <div className="absolute bottom-[50px] sm:bottom-[60px] md:bottom-[70px] left-4 sm:left-8 md:left-[50px] -rotate-90 origin-bottom-left flex items-center gap-1.5 sm:gap-2 pointer-events-none z-10">
                <span className="text-[10px] sm:text-xs text-white font-bold uppercase tracking-wider">Satisfaction</span>
                <Info className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <svg width="80" className="sm:w-[100px] md:w-[120px]" height="6" viewBox="0 0 120 6" fill="none">
                    <path d="M0 3H116M116 3L113 0.5M116 3L113 5.5" stroke="white" strokeWidth="1.5" />
                </svg>
            </div>
        </div>
    );
}
