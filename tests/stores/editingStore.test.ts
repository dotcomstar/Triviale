import { beforeEach, describe, expect, it } from "vitest";
import useEditingStore from "../../src/stores/editingStore";

describe("editingStore", () => {
  beforeEach(() => {
    useEditingStore.setState(useEditingStore.getInitialState(), true);
  });

  it("defaults editing to false", () => {
    expect(useEditingStore.getState().editing).toBe(false);
  });

  it("setEditing(true) turns editing on", () => {
    useEditingStore.getState().setEditing(true);
    expect(useEditingStore.getState().editing).toBe(true);
  });

  it("setEditing(false) turns editing back off", () => {
    useEditingStore.getState().setEditing(true);
    useEditingStore.getState().setEditing(false);
    expect(useEditingStore.getState().editing).toBe(false);
  });
});
