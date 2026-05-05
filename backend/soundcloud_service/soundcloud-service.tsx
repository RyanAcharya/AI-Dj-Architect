import { DJSetConfig } from '@/constants/constants';
import { SoundCloud } from "scdl-core";
import { filterTrack, normalizeTrack, scoreTrack, selectTracks } from './trackPipeline';

async function fetchTracksByArtists(artists: string[]): Promise<any[]> {
  const results = await Promise.all(
    artists.map(async (artist) => {
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

  return results.flat();
}

async function fetchTracksByGenres(genres: string[]): Promise<any[]> {
  const results = await Promise.all(
    genres.map(async (g) => {
      try {
        const response = await SoundCloud.search({
          query: g,
          limit: 15,
          filter: "tracks"
        });

        return response.collection.filter((track: any) =>
          track.genre?.toLowerCase().includes(g.toLowerCase())
        );
      } catch (error) {
        console.error(`Failed fetching ${g}:`, error);
        return [];
      }
    })
  );

  return results.flat();
}

export async function findSongCandidates(targetSet: DJSetConfig) {
  (SoundCloud as any).clientId = process.env.SOUNDCLOUD_CLIENT_ID;

  console.log('Fetching tracks from SoundCloud for artists:', targetSet.artists);
  console.log('Fetching tracks from SoundCloud for genres:', targetSet.genre);

  const [artistTracks, genreTracks] = await Promise.all([
    fetchTracksByArtists(targetSet.artists),
    fetchTracksByGenres(targetSet.genre),
  ]);

  const allTracks = [...artistTracks, ...genreTracks];
  console.log(`Fetched ${allTracks.length} tracks from SoundCloud`);

  const normalized = allTracks.map(normalizeTrack);
  const cleanTracks = normalized.filter(t => filterTrack(t, targetSet));
  const scored = await Promise.all(
    cleanTracks.map(async t => ({
      ...t,
      score: scoreTrack(t, targetSet)
    }))
  );

  const sorted = scored.sort((a, b) => b.score - a.score);
  return selectTracks(sorted, targetSet);
}