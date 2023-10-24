import { MAX_CHALLENGES, QUESTIONS_PER_DAY } from "./settings";

export const HELP_HOW_TO_PLAY = "How To Play";
export const HELP_NUM_TRIES = `Guess each answer in ${MAX_CHALLENGES} tries.`;
export const HELP_NUM_QUESTIONS = `Total of ${QUESTIONS_PER_DAY} questions per day.`;
export const HELP_HOW_TILE_COLORS_CHANGE =
  "          The color of the tiles will change to show how close your guess was to the word.";
export const HELP_DIALOG_ARIA = "help-dialog-slide";

export const WIN_MESSAGES = ["Great Job!", "Awesome", "Well done!"];
export const GAME_COPIED_MESSAGE = "Game copied to clipboard";
export const NOT_ENOUGH_LETTERS_MESSAGE = "Not enough letters";
export const WORD_NOT_FOUND_MESSAGE = "Word not found";

export const SETTINGS_DIALOG_ARIA = "settings-dialog-slide";
export const HARD_MODE_ALERT_MESSAGE =
  "Hard Mode can be enabled only at the start!";
export const HARD_MODE_LABEL = "Hard Mode";
export const HARD_MODE_DESCRIPTION = "Only one answer per question";
export const DARK_MODE_LABEL = "Dark Theme";
export const HIGH_CONTRAST_MODE_LABEL = "High Contrast Mode";
export const HIGH_CONTRAST_MODE_DESCRIPTION = "For improved color vision";
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}`;
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`;
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`;
export const ENTER_TEXT = "Enter";
export const STATISTICS_TITLE = "Statistics";
export const GUESS_DISTRIBUTION_TEXT = "Guess Distribution";
export const NEW_WORD_TEXT = "New word in";
export const SHARE_TEXT = "Share";
export const SHARE_FAILURE_TEXT =
  "Unable to share the results. This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.";
export const MIGRATE_BUTTON_TEXT = "Transfer";
export const MIGRATE_DESCRIPTION_TEXT =
  "Click here to transfer your statistics to a new device.";
export const TOTAL_TRIES_TEXT = "Total tries";
export const SUCCESS_RATE_TEXT = "Success rate";
export const CURRENT_STREAK_TEXT = "Current streak";
export const BEST_STREAK_TEXT = "Best streak";
export const DISCOURAGE_INAPP_BROWSER_TEXT =
  "You are using an embedded browser and may experience problems sharing or saving your results. We encourage you rather to use your device's default browser.";

export const DATEPICKER_TITLE = "Choose a past date";
export const DATEPICKER_CHOOSE_TEXT = "Choose";
export const DATEPICKER_TODAY_TEXT = "today";
export const ARCHIVE_GAMEDATE_TEXT = "Game date";
