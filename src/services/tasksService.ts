import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { database } from "./firebase";
import type { Task } from "../types/task";

export async function getTasks(uid: string): Promise<Task[]> {
  const tasksQuery = query(
    collection(database, "tasks"),
    where("userId", "==", uid),
  );
  const querySnapshot = await getDocs(tasksQuery);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      title: data.title,
      minutes: data.minutes,
      energy: data.energy,
      note: data.note,
      done: data.done,
    };
  });
}

export async function addTask(task: Omit<Task, "id">): Promise<void> {
  await addDoc(collection(database, "tasks"), task);
}
