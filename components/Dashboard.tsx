"use client";

import { useState, useMemo } from "react";
import { MOCK_DATA } from "@/lib/data";
import { CertType, SkillLevel, Certification } from "@/types";
import CertScatterPlot from "./Chart/CertScatterPlot";
import FilterBar from "./Controls/FilterBar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [selectedType, setSelectedType] = useState<CertType | "all">("blue");
    const [selectedSkill, setSelectedSkill] = useState<SkillLevel | "all">("all");
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

    const filteredData = useMemo(() => {
        return MOCK_DATA.filter((cert) => {
            const matchType = selectedType === "all" || cert.cert_type === selectedType;
            const matchSkill = selectedSkill === "all" || cert.skill_level === selectedSkill;

            return matchType && matchSkill;
        });
    }, [selectedType, selectedSkill]);

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
                    />
                </div>

                <div className="relative">
                    <CertScatterPlot
                        data={filteredData}
                        onNodeClick={setSelectedCert}
                    />
                    <div className="absolute -top-4 right-4 z-10">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                            onClick={() => {
                                if (!document.fullscreenElement) {
                                    document.documentElement.requestFullscreen();
                                } else {
                                    if (document.exitFullscreen) {
                                        document.exitFullscreen();
                                    }
                                }
                            }}
                        >
                            <span className="sr-only">Toggle Full Screen</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-maximize"
                            >
                                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                                <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                                <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                                <path d="M16 21h3a2 2 0 0 1 2-2v-3" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f172a] border-slate-700 text-slate-100">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant={selectedCert?.cert_type === "blue" ? "default" : selectedCert?.cert_type === "red" ? "destructive" : "secondary"}>
                                {selectedCert?.cert_type === "blue" ? "Blue Team" : selectedCert?.cert_type === "red" ? "Red Team" : "InfoSec"}
                            </Badge>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">{selectedCert?.skill_level}</Badge>
                        </div>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            {selectedCert?.title} ({selectedCert?.abbreviation})
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                            {selectedCert?.description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                                <div className="text-xs text-slate-400 uppercase font-bold">Satisfaction</div>
                                <div className="text-xl font-mono text-blue-400">{selectedCert?.satisfaction}</div>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                                <div className="text-xs text-slate-400 uppercase font-bold">Presence</div>
                                <div className="text-xl font-mono text-blue-400">{selectedCert?.market_presence}</div>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                                <div className="text-xs text-slate-400 uppercase font-bold">Votes</div>
                                <div className="text-xl font-mono text-blue-400">{selectedCert?.total_votes}</div>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                                <div className="text-xs text-slate-400 uppercase font-bold">Cost</div>
                                <div className="text-xl font-mono text-blue-400">{selectedCert?.cost}</div>
                            </div>
                        </div>

                        <Separator className="bg-slate-700" />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-200"><BookOpen className="w-4 h-4" /> Requirements</h4>
                                <ul className="text-sm space-y-1 text-slate-400">
                                    <li><span className="font-medium text-slate-300">Knowledge:</span> {selectedCert?.requirements_data.knowledge}</li>
                                    <li><span className="font-medium text-slate-300">Experience:</span> {selectedCert?.requirements_data.work_experience}</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-200"><Clock className="w-4 h-4" /> Exam Details</h4>
                                <ul className="text-sm space-y-1 text-slate-400">
                                    <li><span className="font-medium text-slate-300">Format:</span> {selectedCert?.exam_details_data.format}</li>
                                    <li><span className="font-medium text-slate-300">Duration:</span> {selectedCert?.exam_details_data.duration || "N/A"}</li>
                                </ul>
                            </div>
                        </div>

                        {selectedCert?.provider && (
                            <div className="bg-slate-800/30 p-4 rounded-lg flex justify-between items-center border border-slate-700">
                                <div>
                                    <div className="text-xs text-slate-400">Provider</div>
                                    <div className="font-semibold text-slate-200">{selectedCert.provider.name}</div>
                                </div>
                                <Button variant="outline" size="sm" asChild className="border-slate-600 text-slate-300 hover:bg-slate-700">
                                    <a href={selectedCert.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        Visit Website <ExternalLink className="w-4 h-4" />
                                    </a>
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
