export type Task = {
  id: string;
  userId: string;
  title: string;
  minutes: 5 | 15 | 30;
  energy: "low" | "medium" | "high";
  note: string;
  done: boolean;
};
