# AI DJ/Set Architect

**Description:**
AI DJ/Set Architect is a web application that automatically generates curated DJ sets based on user input. Users can specify their desired genre, vibe, energy, and even preferred artists, and the system produces a playlist with ordered tracks, energy arcs, and metadata suitable for live DJ sets or personal listening. The app leverages SoundCloud as a primary track source and applies a modular pipeline to select, filter, and rank tracks.

---

## Features

### 1. Intelligent Set Curation

* Accepts natural-language user input describing desired set style, energy, and vibe.
* Supports both **genre-based** and **artist-focused** requests.
* Generates a structured JSON configuration capturing:

  * Duration, target track count, BPM range, energy curve
  * Vibe, transition style, vocal density, harmonic mixing preferences
  * Constraints and source rules

### 2. Track Candidate Generation

* Searches SoundCloud for relevant tracks by genre or artist.
* Filters out low-quality or non-DJ-friendly tracks (mixes, live sets, full sets).
* Normalizes track data (title, artist, duration, likes, plays, URL).

### 3. Scoring & Ranking

* Combines popularity, freshness (recency decay), remix bonuses, and duration constraints.
* Balances older classic tracks with newer releases for a fresh and dynamic playlist.
* Penalizes undesirable tracks (live recordings, full sets, generic mixes).

### 4. Track Selection & Energy Assignment

* Picks tracks that fit the user's target track count while avoiding repetitive artists back-to-back.
* Assigns simulated energy scores to each track to match the set’s energy arc.
* Supports different energy curve types (progressive peak, sustained peak, wave, gradual descent, opening warmup).

### 5. Output

* Returns a curated set in JSON format with all necessary metadata.
* Optional CSV export for DJ software import or personal tracking.

---

## Tech Stack

* **Frontend:** Next.js + React
* **Styling:** Tailwind CSS
* **Backend:** Node.js API routes
* **Track Data Source:** [SoundCloud](https://soundcloud.com) via `scdl-core`
* **AI/NLP Processing:** GPT-style model for parsing user input into structured JSON
* **Data Handling:** Modular pipeline for normalization, filtering, scoring, and selection

---

## Usage

### 1. Generate a DJ set

```ts
import { generateSet } from './api/setGenerator';
import { DJSetConfig } from './constants/constants';

const userRequest = "chill sunset house vibes inspired by Lane 8";

const setConfig: DJSetConfig = generateSet(userRequest);

console.log(setConfig);
```

### 2. Fetch candidate tracks from SoundCloud

```ts
import { SoundCloud } from 'scdl-core';
import { findSongCandidates } from './utils/setBuilder';

const tracks = await findSongCandidates(setConfig.artists);
```

### 3. Build curated set

```ts
import { buildSet } from './utils/setBuilder';

const curatedSet = buildSet(tracks, setConfig);

console.log(curatedSet);
```

---

## Project Structure

```
/AI-DJ-Set-Architect
│
├─ /api                  # Backend API routes for generating sets
├─ /constants            # DJSetConfig type definitions & constants
├─ /utils
│   ├─ setBuilder.ts     # Core track normalization, scoring, filtering, and selection pipeline
│   └─ soundCloudHelpers.ts # SoundCloud search & fetching helpers
├─ /components           # Frontend UI components
├─ /pages                # Next.js pages & routing
├─ /public               # Static assets
└─ README.md             # Project overview & instructions
```

---

## Features In Development

* Energy-aware ordering based on BPM & harmonic mixing
* Hybrid Spotify + SoundCloud pipeline for better coverage
* Visual timeline of set energy arc
* User-adjustable constraints and weights for track selection

---

## License

MIT License – free to use, modify, and adapt for personal or project purposes.

---

## Example Output (JSON)

```json
{
  "set_id": "chill-sunset-house-vibes",
  "duration_minutes": 60,
  "target_track_count": 14,
  "genre": ["deep house", "progressive house"],
  "bpm_range": [122, 128],
  "bpm_progression": "increasing",
  "energy_curve_type": "progressive_peak",
  "energy_arc": [
    { "minute": 0, "energy": 0.2 },
    { "minute": 30, "energy": 0.7 },
    { "minute": 60, "energy": 0.5 }
  ],
  "vibe": "sunset, warm, melodic",
  "transition_style": "smooth_blend",
  "vocal_density": "low",
  "key_preferences": { "harmonic_mixing": true, "start_key": null },
  "constraints": { "max_bpm_jump": 2, "avoid_vocals_clash": true, "min_track_duration": 180 },
  "source_rules": { "allow_remixes": true, "exclude_live_versions": true, "exclude_radio_rips": true },
  "artists": ["Lane 8", "Yotto", "Ben Böhmer"]
}
```
