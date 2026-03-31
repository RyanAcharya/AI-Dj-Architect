interface EnergyPoint {
  minute: number;
  energy: number;
}

interface KeyPreferences {
  harmonic_mixing: boolean;
  start_key: string | null;
}

interface Constraints {
  max_bpm_jump: number;
  avoid_vocals_clash: boolean;
  min_track_duration: number;
}

interface SourceRules {
  allow_remixes: boolean;
  exclude_live_versions: boolean;
  exclude_radio_rips: boolean;
}

interface DJSetConfig {
  set_id: string;
  duration_minutes: number;
  target_track_count: number;
  genre: string[];
  artists: string[];
  bpm_range: [number, number];
  bpm_progression: "increasing" | "decreasing" | "stable" | "varied";
  energy_curve_type: "progressive_peak" | "sustained_peak" | "wave" | "gradual_descent" | "opening_warmup";
  energy_arc: EnergyPoint[];
  vibe: string;
  transition_style: "smooth_blend" | "quick_cut" | "slam" | "creative_mashup";
  vocal_density: "none" | "low" | "medium" | "high";
  key_preferences: KeyPreferences;
  constraints: Constraints;
  source_rules: SourceRules;
}

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  plays: number;
  likes: number;
  reposts: number;
  comments: number;
  genre: string;
  created_at: string;
  release_date: string;
  url: string;
  artwork: string;
  streamable: boolean;
  downloadable: boolean;
  label: string;
  tags: string;
  score: number;
}

export type { DJSetConfig, EnergyPoint, KeyPreferences, Constraints, SourceRules, Track };