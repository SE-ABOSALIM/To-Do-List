import {
    setActiveTaskId,
    openEditTaskUI
} from "./Functions.js";

import {
    taskInput,
    tasksContainer,
    editTextArea,
} from "./Dom-Elements.js"

const CLASSNAMES = {
    content: "task-content",
    paragraph: "task-paragraph",
    btn: "btns",
    delete: "delete-task-btn",
    edit: "edit-task-btn",
    done: "done-task-btn"
};

export function addTaskDom(taskObj) {
    const taskContent = document.createElement("div");
    const taskParagraph = document.createElement("p");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    
    taskContent.className = CLASSNAMES.content;
    taskContent.dataset.taskId = taskObj.id;

    taskParagraph.className = CLASSNAMES.paragraph;
    taskParagraph.textContent = taskObj.content;
    
    deleteBtn.classList.add(CLASSNAMES.btn, CLASSNAMES.delete);
    deleteBtn.append("Delete");

    editBtn.classList.add(CLASSNAMES.btn, CLASSNAMES.edit);
    editBtn.append("Edit");

    doneBtn.classList.add(CLASSNAMES.btn, CLASSNAMES.done);
    doneBtn.append("Done");
    
    taskContent.appendChild(taskParagraph);
    taskContent.appendChild(editBtn);
    taskContent.appendChild(deleteBtn);
    taskContent.appendChild(doneBtn);
    tasksContainer.appendChild(taskContent);

    return taskContent;
}

export function updateTaskDom(task) {
    const taskText = task.querySelector(".task-paragraph").textContent;
    
    openEditTaskUI();
    editTextArea.focus();
    editTextArea.value = taskText;

    setActiveTaskId(task.dataset.taskId);
}

export function deleteTaskDom(task) {
    task.remove();
}

export function doneTaskDom(task) {
    const taskText = task.querySelector(".task-paragraph");
    const taskDoneBtn = task.querySelector(".done-task-btn");
    const taskEditBtn = task.querySelector(".edit-task-btn");

    taskText.style.textDecoration = "line-through";
    taskText.style.opacity = "0.4";
    taskDoneBtn.style.display = "none";
    taskEditBtn.style.display = "none";
}