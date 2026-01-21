"use client";
import { useState, useMemo } from "react";
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
import { CertType, SkillLevel, CertScatterPlotProps } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { Info } from "lucide-react";
import { QuadrantLabel } from "./QuadrantLabel";
import { ChartTooltip } from "./ChartTooltip";
import { ChartNode } from "./ChartNode";
import FilterBar from "../Controls/FilterBar";
import ThemeToggle from "../Controls/ThemeToggle";
import FullScreenToggle from "../Controls/FullScreenToggle";

const COLOR_MAP: Record<CertType, string> = {
    blue: "#3b82f6",
    red: "#ef4444",
    infoSec: "#94a3b8",
};

export default function CertScatterPlot({ data, onNodeClick }: CertScatterPlotProps) {
    // Responsive hook for mobile detection
    const isMobile = useIsMobile();
    const { isDark } = useTheme();

    // Filter state (now managed internally)
    const [selectedType, setSelectedType] = useState<CertType | "all">("blue");
    const [selectedSkill, setSelectedSkill] = useState<SkillLevel | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Theme-aware colors
    const axisColor = isDark ? "#ffffff" : "#1e293b";
    const referenceAreaFill = isDark ? "#1e293b" : "#e2e8f0";
    const cursorColor = isDark ? "#94a3b8" : "#64748b";

    // Filter the data
    const filteredData = useMemo(() => {
        return data.filter((cert) => {
            const matchType = selectedType === "all" || cert.cert_type === selectedType;
            const matchSkill = selectedSkill === "all" || cert.skill_level === selectedSkill;
            const matchSearch = searchQuery === "" ||
                cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cert.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());

            return matchType && matchSkill && matchSearch;
        });
    }, [data, selectedType, selectedSkill, searchQuery]);

    const blueCerts = useMemo(() => filteredData.filter(c => c.cert_type === "blue"), [filteredData]);
    const redCerts = useMemo(() => filteredData.filter(c => c.cert_type === "red"), [filteredData]);
    const infoSecCerts = useMemo(() => filteredData.filter(c => c.cert_type === "infoSec"), [filteredData]);

    return (
        <div
            className="flex flex-col gap-1"
            role="region"
            aria-label="Certification scatter plot chart"
        >
            {/* FilterBar is now inside CertScatterPlot */}
            <div className="pl-4 md:pl-[50px] lg:pl-[110px]">
                <FilterBar
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedSkill={selectedSkill}
                    setSelectedSkill={setSelectedSkill}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>
            <div className=" flex gap-1 justify-end">
                <ThemeToggle />
                <FullScreenToggle />
            </div>

            {/* Aria-live region for screen reader announcements */}
            <div
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {`Showing ${filteredData.length} certifications: ${blueCerts.length} Blue Team, ${redCerts.length} Red Team, ${infoSecCerts.length} InfoSec`}
            </div>

            <div
                className="w-full h-[500px] sm:h-[500px] md:h-[550px] lg:h-[600px] relative"
                role="img"
                aria-label={`Scatter plot showing ${filteredData.length} certifications plotted by Market Presence (x-axis) and Satisfaction (y-axis)`}
            >
                <ResponsiveContainer width="100%" height="100%" >
                    <ScatterChart
                        margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
                    >
                        <ReferenceArea x1={0} x2={0.5} y1={2.5} y2={5} fill="transparent" strokeOpacity={0}>
                            <Label content={<QuadrantLabel text="Challengers" />} />
                        </ReferenceArea>

                        <ReferenceArea x1={0.5} x2={1} y1={2.5} y2={5} fill={referenceAreaFill} fillOpacity={0.4} stroke="#64748b" strokeOpacity={0.3} strokeDasharray="2 2">
                            <Label content={<QuadrantLabel text="Leaders" hasBackground />} />
                        </ReferenceArea>

                        <ReferenceArea x1={0} x2={0.5} y1={0} y2={2.5} fill={referenceAreaFill} fillOpacity={0.4} stroke="#64748b" strokeOpacity={0.3} strokeDasharray="2 2">
                            <Label content={<QuadrantLabel text="Niche Players" hasBackground />} />
                        </ReferenceArea>

                        <ReferenceArea x1={0.5} x2={1} y1={0} y2={2.5} fill="transparent" strokeOpacity={0} >
                            <Label content={<QuadrantLabel text="Visionaries" />} />
                        </ReferenceArea>

                        <XAxis
                            type="number"
                            dataKey="market_presence"
                            domain={[0, 1.0]}
                            axisLine={{ stroke: axisColor, strokeWidth: 1 }}
                            tick={false}
                            tickLine={false}
                        />
                        <YAxis
                            type="number"
                            dataKey="satisfaction"
                            domain={[0, 5.0]}
                            axisLine={{ stroke: axisColor, strokeWidth: 1 }}
                            tick={false}
                            tickLine={false}
                            width={isMobile ? 30 : 60}
                        />

                        <Tooltip content={<ChartTooltip />} cursor={{ strokeDasharray: "3 3", stroke: cursorColor }} />

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
                        {/* Dummy scatter to keep chart/reference areas rendered when data is empty */}
                        {filteredData.length === 0 && (
                            <Scatter
                                data={[{ market_presence: 0.5, satisfaction: 2.5 }]}
                                fill="none"
                                shape={() => <g />}
                                legendType="none"
                                tooltipType="none"
                                pointerEvents="none"
                            />
                        )}
                    </ScatterChart>
                </ResponsiveContainer>

                {/* X-Axis Label */}
                <div className="absolute bottom-4 left-8 sm:left-16 md:left-[80px] lg:left-[110px] flex items-center gap-1.5 sm:gap-2 pointer-events-none z-10 translate-y-1/2">
                    <span className="text-[10px] sm:text-xs text-gray-900 dark:text-white font-bold uppercase tracking-wider">Market Presence</span>
                    <Info className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900 dark:text-white" />
                    <svg width="80" className="sm:w-[150px] md:w-[180px]" height="12" viewBox="0 0 130 12" fill="none">
                        <path d="M 0 6 l 120 0 M 120 6 l -5 -5 M 120 6 l -5 5" className="stroke-gray-900 dark:stroke-white" strokeWidth="1" fill="none" />
                    </svg>
                </div>

                {/* Y-Axis Label */}
                <div className="absolute bottom-[50px] sm:bottom-[60px] md:bottom-[70px] left-4 sm:left-8 md:left-[50px] -rotate-90 origin-bottom-left flex items-center gap-1.5 sm:gap-2 pointer-events-none z-10">
                    <span className="text-[10px] sm:text-xs text-gray-900 dark:text-white font-bold uppercase tracking-wider">Satisfaction</span>
                    <Info className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900 dark:text-white" />
                    <svg width="80" className="sm:w-[150px] md:w-[180px]" height="12" viewBox="0 0 130 12" fill="none">
                        <path d="M 0 6 l 120 0 M 120 6 l -5 -5 M 120 6 l -5 5" className="stroke-gray-900 dark:stroke-white" strokeWidth="1" fill="none" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
