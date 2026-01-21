"use client";

import { Button } from "@/components/ui/button";

export default function FullScreenToggle() {
    return (
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
    );
}
