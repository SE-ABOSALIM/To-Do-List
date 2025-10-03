import {
    getAllTasks,
    saveAllTasks,
    getActiveTaskId
} from "./Functions.js";

export function addTaskLocalStorage(taskObj) {
    let allTasks = getAllTasks();
    allTasks.push(taskObj);
    saveAllTasks(allTasks);
}

export function updateTaskLocalStorage(task) {
    const taskText = task.querySelector(".task-paragraph").textContent;
    const allTasks = getAllTasks();

    const index = allTasks.findIndex((task) => Number(getActiveTaskId()) === task.id);

    if(index > -1) {
        allTasks[index].content = taskText;
        saveAllTasks(allTasks);
    }
}

export function deleteTaskLocalStorage(taskId) {
    const allTasks = getAllTasks();
    
    let taskToDelete = allTasks.findIndex(task => Number(taskId) === task.id);
    
    allTasks.splice(taskToDelete, 1);
    saveAllTasks(allTasks);
}

export function doneTaskLocalStorage(taskId) {
    const allTasks = getAllTasks();

    const index = allTasks.findIndex((task) => Number(taskId) === task.id);

    if(index > -1) {
        allTasks[index].isDone = true;
        saveAllTasks(allTasks);
    }
}