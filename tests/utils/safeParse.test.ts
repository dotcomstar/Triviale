import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { safeParse } from "../../src/utils/safeParse";

describe("safeParse", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("returns the fallback when the key is missing", () => {
    expect(safeParse("missingKey", { a: 1 })).toEqual({ a: 1 });
  });

  it("returns the fallback when the stored value is an empty string", () => {
    localStorage.setItem("emptyKey", "");
    expect(safeParse("emptyKey", { a: 1 })).toEqual({ a: 1 });
  });

  it("returns the parsed value when the stored value is valid JSON", () => {
    localStorage.setItem("validKey", JSON.stringify({ b: 2 }));
    expect(safeParse("validKey", { a: 1 })).toEqual({ b: 2 });
  });

  it("returns the fallback and does not throw when the stored value is malformed JSON", () => {
    localStorage.setItem("malformedKey", "{not valid json");
    expect(() => safeParse("malformedKey", { a: 1 })).not.toThrow();
    expect(safeParse("malformedKey", { a: 1 })).toEqual({ a: 1 });
  });
});
