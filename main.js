let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//Empty Array To Store Te Tasks
let arrayOfTasks = [];

// Check There Is Tasks In Local Storage
if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

//Get Trigger Data From Local Storage
getDataFromLocalStorage();

//Add Task
submit.onclick = function () {
  if (input.value != "") {
    addTaskToArray(input.value); //Add Task To Array To Tasks
    input.value = ""; //Empty Input Field
  }
};

//Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    //Remove Element From Page
    e.target.parentElement.remove();
    //Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  //Task Element
  if (e.target.classList.contains("task")) {
    //Task Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));

    //Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  //Push Task To Array
  arrayOfTasks.push(task);

  //Add Task To Page
  addElementsToPageFrom(arrayOfTasks);

  //Add Task To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  //Empty Tasks Div
  tasksDiv.innerHTML = "";
  //Looping On Array Of Task
  arrayOfTasks.forEach((task) => {
    //Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    //Check If Task Is Done
    if (task.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Contaier
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : arrayOfTasks[i].completed == false;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
