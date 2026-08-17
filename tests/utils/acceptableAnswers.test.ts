import { describe, expect, it } from "vitest";
import { getAcceptableAnswers } from "../../src/utils/acceptableAnswers";

describe("getAcceptableAnswers", () => {
  it("includes the answer and altAnswers, normalized", () => {
    const result = getAcceptableAnswers(
      { answer: "Picasso", altAnswer: ["Pablo Picasso"] },
      "PICASSO"
    );
    expect(result).toContain("PICASSO");
    expect(result).toContain("PABLOPICASSO");
  });

  it("accepts an addOn glued as a prefix, not just a suffix", () => {
    // e.g. answer: "Picasso", addOns: ["Pablo"] -> "PabloPicasso" should be
    // accepted even though it's not answer+addOn.
    const result = getAcceptableAnswers(
      { answer: "Picasso", addOns: ["Pablo"] },
      "PICASSO"
    );
    expect(result).toContain("PABLOPICASSO");
    expect(result).toContain("PICASSOPABLO");
  });

  it("returns an empty-addOns question as just the answer, uppercased with no spaces", () => {
    const result = getAcceptableAnswers({ answer: "New York" }, "NEWYORK");
    expect(result).toEqual(["NEWYORK"]);
  });
});
