import {
  FLIP_ANIMATION_MS,
  REVEAL_TIME_MS,
  WAVE_BOUNCE_MS,
  WAVE_STEP_MS,
} from "../constants/settings";

// Total time for a submitted row's flip reveal to finish, including the
// per-letter stagger — the earliest moment it's safe to start anything that
// should wait for every tile to have flipped (e.g. the win wave).
export const getFlipTotalMs = (wordLength: number) =>
  REVEAL_TIME_MS * Math.max(wordLength - 1, 0) + FLIP_ANIMATION_MS;

// Total time for a won row's letter-by-letter bounce wave to finish.
export const getWaveTotalMs = (wordLength: number) =>
  WAVE_STEP_MS * Math.max(wordLength - 1, 0) + WAVE_BOUNCE_MS;
