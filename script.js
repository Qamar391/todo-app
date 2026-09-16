// Elements ko select karna
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Page load hote hi purani tasks localStorage se load karna
document.addEventListener("DOMContentLoaded", loadTasks);

// Add button pe click
addBtn.addEventListener("click", addTask);

// Enter key dabane pe bhi task add ho
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText, false);
    saveTask(taskText, false);

    taskInput.value = "";
}

function createTaskElement(text, isCompleted) {
    const li = document.createElement("li");
    if (isCompleted) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = text;

    // Task pe click karke complete/incomplete toggle karna
    span.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(text, isCompleted) {
    const tasks = getTasksFromStorage();
    tasks.push({ text: text, completed: isCompleted });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(function (task) {
        createTaskElement(task.text, task.completed);
    });
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(function (li) {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}