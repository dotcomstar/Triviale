import { Alert, Grid, Paper, useMediaQuery } from "@mui/material";
import { useEffect, useRef } from "react";
import GameGrid from "../components/grid/GameGrid";
import Keyboard from "../components/keyboard/Keyboard";
import NavBar from "../components/navbar/NavBar";
import ProgressBar from "../components/progressBar/ProgressBar";
import ExpandableText from "../components/question/ExpandableText";
import CustomizableText from "../components/question/custom/CustomizableText";
import {
  MAX_CHALLENGES,
  MOBILE_SCREEN_CUTOFF,
  QUESTIONS_PER_DAY,
} from "../constants/settings";
import useDailyIndex, { getPositiveIndex } from "../hooks/useDailyIndex";
import useQuestions from "../hooks/useQuestions";
import useCurrGuessStore from "../stores/currGuessStore";
import useDialogStore from "../stores/dialogStore";
import useEditingStore from "../stores/editingStore";
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

  const isNotMobile = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const dailyIndex = useDailyIndex();
  const retrieved = useRetrievedStore((s) => s.retrieved);
  const editing = useEditingStore((s) => s.editing);
  const safeIndex = getPositiveIndex(
    questionNumber + (retrieved ? 0 : dailyIndex)
  );
  const question = data[safeIndex].question;
  const answerWithSpaces = data[safeIndex].answer.toLocaleUpperCase();
  const fullAnswer = data[safeIndex].fullAnswer;
  const answer = answerWithSpaces.replace(/\s+/g, "");

  // Calculate all permutations with addOns and answers.
  // TODO: Calculate all permutations with addOns and altAnswers as well
  const permutationsWithAddons =
    [[], ...(data[safeIndex].addOns || []), []].flatMap(
      (d) => data[safeIndex].addOns?.map((v) => d + answer + v) || []
    ) || [];

  // An array of all accepted answers in  uppercase with no spaces
  const allAcceptableAnswers = [
    data[safeIndex].answer,
    ...(data[safeIndex].altAnswer || []),
    ...(permutationsWithAddons || []),
  ].map((v) => v.toLocaleUpperCase().replace(/\s+/g, ""));

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

  const paperRef = useRef<HTMLDivElement>(null);

  // Ensure the content area starts scrolled to the top
  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTop = 0;
    }
  }, [questionNumber]);

  // Test localStorage compatibility in Discord iframe
  useEffect(() => {
    console.log('🎮 Phase 3 Testing - Storage & State Verification');
    console.log('='.repeat(50));

    // Test 1: localStorage compatibility
    try {
      const testKey = 'discord-storage-test';
      localStorage.setItem(testKey, 'works');
      const test = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);

      if (test === 'works') {
        console.log('✅ localStorage works in Discord environment');
      } else {
        console.warn('⚠️ localStorage test failed - storage may not persist');
      }
    } catch (error) {
      console.error('❌ localStorage is blocked in Discord iframe:', error);
      console.warn('Game state may not persist. Consider implementing Discord SDK storage fallback.');
    }

    // Test 2: Log daily index
    console.log('📅 Daily Index:', dailyIndex);
    console.log('📋 Total Questions Available:', data.length);
    console.log('🎯 Current Question Index (safe):', safeIndex);

    // Test 3: Check existing localStorage data
    const prevGame = localStorage.getItem('prevGame');
    const gameStats = localStorage.getItem('gameStats');

    if (prevGame && prevGame !== '{}') {
      console.log('💾 Found previous game data:', JSON.parse(prevGame));
    } else {
      console.log('🆕 No previous game data (starting fresh)');
    }

    if (gameStats && gameStats !== '{}') {
      console.log('📊 Found previous stats:', JSON.parse(gameStats));
    } else {
      console.log('🆕 No previous stats (starting fresh)');
    }

    console.log('='.repeat(50));
  }, [dailyIndex, safeIndex]);

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
  }, [dailyIndex, importStats]);

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
  }, [dailyIndex, importGame, importGuess]);

  return (
    <>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        sx={{
          height: "100dvh",
          width: "100vw",
          overflow: "hidden"
        }}
      >
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item px={1}>
          <ProgressBar />
        </Grid>
        <Grid
          item
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            px: 1
          }}
        >
          <Paper
            ref={paperRef}
            elevation={0}
            sx={{
              height: "100%",
              overflow: "auto",
            }}
          >
            <Grid container direction="column">
              <Grid item sx={{ mx: 0, pt: isNotMobile ? 1 : 0.5 }}>
                {editing ? (
                  <CustomizableText />
                ) : (
                  <ExpandableText>{question}</ExpandableText>
                )}
              </Grid>
              {!editing && (
                <Grid item sx={{ px: 0, mb: isNotMobile ? 1 : 0.5 }}>
                  {questionState[questionNumber] === "lost" && (
                    <Alert severity="info" sx={{ mb: 1, mx: isNotMobile ? 2 : 1 }}>
                      Answer was {answerWithSpaces}
                      {fullAnswer ? `, as in ${fullAnswer}` : ""}
                    </Alert>
                  )}
                  <GameGrid />
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item sx={{ px: 0 }}>
          {!editing && (
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
                const hasOneMoreGuess =
                  questionState.filter((state) => state === "inProgress")
                    .length === 1;
                if (index === answer.length || hardMode) {
                  if (
                    guess.join("") === answer ||
                    (hardMode && allAcceptableAnswers.includes(guess.join("")))
                  ) {
                    winQuestion(questionNumber);
                    if (!onscreenKeyboardOnly) {
                      document.getElementById("ExpandableButton")?.focus();
                    }
                    finalGuess = true;
                    won = true;
                  } else if (
                    guessNumber[questionNumber] >=
                    MAX_CHALLENGES - 1
                  ) {
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
                  const todaysQuestionsGuessedIn =
                    Array(MAX_CHALLENGES).fill(0);
                  const indexOfLastGuess = guesses.map(
                    (allGuessesForQuestion) =>
                      allGuessesForQuestion.filter(
                        (singleGuess) => singleGuess.join() !== ""
                      ).length - 1
                  );
                  indexOfLastGuess.forEach((guessIndex, questionIndex) => {
                    const guessIncrease =
                      questionState[questionIndex] === "won" ||
                      (questionIndex === questionNumber &&
                        hasOneMoreGuess &&
                        (guess.join("") === answer ||
                          (hardMode &&
                            allAcceptableAnswers.includes(guess.join("")))))
                        ? 1
                        : 0;
                    todaysQuestionsGuessedIn[guessIndex] += guessIncrease;
                    const c = todaysCategories[questionIndex];
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
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
