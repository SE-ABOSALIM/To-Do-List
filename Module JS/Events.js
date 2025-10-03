import {
    addTaskDom,
    updateTaskDom,
    deleteTaskDom,
    doneTaskDom
} from "./Dom.js"

import {
    addTaskLocalStorage,
    updateTaskLocalStorage,
    deleteTaskLocalStorage,
    doneTaskLocalStorage
} from "./Local-Storage.js"

import { 
    setActiveTaskId,
    getActiveTaskId,
    closeEditTaskUI
} from "./Functions.js";

import {
    addBtn,
    taskInput,
    tasksContainer,
    searchBarInput,
    editTextArea,
    confirmBtn,
    cancelBtn
} from "./Dom-Elements.js"

export function registerEventListeners() {
    function createTask(text) {
        return {
            id: Date.now(),
            content: text,
            isDone: false
        }
    }

    function handleAddTask() {
        let domTasks = document.querySelectorAll(".task-paragraph");
        let arr = [];
        domTasks.forEach((task) => {
            arr.push(task.innerText);
        });

        const duplicateTask = arr.find((task) => {
            return taskInput.value === task;
        });

        if(duplicateTask) {
            alert("The entered task is already added!");
            return;
        }

        if(taskInput.value.trim()) {
            const taskObj = createTask(taskInput.value);
            addTaskDom(taskObj);
            addTaskLocalStorage(taskObj);
            taskInput.value = "";
            taskInput.focus();
        } else {
            alert("Please enter a task!");
        }
    }

    addBtn.addEventListener("click", handleAddTask);
    taskInput.addEventListener("keydown", event => {
        if(event.key === "Enter") {
            handleAddTask();
        }  
    });

    tasksContainer.addEventListener("click", event => {
        const clicked = event.target;
        const taskElement = clicked.closest(".task-content");
        const taskId = taskElement?.dataset.taskId;

        if(!taskId) return;

        if(clicked.classList.contains("delete-task-btn")) {
            deleteTaskDom(taskElement);
            deleteTaskLocalStorage(taskId);
        }

        if(clicked.classList.contains("edit-task-btn")) {
            updateTaskDom(taskElement);
        }

        if(clicked.classList.contains("done-task-btn")) {
            doneTaskDom(taskElement);
            doneTaskLocalStorage(taskId);
        }
    });

    confirmBtn.addEventListener("click", () => {
        if(!getActiveTaskId()) return;
    
        const task = document.querySelector(`[data-task-id="${getActiveTaskId()}"]`);
        task.querySelector(".task-paragraph").textContent = editTextArea.value;
        
        closeEditTaskUI();
        updateTaskLocalStorage(task);
        setActiveTaskId(null);
    });

    cancelBtn.addEventListener("click", () => {
        closeEditTaskUI();
        setActiveTaskId(null);
    });

    let searchInput, tasksList, taskParagraphText;
    searchBarInput.addEventListener("input", () => {
        tasksList = document.querySelectorAll(".task-content");
        searchInput = searchBarInput.value.toLowerCase();

        tasksList.forEach(task => {
            taskParagraphText = task.querySelector(".task-paragraph").innerText.toLowerCase();
            task.style.display = taskParagraphText.includes(searchInput) ? "block" : "none";
        });
    });
}

