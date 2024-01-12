# [Triviale]
[Triviale]: https://www.triviale.net/

A daily trivia puzzle game. Try to answer the question before it's finished being asked!

![Triviale image](https://jetrlee.vercel.app/Triviale.png)

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
