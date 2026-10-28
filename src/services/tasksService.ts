import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "./firebase";
import type { Task } from "../types/task";

export async function getTasks(uid: string): Promise<Task[]> {
  const tasksQuery = query(
    collection(database, "tasks"),
    where("userId", "==", uid),
  );
  const querySnapshot = await getDocs(tasksQuery);
  return querySnapshot.docs.map((taskDoc) => {
    const data = taskDoc.data();
    return {
      id: taskDoc.id,
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

export async function updateTask(id: string, done: boolean): Promise<void> {
  const taskRef = doc(database, "tasks", id);
  await updateDoc(taskRef, { done });
}
