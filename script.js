// HTML ELEMENTS
const addBtn = document.querySelector(".add-task-btn");
const taskInput = document.querySelector(".add-task-input");
const tasksContainer = document.querySelector(".tasks-container");
const searchBarInput = document.querySelector(".user-search-input");

const overlay = document.querySelector(".overlay");
const editWindow = document.querySelector(".edit-window");
const editTextArea = document.querySelector(".edit-window-text-area");
const confirmBtn = document.querySelector(".confirm-btn");
const cancelBtn = document.querySelector(".cancel-btn");

let activeTaskId = null;

// CREATE TASK OBJECT
function createTask(text) {
    return {
        id: Date.now(),
        content: text,
        isDone: false
    }
}


// DOM FUNCTIONS
function addTaskDom(taskObj) {
    const taskContent = document.createElement("div");
    const taskParagraph = document.createElement("p");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    
    taskContent.className = "task-content";
    taskContent.dataset.taskId = taskObj.id;

    taskParagraph.className = "task-paragraph";
    taskParagraph.textContent = taskObj.content;
    
    deleteBtn.classList.add("btns", "delete-task-btn");
    deleteBtn.append("Delete");

    editBtn.classList.add("btns", "edit-task-btn");
    editBtn.append("Edit");

    doneBtn.classList.add("btns", "done-task-btn");
    doneBtn.append("Done");
    
    taskContent.appendChild(taskParagraph);
    taskContent.appendChild(editBtn);
    taskContent.appendChild(deleteBtn);
    taskContent.appendChild(doneBtn);
    tasksContainer.appendChild(taskContent);
    taskInput.value = "";
    taskInput.focus();

    return taskContent;
}

function updateTaskDom(task) {
    const taskText = task.querySelector(".task-paragraph").textContent;
    
    openEditTaskUI();
    editTextArea.focus();
    editTextArea.value = taskText;

    activeTaskId = task.dataset.taskId;
}

function deleteTaskDom(task) {
    task.remove();
}

function doneTaskDom(task) {
    const taskText = task.querySelector(".task-paragraph");
    const taskDoneBtn = task.querySelector(".done-task-btn");
    const taskEditBtn = task.querySelector(".edit-task-btn");

    taskText.style.textDecoration = "line-through";
    taskText.style.opacity = "0.4";
    taskDoneBtn.style.display = "none";
    taskEditBtn.style.display = "none";
}



// LOCAL STORAGE FUNCTIONS
function addTaskLocalStorage(taskObj) {
    let allTasks = getAllTasks();
    allTasks.push(taskObj);
    saveAllTasks(allTasks);
}

function updateTaskLocalStorage(task) {
    const taskText = task.querySelector(".task-paragraph").textContent;
    const allTasks = getAllTasks();

    const index = allTasks.findIndex((task) => Number(activeTaskId) === task.id);

    if(index > -1) {
        allTasks[index].content = taskText;
        saveAllTasks(allTasks);
    }
}

function deleteTaskLocalStorage(taskId) {
    const allTasks = getAllTasks();
    
    let taskToDelete = allTasks.findIndex((task, index) => {
        if(Number(taskId) === task.id) {
            return index;
        }
    });
    
    allTasks.splice(taskToDelete, 1);
    saveAllTasks(allTasks);
}

function doneTaskLocalStorage(taskId) {
    const allTasks = getAllTasks();

    const index = allTasks.findIndex((task) => Number(taskId) === task.id);

    if(index > -1) {
        allTasks[index].isDone = true;
        saveAllTasks(allTasks);
    }
}

function loadLocalStorage() {
    const allTasks = getAllTasks();

    allTasks.forEach((task) => {
        const domTask = addTaskDom(task);
        if (task.isDone) {
            doneTaskDom(domTask);
        }
    });
}


// REPEATEDLY USED FUNCTIONS
function openEditTaskUI() {
    overlay.classList.add("show");
    editWindow.classList.add("show");
    editTextArea.focus();
}

function closeEditTaskUI() {
    overlay.classList.remove("show");
    editWindow.classList.remove("show");
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
    } else {
        alert("Please enter a task!");
    }
}

function getAllTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveAllTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



// EVENT LISTENERS 
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
    if(!activeTaskId) return;
 
    const task = document.querySelector(`[data-task-id="${activeTaskId}"]`);
    task.querySelector(".task-paragraph").textContent = editTextArea.value;
    
    closeEditTaskUI();
    updateTaskLocalStorage(task);
    activeTaskId = null;
});

cancelBtn.addEventListener("click", () => {
    closeEditTaskUI();
    activeTaskId = null;
});

let searchInput, tasksList, taskParagraphText;
searchBarInput.addEventListener("input", () => {
    tasksList = document.querySelectorAll(".task-content");
    searchInput = searchBarInput.value.toLowerCase();

    tasksList.forEach(task => {
        taskParagraphText = task.firstChild.innerText.toLowerCase();
        task.style.display = taskParagraphText.includes(searchInput) ? "block" : "none";
    });
});


// LOAD THE LOCAL STORAGE WHEN PAGE HAS OPENED
loadLocalStorage();