import { DJSetConfig, Track } from "@/constants/constants";

const MAX_DURATION = 5 * 60 * 1000

export function normalizeTrack(track: any): Track {
    return {
        id: track.id,
        title: track.title ?? '',
        artist: track.user?.username ?? 'Unknown',
        duration: track.duration ?? 0,
        plays: track.playback_count ?? 0,
        likes: track.likes_count ?? 0,
        reposts: track.reposts_count ?? 0,
        comments: track.comment_count ?? 0,
        genre: track.genre ?? '',
        created_at: track.created_at ?? '',
        release_date: track.release_date ?? '',
        url: track.permalink_url ?? '',
        artwork: track.artwork_url ?? '',
        streamable: track.streamable ?? false,
        downloadable: track.downloadable ?? false,
        label: track.label_name ?? '',
        tags: track.tag_list ?? '',
        score: 0,
    };
}


export function filterTrack(track: any, config: DJSetConfig) {
    const title = track.title.toLowerCase();

    if (title.includes("mix") || title.includes("set") || title.includes("live")) {
        return false;
    }

    if (track.duration > MAX_DURATION || track.duration < config.constraints.min_track_duration) {
        return false;
    }

    return true;
}

export function scoreTrack(track: any, config: DJSetConfig) {
    let score = 0;

    const plays = track.playback_count ?? track.plays ?? 0;
    const likes = track.likes_count ?? track.likes ?? 0;

    const minPlaysForRatio = 100;
    const likeRatio = plays >= minPlaysForRatio ? likes / plays : 0;
    score += likeRatio * 50; 

    score += Math.log10(plays + 1) * 3;
    score += Math.log10(likes + 1) * 2;

    const created = track.release_date 
    ? new Date(track.release_date).getTime() 
    : track.created_at 
        ? new Date(track.created_at).getTime() 
        : Date.now();

    const ageInMonths = (Date.now() - created) / (1000 * 60 * 60 * 24 * 30);
    const freshness = 1 / (1 + ageInMonths / 24); 
    score *= freshness;

    
    if (track.duration < config.constraints.min_track_duration) {
        score -= 5;
    }

    if (track.title.toLowerCase().includes("remix") || track.title.toLowerCase().includes("free download")) score += 2;
    if (track.title.toLowerCase().includes("full set")) score -= 10;
    if (track.title.toLowerCase().includes("mix")) score -= 5;

    return score;
}

export function selectTracks(sortedTracks: any[], config: DJSetConfig) {
    const selected = [];

    for (const track of sortedTracks) {
        if (selected.length >= config.target_track_count) break;

        const last = selected[selected.length - 1];
        if (last && last.artist === track.artist) continue;

        selected.push(track);
    }

    return selected;
}