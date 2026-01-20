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
import { Certification, CertType } from "@/types";
import { Info } from "lucide-react";

interface CertScatterPlotProps {
    data: Certification[];
    onNodeClick: (cert: Certification) => void;
}

const COLOR_MAP: Record<CertType, string> = {
    blue: "#3b82f6",
    red: "#ef4444",
    infoSec: "#94a3b8",
};

// Quadrant Label Component
const QuadrantLabel = (props: any) => {
    const { viewBox, text } = props;
    const { x, y, width, height } = viewBox;

    let yPos = y + 20;
    if (text === "Visionaries" || text === "Niche Players") {
        yPos = y + height - 20;
    }

    return (
        <text
            x={x + width / 2}
            y={yPos}
            fill="#475569"
            textAnchor="middle"
            dominantBaseline={text === "Visionaries" || text === "Niche Players" ? "auto" : "hanging"}
            className="text-sm font-bold uppercase tracking-widest pointer-events-none select-none"
            style={{ fontWeight: 700 }}
        >
            {text}
        </text>
    );
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload as Certification;
        return (
            <div className="bg-[#0f172a] border border-slate-700 p-3 rounded-lg shadow-xl text-slate-100 text-sm z-50">
                <p className="font-bold mb-1 text-slate-100">{data.abbreviation}</p>
                <p className="text-xs text-slate-400 mb-2">{data.title}</p>
                <div className="flex gap-2 text-xs text-slate-300">
                    <span>Market: {data.market_presence}</span>
                    <span>Sat: {data.satisfaction}</span>
                </div>
            </div>
        );
    }
    return null;
};

const CustomNode = (props: any) => {
    const { cx, cy, fill, payload, onClick } = props;
    return (
        <g onClick={() => onClick && onClick(props)}>
            <circle cx={cx} cy={cy} r={6} fill={fill} stroke="#f8fafc" strokeWidth={1} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <text x={cx} y={cy + 15} textAnchor="middle" fill="#94a3b8" fontSize={10} className="pointer-events-none select-none font-medium">
                {payload.abbreviation}
            </text>
        </g>
    );
};

export default function CertScatterPlot({ data, onNodeClick }: CertScatterPlotProps) {
    const blueCerts = useMemo(() => data.filter(c => c.cert_type === "blue"), [data]);
    const redCerts = useMemo(() => data.filter(c => c.cert_type === "red"), [data]);
    const infoSecCerts = useMemo(() => data.filter(c => c.cert_type === "infoSec"), [data]);

    return (
        <div className="w-full h-[600px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                >
                    {/* Top Left: Challengers */}
                    <ReferenceArea x1={0} x2={0.5} y1={2.5} y2={5} fill="transparent" strokeOpacity={0}>
                        <Label content={<QuadrantLabel text="Challengers" />} />
                    </ReferenceArea>

                    {/* Top Right: Leaders */}
                    <ReferenceArea x1={0.5} x2={1} y1={2.5} y2={5} fill="#1e293b" fillOpacity={0.4} strokeOpacity={0}>
                        <Label content={<QuadrantLabel text="Leaders" />} />
                    </ReferenceArea>

                    {/* Bottom Left: Niche Players */}
                    <ReferenceArea x1={0} x2={0.5} y1={0} y2={2.5} fill="#1e293b" fillOpacity={0.4} strokeOpacity={0}>
                        <Label content={<QuadrantLabel text="Niche Players" />} />
                    </ReferenceArea>

                    {/* Bottom Right: Visionaries */}
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
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "#94a3b8" }} />

                    <Scatter
                        name="Blue Team"
                        data={blueCerts}
                        fill={COLOR_MAP.blue}
                        onClick={(props) => onNodeClick(props.payload)}
                        shape={<CustomNode />}
                    />
                    <Scatter
                        name="Red Team"
                        data={redCerts}
                        fill={COLOR_MAP.red}
                        onClick={(props) => onNodeClick(props.payload)}
                        shape={<CustomNode />}
                    />
                    <Scatter
                        name="InfoSec"
                        data={infoSecCerts}
                        fill={COLOR_MAP.infoSec}
                        onClick={(props) => onNodeClick(props.payload)}
                        shape={<CustomNode />}
                    />
                </ScatterChart>
            </ResponsiveContainer>

            {/* 
        Custom Axis Labels with Arrows 
        - Increased font size (text-xs)
        - Increased Arrow Length (width="80")
        - Positioned strictly at start of axes
      */}

            {/* X-Axis Label: Info Icon -> Label -> Arrow */}
            <div className="absolute bottom-4 left-[110px] flex items-center gap-2 pointer-events-none z-10 translate-y-1/2">
                <span className="text-xs text-white font-bold uppercase tracking-wider">Market Presence</span>
                <Info className="w-4 h-4 text-white" />
                <svg width="120" height="6" viewBox="0 0 120 6" fill="none" className="text-white">
                    <path d="M0 3H116M116 3L113 0.5M116 3L113 5.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </div>

            {/* Y-Axis Label: Label -> Arrow -> (Info Icon was removed by user, keeping it clean or adding back if implied by 'same style') 
          User removed Info icon in last edit. I will restore strict symmetry if "same arrow icon" implies full component symmetry, 
          but usually X and Y differ slightly. I will stick to the ARROW consistency requested. 
          Dimensions: Width 120 for consistency.
      */}
            <div className="absolute bottom-[70px] left-[50px] -rotate-90 origin-bottom-left flex items-center gap-2 pointer-events-none z-10">
                <span className="text-xs text-white font-bold uppercase tracking-wider">Satisfaction</span>
                <Info className="w-4 h-4 text-white" />
                <svg width="120" height="6" viewBox="0 0 120 6" fill="none" className="text-white">
                    <path d="M0 3H116M116 3L113 0.5M116 3L113 5.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </div>
        </div>
    );
}
