# [Triviale]
[Triviale]: https://www.triviale.net/

A daily trivia puzzle game. Try to answer the question before it's finished being asked!

![Triviale image](https://jetrlee.vercel.app/Triviale.png)

Introducing **Triviale** — where curiosity meets competition.

Triviale combines the viral simplicity of Wordle with the intellectual depth of trivia. Each day, players solve a short trivia puzzle by typing in the correct word or phrase, unlocking new hints as they go. It’s quick, clever, and shareable.

🎯 **The Problem:** Most trivia games rely on multiple choice and luck instead of knowledge and deduction. People want something smarter, shorter, and more satisfying.

💡 **The Solution:** Triviale is a daily trivia riddle that makes you think, not guess. Players type answers, see real-time feedback (like Wordle), and unlock clues until they solve it.

🧩 **How It Works:**

1. A new question every day (example: “After this event, critics complained that a two-year timeline has not yet begun because…”)
2. Type your guess and get letter-by-letter feedback.
3. Unlock new clues as you play.
4. Share your spoiler-free results with friends.

🚀 **Why Now:** Wordle showed that millions love simple, daily puzzles. Trivia is a $6B+ market — but no one has merged daily puzzles with real knowledge until now. Triviale = Wordle’s virality × Jeopardy’s depth.

👥 **Audience:** Trivia lovers, crossword fans, lifelong learners, educators, and anyone who loves daily mental challenges.

💰 **Business Model:** Freemium with premium packs, archives, and sponsored trivia categories. Share-to-play incentives drive organic growth.

📈 **Roadmap:**

* Phase 1: MVP launch (daily puzzles + sharing)
* Phase 2: Categories, leaderboards
* Phase 3: Mobile app & monetization
* Phase 4: Multiplayer tournaments + AI-generated trivia

🎯 **Our Vision:** To make learning addictive. To turn “Did you know?” into a daily habit shared by millions.

**Triviale — Where curiosity meets competition.**


## Features

- Three new questions every day
- Expand a question to get more info
- Answer the question in a Wordle-style
- Hard mode (no information is given about the answer's length)
- Dark mode
- High contrast mode
- User accounts

## Technical Info
- The website is hosted on [Vercel](https://vercel.com/) and auto-deploys from the Production branch
   - The main branch is used for development and staging
- The questions are tested a day beforehand by a [QA engineer](https://github.com/mncasay)
- The front-end is written in React and TypeScript
- Questions are stored in a MongoDB database and queried with a REST API
- User account logins are handled by Auth0
- I am currently fine-tuning auto-generated questions with Chat-GPT 4


## Setup

Need: `npm`

Install dependencies:
`npm install`

Run the program locally:
`npm run dev`
This will open Triviale on your localhost. eg. `http://localhost:5173/`
