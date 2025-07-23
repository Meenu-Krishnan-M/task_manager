import { commonApi } from "./commonApi";
import serverUrl from "./serverUrl";

// GET 
export const getAllTasks = async () => {
  return await commonApi("GET", `${serverUrl}/all-task`);
};

// ADD 
export const addTask = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/add-task`, reqBody);
};

// DELETE
export const deleteTask = async (id) => {
  return await commonApi("DELETE", `${serverUrl}/remove-task/${id}`);
};


// UPDATE 
export const updateTask = async (id, reqBody) => {
  return await commonApi("PUT", `${serverUrl}/${id}`, reqBody);
};

//TOGGLE
export const toggleTaskStatus = async (id, completed) => {
  return await commonApi("PATCH", `${serverUrl}/${id}/complete`, { completed });
};
