"use client";

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
}: FilterBarProps) {
    return (
        <div className="flex flex-col md:flex-row gap-6 mb-6 items-start md:items-center justify-start">

            <div className="flex bg-transparent">
                {[
                    { val: "blue", label: "Blue Team" },
                    { val: "red", label: "Red Team" },
                    { val: "infoSec", label: "InfoSec" },
                ].map((opt, index, arr) => {
                    const isFirst = index === 0;
                    const isLast = index === arr.length - 1;
                    const isSelected = selectedType === opt.val;

                    return (
                        <button
                            key={opt.val}
                            onClick={() => setSelectedType(isSelected ? "all" : (opt.val as CertType))}
                            className={cn(
                                "px-3 py-1 text-sm font-bold transition-all border border-blue-600 focus:z-10",
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

            <div className="w-full md:w-auto ">
                <Select value={selectedSkill} onValueChange={(v) => setSelectedSkill(v as SkillLevel | "all")}>
                    <SelectTrigger className="w-full md:w-[200px] bg-transparent border-slate-700 text-slate-300 hover:border-slate-500 h-10 rounded-sm font-medium px-4">
                        <SelectValue placeholder="Select Skill Level" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} align="start" className="bg-[#0f172a] border-slate-700 text-slate-300 ">
                        <SelectItem value="all"> Select Skill Level</SelectItem>
                        <SelectItem value="Novice">Novice</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
