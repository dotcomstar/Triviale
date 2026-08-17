import { beforeEach, describe, expect, it } from "vitest";
import useCustomQuestionsStore, {
  defaultQuestions,
} from "../../src/stores/customQuestionsStore";
import { Question } from "../../src/data/questions";

const sampleQuestion: Question = {
  question: "Sample question?",
  answer: "Answer",
  category: "ANY",
  altAnswer: [],
};

describe("customQuestionsStore", () => {
  beforeEach(() => {
    useCustomQuestionsStore.setState(
      useCustomQuestionsStore.getInitialState(),
      true
    );
  });

  it("removeQuestion removes only the targeted question, keeping the rest", () => {
    useCustomQuestionsStore.getState().addQuestion(sampleQuestion);
    const before = useCustomQuestionsStore.getState().customQuestions;
    expect(before).toHaveLength(defaultQuestions.length + 1);

    useCustomQuestionsStore.getState().removeQuestion(0);

    const after = useCustomQuestionsStore.getState().customQuestions;
    expect(after).toHaveLength(before.length - 1);
    // The removed slot (index 0) is gone; every other original question
    // (including the one just added) survives.
    expect(after).toEqual(before.slice(1));
  });

  it("setQuestion replaces only the targeted index", () => {
    useCustomQuestionsStore.getState().setQuestion(sampleQuestion, 1);
    const { customQuestions } = useCustomQuestionsStore.getState();
    expect(customQuestions[1]).toEqual(sampleQuestion);
    expect(customQuestions[0]).toEqual(defaultQuestions[0]);
  });
});
