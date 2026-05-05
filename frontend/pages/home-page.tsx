"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetStore } from "@/frontend/stores/set-store";

export default function HomePage() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const { setSetResult } = useSetStore();
    const router = useRouter();

const handleSubmit = async () => {
    const trimedPrompt = prompt.trim();
    setLoading(true);

    const res = await fetch("/api/dj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trimedPrompt }),
    });

    const data = await res.json();
    setSetResult(data);
    
    setTimeout(() => {
        setLoading(false);
        router.push("/results");
    }, 100);
};

    return (
        <main className="flex h-screen flex-col items-center justify-center bg-white spaceGrotesk">
            {loading && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/50 space-y-4">
                    <div className="w-16 h-16 border-4 border-t-gray-600 border-gray-200 rounded-full animate-spin"></div>
                    <span className="text-white text-lg font-medium">Generating your set...</span>
                </div>
            )}

            <h1 className="mb-10 text-6xl font-semibold tracking-tight">
                DJ Set Generator
            </h1>

            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Describe your DJ set..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={loading}
                    className="
            w-[420px]
            rounded-full
            border
            border-gray-300
            px-5
            py-3
            text-base
            outline-none
            transition
            focus:border-gray-400
            focus:shadow-sm
          "
                />

                <button
                    onClick={handleSubmit}
                    className="
            rounded-full
            bg-gray-100
            px-5
            py-3
            text-sm
            font-medium
            text-gray-700
            transition
            hover:bg-gray-200
            active:scale-95
          "
                >
                    Generate Set
                </button>
            </div>
        </main>
    );
}

