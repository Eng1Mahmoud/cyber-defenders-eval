"use client";

import { useRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CertType, SkillLevel, FilterBarProps } from "@/types";
import { cn } from "@/lib/utils";

export default function FilterBar({
    selectedType,
    setSelectedType,
    selectedSkill,
    setSelectedSkill,
    searchQuery,
    setSearchQuery,
}: FilterBarProps) {
    const tabs = [
        { val: "blue", label: "Blue Team" },
        { val: "red", label: "Red Team" },
        { val: "infoSec", label: "InfoSec" },
    ];

    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "ArrowRight") {
            const nextIndex = (index + 1) % tabs.length;
            buttonRefs.current[nextIndex]?.focus();
        } else if (e.key === "ArrowLeft") {
            const prevIndex = (index - 1 + tabs.length) % tabs.length;
            buttonRefs.current[prevIndex]?.focus();
        }
    };

    return (
        <div
            className="flex flex-col md:flex-row gap-6 mb-6 items-center justify-center md:justify-start"
            role="search"
            aria-label="Filter certifications"
        >

            <div className="flex bg-transparent" role="tablist" aria-label="Filter by team type">
                {tabs.map((opt, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    const isSelected = selectedType === opt.val;

                    // Standard roving tabindex: only one element in the group is focusable via Tab
                    // If none is selected, the first one is focusable.
                    const isFocusable = isSelected || (selectedType === "all" && isFirst);

                    return (
                        <button
                            key={opt.val}
                            ref={(el) => { buttonRefs.current[index] = el; }}
                            onClick={() => setSelectedType(isSelected ? "all" : (opt.val as CertType))}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            role="tab"
                            aria-selected={isSelected}
                            tabIndex={isFocusable ? 0 : -1}
                            aria-label={`Filter by ${opt.label}${isSelected ? " (active)" : ""}`}
                            className={cn(
                                "px-3 py-1 text-sm font-bold transition-all border border-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1",
                                isFirst && "rounded-l-md",
                                isLast && "rounded-r-md",
                                !isFirst && "border-l-0",
                                isSelected
                                    ? "bg-[#4d77ff] text-white"
                                    : "bg-transparent text-[#4d77ff]"
                            )}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>

            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-center">

                <Select value={selectedSkill} onValueChange={(v) => setSelectedSkill(v as SkillLevel | "all")}>
                    <SelectTrigger
                        className="w-[200px] h-10 px-4 bg-white dark:bg-[#0B1324] border border-gray-300 dark:border-[#1E293B] text-gray-900 dark:text-[#CFD7E2] hover:border-blue-500 dark:hover:border-slate-500 rounded-sm font-medium transition-colors"
                        aria-label="Filter by skill level"
                    >
                        <SelectValue placeholder="Select Skill Level" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} align="start" className="bg-white dark:bg-[#0B1324] border-gray-300 dark:border-[#1E293B] text-gray-900 dark:text-[#CFD7E2]">
                        <SelectItem value="all">Select Skill Level</SelectItem>
                        <SelectItem value="Novice">Novice</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                </Select>
                <input
                    type="text"
                    placeholder="Search certifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search certifications by name or abbreviation"
                    className="w-[200px] h-10 px-3 py-2 bg-white dark:bg-[#0B1324] border border-gray-300 dark:border-[#1E293B] rounded-sm text-sm text-gray-900 dark:text-[#CFD7E2] placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-colors"
                />
            </div>
        </div>
    );
}
