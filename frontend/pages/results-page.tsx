"use client";

import { useSetStore } from "@/frontend/stores/set-store";

export default function ResultsPage() {
    const { setResult } = useSetStore();

  return (
    <div className="p-4">
      {setResult ? (
        <pre>{JSON.stringify(setResult, null, 2)}</pre>
      ) : (
        <p>No DJ set found. Go back and generate one.</p>
      )}
    </div>
  );
}

