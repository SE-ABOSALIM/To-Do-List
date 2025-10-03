// main.js
import { registerEventListeners } from "./events.js";
import { getAllTasks } from "./Functions.js";
import { addTaskDom, doneTaskDom } from "./Dom.js";



// LocalStorage'daki görevleri yükle
function loadLocalStorage() {
    const allTasks = getAllTasks();
    allTasks.forEach(task => {
        const domTask = addTaskDom(task);
        if (task.isDone) {
            doneTaskDom(domTask);
        }
    });
}

// Olayları bağla
registerEventListeners();

// Sayfa yüklendiğinde görevleri yükle
window.addEventListener("DOMContentLoaded", () => {
    loadLocalStorage();
});
