import { get, post, remove, update } from ".";

export async function getTasks() {
  return await get("/api/tasks");
}

export async function getTasksById(id) {
  return await get(`/api/tasks/${id}`);
}

export async function createTasks(data) {
  return await post("/api/tasks", data);
}

export async function updateTasks(id, data) {
  return await update(`/api/tasks/${id}`, data);
}

export async function deleteTasks(id) {
  return await remove(`/api/tasks/${id}`);
}
