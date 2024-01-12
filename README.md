# [Triviale]
[Triviale]: https://www.triviale.net/

A daily trivia puzzle game. Try to answer the question before it's finished being asked!

## Features

- Three new questions every day
- Expand a question to get more info
- Answer the question in a Wordle-style
- Hard mode (no information is given about the answer's length)
- Dark mode
- High contrast mode
- User accounts

## Technical Info
The front-end is written in React and TypeScript. Questions are stored in a MongoDB database and queried with a REST API. User account logins are handled by Auth0. Currently fine-tuning auto-generated questions with Chat-GPT 4.


## Setup

Need: `npm`

Install dependencies:
`npm install`

Run the program locally:
`npm run dev`
This will open Triviale on your localhost. eg. `http://localhost:5173/`
