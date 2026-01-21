"use client";

import { useState, useMemo } from "react";
import { MOCK_DATA } from "@/lib/data";
import { Certification, CertType, SkillLevel } from "@/types";
import CertScatterPlot from "./Chart/CertScatterPlot";
import CertDetailsDialog from "./CertDetailsDialog";
import FilterBar from "./Controls/FilterBar";
import ThemeToggle from "./Controls/ThemeToggle";
import FullScreenToggle from "./Controls/FullScreenToggle";

export default function Dashboard() {
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

    // Lifted State
    const [selectedType, setSelectedType] = useState<CertType | "all">("blue");
    const [selectedSkill, setSelectedSkill] = useState<SkillLevel | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Logic
    const filteredData = useMemo(() => {
        return MOCK_DATA.filter((cert) => {
            const matchType = selectedType === "all" || cert.cert_type === selectedType;
            const matchSkill = selectedSkill === "all" || cert.skill_level === selectedSkill;
            const matchSearch = searchQuery === "" ||
                cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cert.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());

            return matchType && matchSkill && matchSearch;
        });
    }, [selectedType, selectedSkill, searchQuery]);


    return (
        <div className="container mx-auto px-2 py-4 sm:p-4 md:p-8 ">
            {/* Controls Section */}
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col  gap-1 justify-between items-start lg:items-center md:ml-16 ">
                    <FilterBar
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        selectedSkill={selectedSkill}
                        setSelectedSkill={setSelectedSkill}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className="flex gap-2 self-end ">
                        <ThemeToggle />
                        <FullScreenToggle />
                    </div>
                </div>
            </div>

            <div className="relative">
                <CertScatterPlot
                    data={filteredData}
                    onNodeClick={setSelectedCert}
                />
            </div>

            <CertDetailsDialog
                open={!!selectedCert}
                onOpenChange={(open) => !open && setSelectedCert(null)}
                cert={selectedCert}
            />
        </div>
    );
}
