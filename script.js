let list = [] // with object {id, name, status //done todo, priority //low high}

if (localStorage.length !== 0) list = JSON.parse(localStorage.list);

let formHi = document.querySelector('div[name="high_priority"]');
let inputHi = document.querySelector('div[name="high_priority"] > .input');
let buttonHi = document.querySelector('div[name="high_priority"] > .add');

let formLow = document.querySelector('div[name="low_priority"]');
let inputLow = document.querySelector('div[name="low_priority"] > .input');
let buttonLow = document.querySelector('div[name="low_priority"] > .add');

let renderTask = () => {              //  arr.forEach
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

let clearTask = () => {   // clears tasks from doom                   +_+
    let tasks = document.querySelectorAll('.form_task');
    for (const task of tasks) { 
        task.remove();
    }
};

let displayTask = () => { // displays current tasks from the list      +_+
    clearTask();
    renderTask();
    
    localStorage.list = JSON.stringify(list);
    
}

let createTask = (event) => {   //  from list                              +_+
    if ((event.keyCode === undefined) || (event.keyCode === 13)) {
        let priority = event.target.parentNode.getAttribute("name").slice(0, 4);
        if ((priority === "high") && (inputHi.value !== "")) {
            list.push(
                {
                    id: list.length + 1,
                    name: inputHi.value,
                    status: "todo",
                    priority: priority
                }
            )
            inputHi.value = '';
        } else if (inputLow.value !== "") {
            list.push(
                {
                    id: list.length + 1,
                    name: inputLow.value,
                    status: "todo",
                    priority: priority.slice(0, 3)
                }
            )
            inputLow.value = '';
        }
        displayTask();
    }
}

let linkingDeleteIcon = (idTask) => {
    document.querySelector(`div[formid="${idTask}"`).childNodes[5].addEventListener('click', deleteTask);
}

let deleteTask = (task) => { // from list                                                                      +_+
    let id_task = task.target.parentNode.getAttribute("formid");
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id_task) list[i] = "";
           
    }
    displayTask();
};

let linkingCheckboxTodo = (idTask) => {           //                                                            +_+
    document.querySelector(`div[formid="${idTask}"`).childNodes[1].addEventListener('click', changePriority);
}

let changePriority = (checkbox) => { // добавить обработку виполненности с помощью шарика через id задания     +_+
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