import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import HardModeSwitch from "../../../../src/components/navbar/settings/HardModeSwitch";
import { HARD_MODE_ALERT_MESSAGE } from "../../../../src/constants/strings";
import useGameStateStore from "../../../../src/stores/gameStateStore";
import useHardModeStore from "../../../../src/stores/hardModeStore";

describe("HardModeSwitch", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useHardModeStore.getState().setHardMode(false);
  });

  it("toggles hard mode when every question's guesses are still empty", () => {
    render(<HardModeSwitch />);
    fireEvent.click(screen.getByRole("checkbox"));

    expect(useHardModeStore.getState().hardMode).toBe(true);
    expect(screen.queryByText(HARD_MODE_ALERT_MESSAGE)).not.toBeInTheDocument();
  });

  it("refuses to toggle once any guess has been submitted, and shows the alert instead", () => {
    useGameStateStore.getState().makeGuess(["A", "B", "C"]);
    render(<HardModeSwitch />);
    fireEvent.click(screen.getByRole("checkbox"));

    expect(useHardModeStore.getState().hardMode).toBe(false);
    expect(screen.getByText(HARD_MODE_ALERT_MESSAGE)).toBeInTheDocument();
  });

  it("blocks the toggle even when the submitted guess belongs to a different question", () => {
    useGameStateStore.getState().moveToQuestion(2);
    useGameStateStore.getState().makeGuess(["X"]);
    render(<HardModeSwitch />);
    fireEvent.click(screen.getByRole("checkbox"));

    expect(useHardModeStore.getState().hardMode).toBe(false);
  });
});
