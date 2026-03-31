import { DJSetConfig } from '@/constants/constants';
import { SoundCloud } from "scdl-core";
import { filterTrack, normalizeTrack, scoreTrack, selectTracks } from './trackPipeline';

export async function findSongCandidates(targetSet: DJSetConfig) {
  (SoundCloud as any).clientId = process.env.SOUNDCLOUD_CLIENT_ID;
  const allTracks = [];

  const results = await Promise.all(
    targetSet.artists.map(async (artist) => {
      try {
        const response = await SoundCloud.search({
          query: artist,
          limit: 15,
          filter: "tracks"
        });

        return response.collection.filter((track: any) =>
          track.user?.username?.toLowerCase().includes(artist.toLowerCase()) ||
          track.title?.toLowerCase().includes(artist.toLowerCase())
        );
      } catch (error) {
        console.error(`Failed fetching ${artist}:`, error);
        return [];
      }
    })
  );
  allTracks.push(...results.flat());
  
  const normalized = allTracks.map(normalizeTrack);
  const cleanTracks = normalized.filter(t => filterTrack(t, targetSet));
  const scored = await Promise.all(
    cleanTracks.map(async t => ({
      ...t,
      score: scoreTrack(t, targetSet)
    }))
  );
  const sorted = scored.sort((a, b) => b.score - a.score);
  const selectedTracks = selectTracks(sorted, targetSet);

  return selectedTracks;
}