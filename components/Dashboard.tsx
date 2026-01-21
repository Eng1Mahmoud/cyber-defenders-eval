"use client";

import { useState, useMemo } from "react";
import { MOCK_DATA } from "@/lib/data";
import { CertType, SkillLevel, Certification } from "@/types";
import CertScatterPlot from "./Chart/CertScatterPlot";
import FilterBar from "./Controls/FilterBar";
import FullScreenToggle from "./Controls/FullScreenToggle";
import CertDetailsDialog from "./CertDetailsDialog";

export default function Dashboard() {
    const [selectedType, setSelectedType] = useState<CertType | "all">("blue");
    const [selectedSkill, setSelectedSkill] = useState<SkillLevel | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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
        <div className="container mx-auto px-2 py-4 sm:p-4 md:p-8 max-w-[1600px]">
            <div className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
            </div>

            <div className="flex flex-col gap-6">
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

                <div className="relative">
                    <CertScatterPlot
                        data={filteredData}
                        onNodeClick={setSelectedCert}
                    />
                    <div className="absolute -top-4 right-4 z-10">
                        <FullScreenToggle />
                    </div>
                </div>
            </div>

            <CertDetailsDialog
                open={!!selectedCert}
                onOpenChange={(open) => !open && setSelectedCert(null)}
                cert={selectedCert}
            />
        </div>
    );
}
