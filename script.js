const list = {
    list: [], // with object {id, name, status //done todo, priority //low high}
    counttask: 0
}

let renderTask = () => {         //  +_+
    for (let i = 0; i < list.list.length; i++) {
        if (list.list[i] !== "") {
            if (list.list[i].priority === "high") {
                formHi.insertAdjacentHTML('afterend',
                    `<div formid="${list.list[i].id}" class="form_task ${list.list[i].status}">
                    <div class="checkbox">
                        <div class="checkbox_circle"></div>
                    </div>
                    <div class="task">${list.list[i].name}</div>
                    <img name="high" class="close_icon" src="close-icon.svg">
                </div>`);
                linkingDeleteIcon("high", list.list[i].id);

///////////////////////


                linkingCheckboxTodo(list.list[i].id);


///////////////////////////////

            } else {
                formLow.insertAdjacentHTML('afterend',
                    `<div class="form_task ${list.list[i].status}">
                    <div class="checkbox">
                        <div class="checkbox_circle"></div>
                    </div>
                    <div class="task">${list.list[i].name}</div>
                    <img name="low" class="close_icon" src="close-icon.svg">
                </div>`);
                linkingDeleteIcon("low", list.list[i].id);
                // linkingCheckboxTodo(list.list[i].id);
            }
        }
    }
}

let clearTask = () => {   // clears tasks from doom                +_+
    let tasks = document.querySelectorAll('.form_task');
    for (const task of tasks) {
        task.remove();
    }
};

let displayTask = () => { // displays current tasks from the list  +_+
    clearTask();
    renderTask();
}

let createTask = (event) => {   //                                 +_+
    if ((event.keyCode === undefined) || (event.keyCode === 13)) {
        let priority = event.target.parentNode.getAttribute("name").slice(0, 4);
        if (priority === "high") {
            list.list.push(
                {
                    id: list.list.length + 1,
                    name: inputHi.value,
                    status: "todo",
                    priority: priority
                }
            )
            inputHi.value = '';
        } else {
            list.list.push(
                {
                    id: list.list.length + 1,
                    name: inputLow.value,
                    status: "todo",
                    priority: priority.slice(0, 3)
                }
            )
            inputLow.value = '';
        }
    }
    displayTask();
}

let linkingDeleteIcon = (priority, idTask) => {
    addListenerClickDeleteIcon((priority === "high") ? delIconHi = document.querySelectorAll('img[name="high"]') : delIconLow = document.querySelectorAll('img[name="low"]'), idTask);
}

let addListenerClickDeleteIcon = (delIcons, idTask) => {
    for (let delIcon of delIcons) {
        if (delIcon.getAttribute('listener') !== 'true') {
            delIcon.addEventListener('click', deleteTask);
            delIcon.setAttribute('listener', 'true');
            delIcon.setAttribute('id_task', idTask);
        }
    }
}









let linkingCheckboxTodo = (idTask) => {
    // debugger
    document.querySelector(`div[formid="${idTask}"`).childNodes[1].addEventListener('click', changePriority);

    // addListenerClickCheckboxTodo(checkboxTodo = document.querySelector(`div[formid="${idTask}"`), idTask);
}

let addListenerClickCheckboxTodo = (checkboxesTodo, idTask) => {
    for (let checkboxTodo of checkboxesTodo) {
        if (checkboxTodo.getAttribute('listener') !== 'true') {
            checkboxTodo.addEventListener('click', changePriority);
            checkboxTodo.setAttribute('listener', 'true');
            checkboxTodo.setAttribute('id_task', idTask);
        }
    }
}

let changePriority = (checkbox) => { // добавить обработку виполненности с помощью шарика 
                                    //  через id задания
    if (checkbox.target.parentNode.parentNode.classList.contains("done")) {
        checkbox.target.parentNode.parentNode.classList.remove("done");
    } else {
        checkbox.target.parentNode.parentNode.classList.add("done");
    }



    for (let i = 0; i < list.list.length; i++) {
        if (checkbox.target.getAttribute("id_task") == list.list[i].id) {
            if (list.list[i].status == "todo") {
                list.list[i].status = "done";
            } else {
                list.list[i].status = "todo";
            }
        }
    }
}













let deleteTask = (task) => { // from list
    let id_task = task.target.getAttribute("id_task")
    for (let i = 0; i < list.list.length; i++) {
        if (list.list[i].id == id_task) {
            list.list[i] = "";
        }
    }
    displayTask();
};

let formHi = document.querySelector('div[name="high_priority"]');
let inputHi = document.querySelector('div[name="high_priority"] > .input');
let buttonHi = document.querySelector('div[name="high_priority"] > .add');
let delIconHi = undefined; // not in dom

let checkboxTodo = undefined; // not in dom

let formLow = document.querySelector('div[name="low_priority"]');
let inputLow = document.querySelector('div[name="low_priority"] > .input');
let buttonLow = document.querySelector('div[name="low_priority"] > .add');
let delIconLow = undefined; // not in dom

inputHi.addEventListener('keydown', createTask);
buttonHi.addEventListener('click', createTask);
inputLow.addEventListener('keydown', createTask);
buttonLow.addEventListener('click', createTask);

displayTask();