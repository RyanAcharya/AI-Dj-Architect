"use client";

import { Track } from "@/constants/constants";
import { useSetStore } from "@/frontend/stores/set-store";
import { TrackCard } from "../components/track-card";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
    const { setResult } = useSetStore();
    const router = useRouter();
    const tracks = setResult?.setJson ?? [];

    return (
        <main className="min-h-screen bg-white spaceGrotesk">
            <div className="max-w-3xl mx-auto px-6 py-16">

                {/* Header */}
                <div className="mb-10">
                    <button
                        onClick={() => router.push("/")}
                        className="text-sm text-gray-400 hover:text-gray-700 transition mb-8 flex items-center gap-1"
                    >
                        {"←"} Back
                    </button>
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">
                        Your DJ Set
                    </h1>
                    <p className="text-gray-400 text-sm">
                        {tracks.length} tracks selected and ranked for your set
                    </p>
                </div>

                {/* Track list */}
                {tracks.length > 0 ? (
                    <div className="flex flex-col gap-2">
                        {tracks.map((track: Track, index: number) => (
                            <div key={track.id} className="flex items-center gap-3">
                                <span className="text-xs text-gray-300 w-5 text-right flex-shrink-0">
                                    {index + 1}
                                </span>
                                <TrackCard track={track} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400 mb-4">No tracks found.</p>
                        <button
                            onClick={() => router.push("/")}
                            className="rounded-full bg-gray-100 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                        >
                            Generate a set
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

