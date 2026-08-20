import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import AdvancedStats from "../../../../src/components/navbar/stats/AdvancedStats";
import { MAX_CHALLENGES } from "../../../../src/constants/settings";
import {
  ADV_STATS_AVG_GUESS_TEXT,
  ADV_STATS_CATEGORY_TEXT,
  ADV_STATS_TOTAL_TRIES_TEXT,
} from "../../../../src/constants/strings";
import { ALL_CATEGORIES } from "../../../../src/data/questions";
import useStatsStore from "../../../../src/stores/statsStore";

const emptyCategoryStat = () => ({
  numQuestionsAttempted: 0,
  questionsGuessedIn: Array(MAX_CHALLENGES).fill(0),
  changedToday: Array(MAX_CHALLENGES).fill(false),
});

describe("AdvancedStats", () => {
  beforeEach(() => {
    useStatsStore.setState(useStatsStore.getInitialState(), true);
  });

  it("renders the header row and one row per category", () => {
    render(<AdvancedStats />);

    expect(screen.getByText(ADV_STATS_CATEGORY_TEXT)).toBeInTheDocument();
    expect(screen.getByText(ADV_STATS_TOTAL_TRIES_TEXT)).toBeInTheDocument();
    expect(screen.getByText(ADV_STATS_AVG_GUESS_TEXT)).toBeInTheDocument();
    ALL_CATEGORIES.forEach((c) => {
      expect(screen.getByText(c)).toBeInTheDocument();
    });
  });

  it("computes the weighted-average guesses-to-win per category, and floors a never-won category to 0", () => {
    useStatsStore.setState({
      advancedStats: {
        ...ALL_CATEGORIES.reduce(
          (acc, c) => ({ ...acc, [c]: emptyCategoryStat() }),
          {} as Record<string, ReturnType<typeof emptyCategoryStat>>
        ),
        // Weighted average = sum(count * (bucketIndex + 1)) / sum(count):
        // won twice on the 1st guess, once on the 2nd -> (2*1 + 1*2) / 3 = 1.33.
        ART: {
          numQuestionsAttempted: 3,
          questionsGuessedIn: [2, 1, 0, 0, 0],
          changedToday: Array(MAX_CHALLENGES).fill(false),
        },
        // A single win on the 3rd guess -> (1*3) / 1 = 3.
        HIS: {
          numQuestionsAttempted: 1,
          questionsGuessedIn: [0, 0, 1, 0, 0],
          changedToday: Array(MAX_CHALLENGES).fill(false),
        },
        // Attempted 5 times but never recorded a winning-guess bucket -- the
        // Math.max(sum, 1) guard keeps this a clean 0/1 instead of 0/0 (NaN).
        SCI: {
          numQuestionsAttempted: 5,
          questionsGuessedIn: [0, 0, 0, 0, 0],
          changedToday: Array(MAX_CHALLENGES).fill(false),
        },
      },
    });

    const { container } = render(<AdvancedStats />);

    expect(container.textContent).toContain("ART31.33");
    expect(container.textContent).toContain("HIS13");
    expect(container.textContent).toContain("SCI50");
  });

  it("renders 0 for every category when advancedStats itself is missing", () => {
    useStatsStore.setState({ advancedStats: undefined });
    render(<AdvancedStats />);
    expect(screen.getAllByText("0")).toHaveLength(ALL_CATEGORIES.length * 2);
  });
});
