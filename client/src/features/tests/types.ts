export type Test = {
  id: string;
  name: string;
  description: string;
  topicId: string;
  questionIds: string[];
};

export type TestResult = {
  id: string;
  testId: string;
  name: string;
  date: Date;
  answers: Record<string, string>;
};
