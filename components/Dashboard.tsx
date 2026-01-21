"use client";

import { useState } from "react";
import { MOCK_DATA } from "@/lib/data";
import { Certification } from "@/types";
import CertScatterPlot from "./Chart/CertScatterPlot";
import CertDetailsDialog from "./CertDetailsDialog";

export default function Dashboard() {
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

    return (
        <div className="container mx-auto px-2 py-4 sm:p-4 md:p-8 max-w-[1600px]">
            <div className="relative">
                <CertScatterPlot
                    data={MOCK_DATA}
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
