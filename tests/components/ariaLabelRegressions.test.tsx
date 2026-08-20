import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import StatsButton from "../../src/components/navbar/stats/StatsButton";
import EditingButton from "../../src/components/question/EditingButton";
import {
  EDIT_BUTTON_ARIA,
  EDIT_BUTTON_TEXT,
  RETURN_FROM_EDIT_BUTTON_ARIA,
  RETURN_FROM_EDIT_BUTTON_TEXT,
  STATS_BUTTON_ARIA,
} from "../../src/constants/strings";
import useDialogStore from "../../src/stores/dialogStore";
import useEditingStore from "../../src/stores/editingStore";

// Two 08-17 review regression pins, bundled into one small file per the
// test-coverage plan rather than two near-empty ones.

describe("StatsButton aria-label regression", () => {
  beforeEach(() => {
    useDialogStore.setState(useDialogStore.getInitialState(), true);
  });

  it("uses STATS_BUTTON_ARIA, not a hardcoded 'help' label copy-pasted from HelpButton", () => {
    render(<StatsButton />);

    expect(
      screen.getByRole("button", { name: STATS_BUTTON_ARIA })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "help" })
    ).not.toBeInTheDocument();
  });
});

describe("EditingButton aria-label regression", () => {
  beforeEach(() => {
    useEditingStore.setState(useEditingStore.getInitialState(), true);
  });

  it("aria-label matches its own visible text while not editing", () => {
    render(<EditingButton />);

    expect(
      screen.getByRole("button", { name: EDIT_BUTTON_ARIA })
    ).toBeInTheDocument();
    expect(screen.getByText(EDIT_BUTTON_TEXT)).toBeInTheDocument();
    // Before the fix, this state showed EDIT_BUTTON_TEXT next to the
    // *return-from-edit* aria-label -- the two disagreed.
    expect(
      screen.queryByRole("button", { name: RETURN_FROM_EDIT_BUTTON_ARIA })
    ).not.toBeInTheDocument();
  });

  it("aria-label matches its own visible text while editing", () => {
    useEditingStore.getState().setEditing(true);

    render(<EditingButton />);

    expect(
      screen.getByRole("button", { name: RETURN_FROM_EDIT_BUTTON_ARIA })
    ).toBeInTheDocument();
    expect(screen.getByText(RETURN_FROM_EDIT_BUTTON_TEXT)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: EDIT_BUTTON_ARIA })
    ).not.toBeInTheDocument();
  });
});
