import { Category } from "../data/questions";
import { QUESTIONS_PER_DAY } from "./settings";

// Base info
export const GAME_TITLE = "Triviale";
export const LOGO_ALT = `${GAME_TITLE} Logo`;
export const GAME_URL = "https://www.triviale.net/";
export const CONTACT_EMAIL = "help.triviale@gmail.com";
export const ABOUT_AUTHOR_URL = "https://jetrlee.vercel.app/";
export const LOCALE = "en-US";
export const EDITED_BY = "Edited by Jet Lee";

// New features
export const NEW_FEATURES_LABEL = "New feature(s):";
export const NEW_FEATURES_LIST = [
  `I am beta-testing one question per day. Please send feedback to ${CONTACT_EMAIL}`,
];

// Landing page
export const LANDING_TITLE = "Landing page";
export const LANDING_DIALOG_ARIA = "landing-page";

// Help
export const ABOUT_AUTHOR_TITLE = "About the author";
export const HELP_HOW_TO_PLAY = "How To Play";
export const HELP_NUM_TRIES = `Try to answer the question before it's finished being asked. Reveal more hints by guessing or skipping your guess.`;
export const HELP_NUM_QUESTIONS = `Total of ${QUESTIONS_PER_DAY} questions per day.`;
export const HELP_HOW_TILE_COLORS_CHANGE =
  "The color of the tiles will change to show how close your guess was to the word.";
export const HELP_CORRECT_LETTER_AND_SPOT =
  "B is in the word and in the correct spot.";
export const HELP_CORRECT_LETTER_WRONG_SPOT =
  "R is in the word but in the wrong spot.";
export const HELP_TITLE = "Help";
export const HELP_DIALOG_ARIA = "help-dialog-slide";
export const HELP_WRONG_LETTER = "T is not in the word in any spot.";
export const HELP_BUTTON_ARIA = "help";
export const EXAMPLES_TEXT = "Examples";

// Cell descriptions
export const PRESENT_TEXT = "present in another position";
export const ABSENT_TEXT = "absent";
export const CORRECT_TEXT = "correct";
export const ENTER_TEXT = "Enter";
export const ENTER_KEY_ID = "ENTER_KEY";

// Settings
export const SETTINGS_BUTTON_ARIA = "settings";
export const SETTINGS_TITLE = "Settings";
export const SETTINGS_DIALOG_ARIA = "settings-dialog-slide";
export const HARD_MODE_ALERT_MESSAGE =
  "Hard Mode can be toggled only at the start of the game!";
export const HARD_MODE_LABEL = "Hard Mode";
export const HARD_MODE_DESCRIPTION = "No clues given about answer length";
export const DARK_MODE_LABEL = "Dark Theme";
export const HIGH_CONTRAST_MODE_LABEL = "High Contrast Mode";
export const HIGH_CONTRAST_MODE_DESCRIPTION = "For improved color vision";
export const ONSCREEN_KEYBOARD_ONLY_LABEL = "Onscreen Keyboard Input Only";
export const ONSCREEN_KEYBOARD_ONLY_DESCRIPTION =
  "Ignore key input except from the onscreen keyboard. Most helpful for users using speech recognition or other assistive devices.";

