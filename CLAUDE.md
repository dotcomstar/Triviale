# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tool Usage Rules

Always use context7 when I need code generation, setup or configuration steps, or library/API documentation. This means you should automatically use the Context7 MCP tools to resolve library id and get library docs without me having to explicitly ask.

## Project Overview

Triviale is a daily trivia puzzle game where users try to answer questions before they're fully revealed. The game presents questions daily with a Wordle-style answer input system.

## Development Commands

**Install dependencies:**
```bash
npm install
```

**Run development server:**
```bash
npm run dev
```
Opens the application at `http://localhost:5173/`

**Build for production:**
```bash
npm run build
```
This runs TypeScript compilation followed by Vite build.

**Lint code:**
```bash
npm run lint
```
Runs ESLint on `.ts` and `.tsx` files.

**Preview production build:**
```bash
npm run preview
```

## Architecture Overview

### State Management (Zustand)

The application uses Zustand for client-side state management with multiple specialized stores located in `src/stores/`:

- **gameStateStore**: Core game logic including win/loss states, current question tracking, guess management, and question progression. Contains the game's WinState (`"won"`, `"lost"`, `"inProgress"`) and manages up to `QUESTIONS_PER_DAY` questions with `MAX_CHALLENGES` (5) guesses each.
- **currGuessStore**: Manages the current guess input (adding/deleting characters, resetting).
- **statsStore**: Tracks game statistics including guess distribution and historical performance.
- **hardModeStore**: Toggles hard mode (no answer length hints).
- **highContrastStore**: Toggles high contrast visual mode.
- **onscreenKeyboardOnlyStore**: Forces on-screen keyboard usage.
- **dialogStore**: Controls modal/dialog visibility states.
- **customQuestionsStore**: Manages custom question creation.
- **editingStore**: Tracks whether user is in question editing mode.
- **retrievedStore**: Tracks whether questions were successfully retrieved from MongoDB.

Zustand stores use devtools in development mode via `simple-zustand-devtools`.

### Data Flow

**Questions Source:**
- Questions are defined in `src/data/questions.ts` with a structured `Question` interface (question text, answer, category, optional addOns/altAnswers/fullAnswer).
- The app has MongoDB API integration code (currently commented out in `useQuestions.ts`) that can fetch daily questions from a MongoDB endpoint (`src/services/api-client.ts`).
- Falls back to local questions data when MongoDB is unavailable.

**Daily Question Selection:**
- `useDailyIndex` hook calculates which question index to use based on current date and `MANUAL_OFFSET` constant.
- Questions are indexed to dates, ensuring users see the same question on the same day.

**Answer Validation:**
- Supports multiple acceptable answers via `altAnswer` array.
- Supports answer variations with prefixes/suffixes via `addOns` array.
- All validation is case-insensitive and ignores spaces.

### Component Structure

**Pages** (`src/pages/`):
- **HomePage**: Main game interface orchestrating grid, keyboard, question display, and game logic.
- **Layout**: Wraps the app with Auth0Provider for authentication and ThemedLayout for dark mode.
- **UserProfilePage**: Protected route for user profile (requires authentication).
- **ErrorPage**: Error boundary fallback.

**Key Components** (`src/components/`):
- **grid/**: GameGrid, GameRow, and Cell components implementing the Wordle-style answer grid with color-coded feedback.
- **keyboard/**: On-screen Keyboard and Key components for letter input.
- **question/**: ExpandableText (reveals question progressively) and CustomizableText (for custom questions).
- **navbar/**: Navigation with settings, stats dialogs, and hamburger drawer.
- **auth/**: Login/Logout buttons, PrivateRoutes wrapper, ProfileButton.
- **progressBar/**: Visual progress indicator.
- **ThemedLayout**: Wraps app with MUI theme provider supporting light/dark modes.

### Routing

React Router v6 with `createBrowserRouter`:
- `/`: Home page (main game)
- `/profile`: Protected route for user profile (Auth0 authentication required)
- `/login/callback`: Auth0 callback redirect

### External Services

**Auth0 Authentication:**
- Domain: `triviale.us.auth0.com`
- Client ID is hardcoded in Layout.tsx (consider moving to environment variables)
- Handles user login/logout and profile management

**MongoDB API:**
- Base URL: `https://us-west-2.aws.data.mongodb-api.com/app/data-xenan/endpoint`
- Currently not active (code commented out in useQuestions)
- Intended for daily question retrieval

**Analytics:**
- Vercel Analytics integrated in production mode (`@vercel/analytics`)

**React Query:**
- TanStack Query for data fetching and caching
- Devtools enabled in development

### Styling

- Material-UI (MUI v5) with Emotion for styling
- Custom theme with dark mode support
- High contrast mode option for accessibility
- Mobile-responsive with breakpoint at `600px` (`MOBILE_SCREEN_CUTOFF`)

### Key Settings

Constants in `src/constants/settings.ts`:
- `MAX_CHALLENGES = 5`: Maximum guesses per question
- `QUESTIONS_PER_DAY = 1`: Number of daily questions
- `MANUAL_OFFSET = -9`: Calibration offset for date-to-question mapping
- `MOBILE_SCREEN_CUTOFF = "600px"`: Responsive breakpoint

### Game Logic Flow

1. HomePage loads questions via `useQuestions()` hook
2. Daily index calculated based on date determines which question to show
3. User types guess via keyboard (physical or on-screen)
4. Guess stored in `currGuessStore`, validated against answer and altAnswers
5. On correct guess: `winQuestion()` called, user proceeds to next question or wins game
6. On max guesses: `loseQuestion()` called, user proceeds or loses game
7. Game state persisted via Zustand stores (can be imported/exported)
8. Stats tracked and displayed in stats dialog

### Deployment

- Production branch auto-deploys to Vercel
- Main branch used for development/staging
- Questions tested a day in advance by QA engineer

## Important Notes

- The app uses a **date-based question system** - changes to questions affect which question appears on specific dates
- When modifying question data in `src/data/questions.ts`, be aware of the `MANUAL_OFFSET` and date calculation logic
- Auth0 credentials are currently hardcoded - consider environment variables for different environments
- MongoDB integration exists but is commented out - if re-enabling, ensure fallback to local data works correctly
