import {
    overlay,
    editWindow,
    editTextArea,
} from "./Dom-Elements.js"

let activeTaskId = null;

export function setActiveTaskId(id) {
    activeTaskId = id;
}

export function getActiveTaskId() {
    return activeTaskId;
}

export function openEditTaskUI() {
    overlay.classList.add("show");
    editWindow.classList.add("show");
    editTextArea.focus();
}

export function closeEditTaskUI() {
    overlay.classList.remove("show");
    editWindow.classList.remove("show");
}

export function getAllTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function saveAllTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}