// Submit messages
export const WIN_MESSAGES = ["Great Job!", "Awesome!", "Well done!"];
export const GAME_COPIED_MESSAGE = "Game copied to clipboard";
export const NOT_ENOUGH_LETTERS_MESSAGE = "Not enough letters";
export const WORD_NOT_FOUND_MESSAGE = "Word not found";
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}`;
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`;
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`;
export const NUMBER_CORRECT_TEXT = (numCorrect: number) =>
  `Got ${numCorrect} / ${QUESTIONS_PER_DAY} correct`;

// Skip messages
export const SKIP_LETTER = "-";
export const SKIPPED_TEXT = "skipped";

// Center button messages
export const SKIP_BUTTON_TEXT = "Reveal the next clue";
export const NEXT_QUESTIONS_TEXT = "Next Question";
export const NEXT_QUESTIONS_WIN_TEXT = (randomIndex: number) =>
  WIN_MESSAGES[randomIndex] + " " + NEXT_QUESTIONS_TEXT;
export const WIN_MESSAGE_TEXT = (randomIndex: number, numWon: number) =>
  WIN_MESSAGES[randomIndex] + " " + NUMBER_CORRECT_TEXT(numWon);

// Encouragement
export const START_ENCOURAGEMENT_TEXT =
  "Answer the question before it's finished being asked!";
export const RESUME_ENCOURAGEMENT_TEXT = "Welcome back! Keep it up!";

// Progress button
export const PROGRESS_BUTTON_TEXT = (
  questionNumber: number,
  category: Category
) => `${QUESTIONS_PER_DAY > 1 ? "Q" + questionNumber + ", " : ""}${category}`;

// Sharing
export const SHARE_POINTS = (points: number) =>
  `I got ${points} points in ${GAME_TITLE}!`;
export const SHARE_LINK = `See how you compare: ${GAME_URL}`;
export const SHARE_TEXT = "Share";

// Stats
export const STATS_DIALOG_ARIA = "statistics-dialog-slide";
export const STATISTICS_TITLE = "Statistics";
export const GUESS_DISTRIBUTION_TEXT = "Guess Distribution";
export const OPEN_STATS_TEXT = "Open stats";
export const SHARE_FAILURE_TEXT =
  "Unable to share the results. This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.";
export const ADVANCED_STATS_LABEL = "Advanced Stats";
export const ADVANCED_STATS_ARIA_LABEL = "Open advanced stats";
export const TOTAL_TRIES_TEXT = "Played";
export const SUCCESS_RATE_TEXT = "Win %";
export const CURRENT_STREAK_TEXT = "Current Streak";
export const BEST_STREAK_TEXT = "Max Streak";
export const ADV_STATS_CATEGORY_TEXT = "Cat.";
export const ADV_STATS_TOTAL_TRIES_TEXT = "Played";
export const ADV_STATS_AVG_GUESS_TEXT = "Avg Guess";

// Feedback
export const FEEDBACK_TEXT = "Feedback";
export const BUG_REPORT_TEXT = "Bug Report";
export const EMAIL_TEXT = "Email";

// Subscribe
export const SUBSCRIBE_TEXT = "Buy me a coffee";
export const SUBSCRIPTIONS_TEXT = "Subscriptions";
export const SUBSCRIBE_BUTTON_ARIA = "subscribe-button";

// Profiles
export const PROFILE_PAGE_TITLE = "Profile Page";
export const LOGIN_TITLE = "Login";
export const LOGIN_ARIA = "login-button";
export const LOGOUT_ARIA = "logout-button";
export const PROFILE_ARIA = "profile-button";
export const DELETE_USER_PROFILE_TEXT = "Delete Profile";

// Custom questions
export const EDIT_BUTTON_ARIA = "edit questions";
export const RETURN_FROM_EDIT_BUTTON_ARIA = "play questions";

// Misc
export const PLAY_CLASSIC_MODE_LABEL = "Play";
export const RESUME_PLAY_LABEL = "Resume";
export const IN_TEXT = "in";
export const PLACEHOLDER_TEXT = "Coming soon";
export const NEW_WORD_TEXT = "New word in";

//// Unused
// export const MIGRATE_BUTTON_TEXT = "Transfer";
// export const MIGRATE_DESCRIPTION_TEXT =
//   "Click here to transfer your statistics to a new device.";
// export const DISCOURAGE_INAPP_BROWSER_TEXT =
// "You are using an embedded browser and may experience problems sharing or saving your results. We encourage you rather to use your device's default browser.";
// export const DATEPICKER_TITLE = "Choose a past date";
// export const DATEPICKER_CHOOSE_TEXT = "Choose";
// export const DATEPICKER_TODAY_TEXT = "today";
// export const ARCHIVE_GAMEDATE_TEXT = "Game date";
