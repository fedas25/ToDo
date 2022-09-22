let list = []

if (localStorage.length !== 0) list = JSON.parse(localStorage.list);

let formHi = document.querySelector('div[name="high_priority"]');
let inputHi = document.querySelector('div[name="high_priority"] > .input');
let buttonHi = document.querySelector('div[name="high_priority"] > .add');

let formLow = document.querySelector('div[name="low_priority"]');
let inputLow = document.querySelector('div[name="low_priority"] > .input');
let buttonLow = document.querySelector('div[name="low_priority"] > .add');

let renderTask = () => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] !== "") {
            if (list[i].priority === "high") {
                formHi.insertAdjacentHTML('afterend',
                    `<div formid="${list[i].id}" class="form_task ${list[i].status}">
                    <div class="checkbox">
                        <div class="checkbox_circle"></div>
                    </div>
                    <div class="task"> <p> ${list[i].name} </p> </div> 
                    <img name="high" class="close_icon" src="close-icon.svg">
                </div>`);
                linkingDeleteIcon(list[i].id);
                linkingCheckboxTodo(list[i].id);
            } else {
                formLow.insertAdjacentHTML('afterend',
                    `<div formid="${list[i].id}" class="form_task ${list[i].status}">
                    <div class="checkbox">
                        <div class="checkbox_circle"></div>
                    </div>
                    <div class="task">${list[i].name}</div>
                    <img name="low" class="close_icon" src="close-icon.svg">
                </div>`);
                linkingDeleteIcon(list[i].id);
                linkingCheckboxTodo(list[i].id);
            }
        }
    }
}

let clearTask = () => {
    let tasks = document.querySelectorAll('.form_task');
    for (const task of tasks) { 
        task.remove();
    }
};

let displayTask = () => {
    clearTask();
    renderTask();
    
    localStorage.list = JSON.stringify(list);
    
}

function Task (id, name, status, priority) {
    this.id = id; 
    this.name = name; 
    this.status = status; 
    this.priority = priority; 
}

let createTask = (event) => {
    if ((event.keyCode === undefined) || (event.keyCode === 13)) {
        let priority = event.target.parentNode.getAttribute("name").slice(0, 4);
        if ((priority === "high") && (inputHi.value !== "")) {
            list.push( new Task( list.length + 1, inputHi.value, "todo", priority ) );
            inputHi.value = '';
        } else if (inputLow.value !== "") {
            list.push( new Task( list.length + 1, inputLow.value, "todo", priority ) );
            inputLow.value = '';
        }
        displayTask();
    }
}

let linkingDeleteIcon = (idTask) => {
    document.querySelector(`div[formid="${idTask}"`).childNodes[5].addEventListener('click', deleteTask);
}

let deleteTask = (task) => {
    let id_task = task.target.parentNode.getAttribute("formid");
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id_task) list[i] = "";
           
    }
    displayTask();
};

let linkingCheckboxTodo = (idTask) => {
    document.querySelector(`div[formid="${idTask}"`).childNodes[1].addEventListener('click', changePriority);
}

let changePriority = (checkbox) => {
    let task = checkbox.target.parentNode;
    if (task.getAttribute("formid") == null) {
        task = task.parentNode;
    }

    if (task.classList.contains("done")) {
        task.classList.remove("done");
        task.classList.add("todo");
    } else {
        task.classList.remove("todo");
        task.classList.add("done");
    }

    for (let i = 0; i < list.length; i++) {
        if (task.getAttribute("formid") == list[i].id) {
            list[i].status == "todo" ? 
                list[i].status = "done" :
                list[i].status = "todo";
        }
    }
}

inputHi.addEventListener('keydown', createTask);
buttonHi.addEventListener('click', createTask);
inputLow.addEventListener('keydown', createTask);
buttonLow.addEventListener('click', createTask);

displayTask();

setTimeout(() => localStorage.clear(), 864e5);