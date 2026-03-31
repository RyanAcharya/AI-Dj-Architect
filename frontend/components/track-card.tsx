import { Track } from "@/constants/constants";

export function TrackCard({ track }: { track: Track }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 transition hover:border-gray-200 hover:shadow-sm w-full">
      
      {/* Artwork */}
      <img
        src={track.artwork}
        alt={track.title}
        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
      />

      {/* Title + Artist */}
      <div className="w-64 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{track.title}</p>
        <p className="text-xs text-gray-400 truncate">{track.artist}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-xs text-gray-400 w-32">
        <span>▶ {fmt(track.plays)}</span>
        <span>♥ {fmt(track.likes)}</span>
      </div>

      {/* Genre */}
      <div className="w-28">
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{track.genre}</span>
      </div>

      {/* Duration */}
      <span className="text-xs text-gray-400 w-10 text-right">{fmtDuration(track.duration)}</span>

      {/* Open link */}
      
        <a href={track.url}
        target="_blank"
        className="text-xs text-gray-400 hover:text-gray-700 transition flex-shrink-0 ml-auto">
        {"↗"}
      </a>
    </div>
  );
}

function fmt(n: number) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'm';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
    return n;
}

function fmtDuration(ms: number) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
}