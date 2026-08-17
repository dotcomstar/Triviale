import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Keyboard from "../../../src/components/keyboard/Keyboard";
import useGameStateStore from "../../../src/stores/gameStateStore";
import useRetrievedStore from "../../../src/stores/retrievedStore";

describe("Keyboard", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useRetrievedStore.setState(useRetrievedStore.getInitialState(), true);
  });

  it("renders all 26 letter keys plus ENTER and DELETE", () => {
    render(<Keyboard onChar={vi.fn()} onDelete={vi.fn()} onEnter={vi.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(28);
    expect(screen.getByRole("button", { name: "ENTER key" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "DELETE key" })).toBeInTheDocument();
  });

  it("calls onChar with the letter when a letter key is clicked", () => {
    const onChar = vi.fn();
    render(<Keyboard onChar={onChar} onDelete={vi.fn()} onEnter={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Q key" }));
    expect(onChar).toHaveBeenCalledWith("Q");
  });

  it("calls onEnter when ENTER is clicked", () => {
    const onEnter = vi.fn();
    render(<Keyboard onChar={vi.fn()} onDelete={vi.fn()} onEnter={onEnter} />);
    fireEvent.click(screen.getByRole("button", { name: "ENTER key" }));
    expect(onEnter).toHaveBeenCalled();
  });

  it("calls onDelete when DELETE is clicked", () => {
    const onDelete = vi.fn();
    render(<Keyboard onChar={vi.fn()} onDelete={onDelete} onEnter={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "DELETE key" }));
    expect(onDelete).toHaveBeenCalled();
  });

  it("colors a guessed letter absent from the answer as an error, and one present but misplaced as a warning", () => {
    // Force safeIndex = questionNumber (0) + 0, so this always checks
    // against questions[0] regardless of what "today" is.
    useRetrievedStore.getState().setRetrieved(true);
    // questions[0].answer === "Johannesburg" -> "JOHANNESBURG" once
    // uppercased (no spaces to strip here). "G" is in the answer (last
    // letter) but this guess puts it first; "Q" isn't in the answer at all.
    useGameStateStore.getState().makeGuess(["G", "Q", "Q", "Q", "Q"]);

    render(<Keyboard onChar={vi.fn()} onDelete={vi.fn()} onEnter={vi.fn()} />);

    expect(screen.getByRole("button", { name: "G key" }).className).toContain(
      "Warning"
    );
    expect(screen.getByRole("button", { name: "Q key" }).className).toContain(
      "Error"
    );
  });

  it("colors a guessed letter in the correct position as a success", () => {
    useRetrievedStore.getState().setRetrieved(true);
    // The full, exactly correct answer for questions[0].
    useGameStateStore.getState().makeGuess(Array.from("JOHANNESBURG"));

    render(<Keyboard onChar={vi.fn()} onDelete={vi.fn()} onEnter={vi.fn()} />);

    expect(screen.getByRole("button", { name: "J key" }).className).toContain(
      "Success"
    );
  });
});
