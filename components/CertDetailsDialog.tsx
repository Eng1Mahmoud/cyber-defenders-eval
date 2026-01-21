"use client";

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
import { Certification } from "@/types";

interface CertDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    cert: Certification | null;
}

export default function CertDetailsDialog({ open, onOpenChange, cert }: CertDetailsDialogProps) {
    // If no cert is selected, we can still render the dialog structure but it won't be open
    // However, usually we return null or handle it inside. 
    // The parent controls 'open' so we just render content based on 'cert'.

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f172a] border-slate-700 text-slate-100">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant={cert?.cert_type === "blue" ? "default" : cert?.cert_type === "red" ? "destructive" : "secondary"}>
                            {cert?.cert_type === "blue" ? "Blue Team" : cert?.cert_type === "red" ? "Red Team" : "InfoSec"}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">{cert?.skill_level}</Badge>
                    </div>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        {cert?.title} ({cert?.abbreviation})
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        {cert?.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                            <div className="text-xs text-slate-400 uppercase font-bold">Satisfaction</div>
                            <div className="text-xl font-mono text-blue-400">{cert?.satisfaction}</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                            <div className="text-xs text-slate-400 uppercase font-bold">Presence</div>
                            <div className="text-xl font-mono text-blue-400">{cert?.market_presence}</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                            <div className="text-xs text-slate-400 uppercase font-bold">Votes</div>
                            <div className="text-xl font-mono text-blue-400">{cert?.total_votes}</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                            <div className="text-xs text-slate-400 uppercase font-bold">Cost</div>
                            <div className="text-xl font-mono text-blue-400">{cert?.cost}</div>
                        </div>
                    </div>

                    <Separator className="bg-slate-700" />

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-200"><BookOpen className="w-4 h-4" /> Requirements</h4>
                            <ul className="text-sm space-y-1 text-slate-400">
                                <li><span className="font-medium text-slate-300">Knowledge:</span> {cert?.requirements_data.knowledge}</li>
                                <li><span className="font-medium text-slate-300">Experience:</span> {cert?.requirements_data.work_experience}</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2 text-slate-200"><Clock className="w-4 h-4" /> Exam Details</h4>
                            <ul className="text-sm space-y-1 text-slate-400">
                                <li><span className="font-medium text-slate-300">Format:</span> {cert?.exam_details_data.format}</li>
                                <li><span className="font-medium text-slate-300">Duration:</span> {cert?.exam_details_data.duration || "N/A"}</li>
                            </ul>
                        </div>
                    </div>

                    {cert?.provider && (
                        <div className="bg-slate-800/30 p-4 rounded-lg flex justify-between items-center border border-slate-700">
                            <div>
                                <div className="text-xs text-slate-400">Provider</div>
                                <div className="font-semibold text-slate-200">{cert.provider.name}</div>
                            </div>
                            <Button variant="outline" size="sm" asChild className="border-slate-600 text-slate-300 hover:bg-slate-700">
                                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    Visit Website <ExternalLink className="w-4 h-4" />
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
