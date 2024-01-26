import { Alert, Grid, Paper, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import ThemedLayout from "../components/ThemedLayout";
import GameGrid from "../components/grid/GameGrid";
import Keyboard from "../components/keyboard/Keyboard";
import NavBar from "../components/navbar/NavBar";
import ProgressBar from "../components/progressBar/ProgressBar";
import ExpandableText from "../components/question/ExpandableText";
import { MAX_CHALLENGES, QUESTIONS_PER_DAY } from "../constants/settings";
import useDailyIndex, { getPositiveIndex } from "../hooks/useDailyIndex";
import useQuestions from "../hooks/useQuestions";
import useCurrGuessStore from "../stores/currGuessStore";
import useDialogStore from "../stores/dialogStore";
import useGameStateStore from "../stores/gameStateStore";
import useHardModeStore from "../stores/hardModeStore";
import useOnscreenKeyboardOnlyStore from "../stores/onscreenKeyboardOnlyStore";
import useRetrievedStore from "../stores/retrievedStore";
import useStatsStore from "../stores/statsStore";

const HomePage = () => {
  const { data } = useQuestions();
  const hardMode = useHardModeStore((s) => s.hardMode);
  const { addChar, deleteChar, index, guess, resetGuess, importGuess } =
    useCurrGuessStore();
  const {
    questionNumber,
    makeGuess,
    guessNumber,
    moveToNextQuestion,
    gameState,
    questionState,
    winGame,
    loseGame,
    winQuestion,
    loseQuestion,
    guesses,
    importGame,
    cacheGuess,
  } = useGameStateStore();

  const matches = useMediaQuery("(min-width:600px)");
  const dailyIndex = useDailyIndex();
  const retrieved = useRetrievedStore((s) => s.retrieved);
  const safeIndex = getPositiveIndex(
    questionNumber + (retrieved ? 0 : dailyIndex)
  );
  const question = data[safeIndex].question;
  const answerWithSpaces = data[safeIndex].answer.toLocaleUpperCase();
  const fullAnswer = data[safeIndex].fullAnswer;
  const answer = answerWithSpaces.replace(/\s+/g, "");
  const { setStatsOpen } = useDialogStore();
  const { importStats, logGame } = useStatsStore();
  const {
    questionsGuessedIn,
    numQuestionsAttempted,
    changedToday,
    advancedStats,
  } = useStatsStore();
  const { onscreenKeyboardOnly } = useOnscreenKeyboardOnlyStore();

  const todaysCategories = Array(QUESTIONS_PER_DAY)
    .fill("")
    .map((_, i) => data[getPositiveIndex(dailyIndex + i)].category);

  // Running on unload or beforeunload is unreliable according to https://developer.chrome.com/articles/page-lifecycle-api/#legacy-lifecycle-apis-to-avoid
  useEffect(() => {
    window.addEventListener("visibilitychange", handleTabClosing);
    return () => {
      window.removeEventListener("visibilitychange", handleTabClosing);
    };
  });

  // Save game state to local storage.
  const handleTabClosing = () => {
    localStorage.setItem(
      "prevGame",
      JSON.stringify({
        pastOffset: dailyIndex,
        gameState: gameState,
        questionState: questionState,
        questionNumber: questionNumber,
        guessNumber: guessNumber,
        guesses: guesses,
      })
    );
    localStorage.setItem(
      "gameStats",
      JSON.stringify({
        numQuestionsAttempted: numQuestionsAttempted,
        questionsGuessedIn: questionsGuessedIn,
        changedToday: changedToday,
        dailyIndex: dailyIndex,
        advancedStats: advancedStats,
      })
    );
  };

  // Get past stats on page load
  useEffect(() => {
    // Check if the user has already made guesses today.
    const existingStats = localStorage.getItem("gameStats") || "{}";
    console.log(existingStats);
    const pastStats = JSON.parse(existingStats);
    if (pastStats["numQuestionsAttempted"]) {
      console.log("Importing past stats");
      const pastData = {
        numQuestionsAttempted: pastStats["numQuestionsAttempted"],
        questionsGuessedIn: pastStats["questionsGuessedIn"],
        changedToday:
          pastStats["dailyIndex"] === dailyIndex
            ? pastStats["changedToday"]
            : Array(MAX_CHALLENGES).fill(false),
        advancedStats: pastStats["advancedStats"],
      };
      importStats(pastData);
    } else {
      console.log("No previous stats");
    }
  }, []);

  // Get a game in progress from today.
  useEffect(() => {
    // Check if the user has already made guesses today.
    const existingGuesses = localStorage.getItem("prevGame") || "{}";
    console.log(existingGuesses);
    const pastGuesses = JSON.parse(existingGuesses);
    if (pastGuesses["pastOffset"] === dailyIndex) {
      console.log("Importing past guesses");
      const pastGame = {
        gameState: pastGuesses["gameState"],
        questionState: pastGuesses["questionState"],
        questionNumber: pastGuesses["questionNumber"],
        guessNumber: pastGuesses["guessNumber"],
        guesses: pastGuesses["guesses"],
      };
      importGame(pastGame);
      if (pastGame.gameState === "inProgress") {
        importGuess(
          pastGame.guesses[pastGame.questionNumber][
            pastGame.guessNumber[pastGame.questionNumber]
          ]
        );
      }
    } else {
      // No previous guesses
      console.log("No previous guesses");
    }
  }, []);

  return (
    <ThemedLayout>
      <Grid container paddingY={matches ? 1 : 0}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12} px={1}>
          <ProgressBar />
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              maxHeight: matches ? "100dvh" : "calc(100dvh - 290px)",
              overflow: "auto",
            }}
          >
            <Grid item xs={12} sx={{ mx: 0, pt: 1 }}>
              <ExpandableText>{question}</ExpandableText>
            </Grid>
            <Grid item xs={12} sx={{ px: 1, mb: 1 }}>
              {questionState[questionNumber] === "lost" && (
                <Alert severity="info" sx={{ mb: 1, mx: 2 }}>
                  Answer was {answerWithSpaces}
                  {fullAnswer ? `, as in ${fullAnswer}` : ""}
                </Alert>
              )}
              <GameGrid />
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ px: 0 }}>
          <Keyboard
            onChar={(c) => {
              console.log(c);
              if (
                (hardMode || index < answer.length) &&
                questionState[questionNumber] === "inProgress"
              ) {
                addChar(c);
                cacheGuess([...guess, c]);
              }
            }}
            onDelete={() => {
              console.log("delete");
              deleteChar();
              cacheGuess(guess.filter((_, i) => i !== guess.length - 1));
            }}
            onEnter={() => {
              console.log("enter");
              let finalGuess = false;
              let won = false;
              let hasOneMoreGuess =
                questionState.filter((state) => state === "inProgress")
                  .length === 1;
              if (index === answer.length || hardMode) {
                if (guess.join("") === answer) {
                  winQuestion(questionNumber);
                  if (!onscreenKeyboardOnly) {
                    document.getElementById("ExpandableButton")?.focus();
                  }
                  finalGuess = true;
                  won = true;
                } else if (guessNumber[questionNumber] >= MAX_CHALLENGES - 1) {
                  loseQuestion(questionNumber);
                  if (!onscreenKeyboardOnly) {
                    document.getElementById("ExpandableButton")?.focus();
                  }
                  finalGuess = true;
                } else {
                  console.log("Incorrect :(");
                }
                makeGuess(guess);
                resetGuess();
              }
              if (
                !questionState.includes("inProgress") ||
                (hasOneMoreGuess && finalGuess)
              ) {
                if (
                  questionState.reduce(
                    (acc, state) => acc && state === "won",
                    true
                  ) ||
                  (hasOneMoreGuess && won)
                ) {
                  winGame();
                } else {
                  loseGame();
                }
                // Report the current game's stats
                let todaysQuestionsGuessedIn = Array(MAX_CHALLENGES).fill(0);
                let indexOfLastGuess = guesses.map(
                  (allGuessesForQuestion) =>
                    allGuessesForQuestion.filter(
                      (singleGuess) => singleGuess.join() !== ""
                    ).length - 1
                );
                indexOfLastGuess.forEach((guessIndex, questionIndex) => {
                  let guessIncrease =
                    questionState[questionIndex] === "won" ||
                    (questionIndex === questionNumber &&
                      hasOneMoreGuess &&
                      guess.join("") === answer)
                      ? 1
                      : 0;
                  todaysQuestionsGuessedIn[guessIndex] += guessIncrease;
                  let c = todaysCategories[questionIndex];
                  if (advancedStats) {
                    advancedStats[c] = {
                      ...advancedStats[c],
                      questionsGuessedIn: advancedStats[
                        c
                      ].questionsGuessedIn.map((val, i) =>
                        i === guessIndex ? val + guessIncrease : val
                      ),
                    };
                  }
                });
                if (advancedStats) {
                  todaysCategories.forEach(
                    (c) =>
                      (advancedStats[c] = {
                        ...advancedStats[c],
                        numQuestionsAttempted:
                          advancedStats[c].numQuestionsAttempted + 1,
                        changedToday: advancedStats[c].questionsGuessedIn.map(
                          (v) => v > 0
                        ),
                      })
                  );
                }
                logGame({
                  numQuestionsAttempted: QUESTIONS_PER_DAY,
                  questionsGuessedIn: todaysQuestionsGuessedIn,
                  changedToday: todaysQuestionsGuessedIn.map((v) => v > 0),
                });
                setStatsOpen(true);
                return;
              }
              if (
                questionState[questionNumber] !== "inProgress" &&
                gameState === "inProgress"
              ) {
                resetGuess();
                moveToNextQuestion();
              }
            }}
            isRevealing={false}
          />
        </Grid>
      </Grid>
    </ThemedLayout>
  );
};

export default HomePage;
