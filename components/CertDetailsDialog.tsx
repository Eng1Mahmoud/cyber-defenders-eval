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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f172a] border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant={cert?.cert_type === "blue" ? "default" : cert?.cert_type === "red" ? "destructive" : "secondary"}>
                            {cert?.cert_type === "blue" ? "Blue Team" : cert?.cert_type === "red" ? "Red Team" : "InfoSec"}
                        </Badge>
                        <Badge variant="outline" className="border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-300">{cert?.skill_level}</Badge>
                    </div>
                    <div className="flex items-start gap-4">
                        {cert?.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={cert.image} alt={`${cert.title} logo`} className="w-16 h-16 object-contain rounded-md bg-white p-1" />
                        )}
                        <div>
                            <DialogTitle className="text-2xl flex items-center gap-2">
                                {cert?.title} ({cert?.abbreviation})
                            </DialogTitle>
                            <DialogDescription className="text-gray-500 dark:text-slate-400 mt-1">
                                {cert?.description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-100 dark:bg-slate-800/50 p-3 rounded-lg text-center border border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Satisfaction</div>
                            <div className="text-xl font-mono text-blue-600 dark:text-blue-400">{cert?.satisfaction}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-800/50 p-3 rounded-lg text-center border border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Quality</div>
                            <div className="text-xl font-mono text-blue-600 dark:text-blue-400">{cert?.quality}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-800/50 p-3 rounded-lg text-center border border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Votes</div>
                            <div className="text-xl font-mono text-blue-600 dark:text-blue-400">{cert?.total_votes}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-800/50 p-3 rounded-lg text-center border border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Value</div>
                            <div className="text-xl font-mono text-blue-600 dark:text-blue-400">{cert?.cost_effectiveness}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-100 dark:bg-slate-800/50 p-3 rounded-lg text-center border border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Cost</div>
                            <div className="text-xl font-mono text-blue-600 dark:text-blue-400">{cert?.cost}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-800/50 p-3 rounded-lg text-center border border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Presence</div>
                            <div className="text-xl font-mono text-blue-600 dark:text-blue-400">{cert?.market_presence}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-800/50 p-3 rounded-lg text-center border border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Attempts</div>
                            <div className="text-xl font-mono text-blue-600 dark:text-blue-400">{cert?.number_of_attempts}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-800/50 p-3 rounded-lg text-center border border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Training</div>
                            <div className="text-xl font-mono text-blue-600 dark:text-blue-400">{cert?.training_included ? "Yes" : "No"}</div>
                        </div>
                    </div>

                    <Separator className="bg-gray-200 dark:bg-slate-700" />

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-800 dark:text-slate-200"><BookOpen className="w-4 h-4" /> Requirements</h4>
                            <ul className="text-sm space-y-1 text-gray-500 dark:text-slate-400">
                                <li><span className="font-medium text-gray-700 dark:text-slate-300">Prerequisites:</span> {cert?.requirements_data.prior_courses_and_certifications}</li>
                                <li><span className="font-medium text-gray-700 dark:text-slate-300">Knowledge:</span> {cert?.requirements_data.knowledge}</li>
                                <li><span className="font-medium text-gray-700 dark:text-slate-300">Experience:</span> {cert?.requirements_data.work_experience}</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-800 dark:text-slate-200"><Clock className="w-4 h-4" /> Exam Details</h4>
                            <ul className="text-sm space-y-1 text-gray-500 dark:text-slate-400">
                                <li><span className="font-medium text-gray-700 dark:text-slate-300">Format:</span> {cert?.exam_details_data.format}</li>
                                <li><span className="font-medium text-gray-700 dark:text-slate-300">Duration:</span> {cert?.exam_details_data.duration || "N/A"}</li>
                                <li><span className="font-medium text-gray-700 dark:text-slate-300">Validity:</span> {cert?.valid_for || "Lifetime"}</li>
                                <li><span className="font-medium text-gray-700 dark:text-slate-300">Report Required:</span> {cert?.exam_details_data.report_required ? "Yes" : "No"}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h4 className="font-semibold mb-2 text-gray-800 dark:text-slate-200">Domains Covered</h4>
                            <div className="flex flex-wrap gap-1">
                                {cert?.domains_covered_titles.map((domain) => (
                                    <Badge key={domain} variant="secondary" className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700">
                                        {domain}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-gray-800 dark:text-slate-200">Target Roles</h4>
                            <div className="flex flex-wrap gap-1">
                                {cert?.job_roles_titles.map((role) => (
                                    <Badge key={role} variant="outline" className="border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
                                        {role}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {cert?.provider && (
                        <div className="bg-gray-100 dark:bg-slate-800/30 p-4 rounded-lg flex justify-between items-center border border-gray-200 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                {cert.provider.image && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={cert.provider.image} alt={cert.provider.name} className="w-10 h-10 object-contain rounded-full bg-white p-1" />
                                )}
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-slate-400">Provider</div>
                                    <div className="font-semibold text-gray-800 dark:text-slate-200">{cert.provider.name}</div>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" asChild className="border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700">
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
