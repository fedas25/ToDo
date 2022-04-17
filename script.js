const list = {
    list: [{
        id: 1,
        name: "сделать to Do",
        status: "todo",
        priority: 'low'
    }], // задачи task  id, name, status, priority        {

    changeStatus: (task, status) => { //меняет cтатус по названию task
        let index = list.list.findIndex(fun = (elem) => {
            return (elem.name == task) ? true : false;
        })
        if (index !== -1) {
            list.list[index].status = status;
        }
    },

    changePriority: (task, priority) => { // меняет приоритет по названию task
        let index = list.list.findIndex(fun = (elem) => {
            return (elem.name == task) ? true : false;
        })
        if (index !== -1) {
            list.list[index].priority = priority;
        }
    },

    addTask: (task) => { // создаёт задачу task - задача
        list.list.push(
            {
                id: list.list.length + 1,
                name: task,
                status: "todo",
                priority: 'low'
            }
        )
    },

    deleteTask: (task) => {
        let index = list.list.findIndex(fun = (elem) => {
            return ((elem !== undefined) && (elem.name == task)) ? true : false;
        })
        delete list.list[index]
    },

    showList: () => {
        let show = (word) => {
            let task = "";
            for (const key of list.list) {
                if (word == key.status) {
                    task = task + " \"" + key.name + "\",\n"
                }
            }
            task = task.substring(0, task.length - 2);
            console.log(task ? word + ":\n" + task : word + ":\n" + "-");
        }
        show("todo");
        show("In Progress");
        show("Done");
    }
}

let clearTask = () => { };  // очищает все задачи из toDo именно doom, а не list
// let renderTask = () => { };  отображает все задачи из list в dom
// беря во внимание приоритет и "сделанность" задачи
let displayTask = () => { } // list clearTask + renderTask

let addTask = () => { };     // добавляет новую задачу в list             + displayTask
let deliteTask = () => { };  // удаляет задачу из list                    + displayTask
let performTask = () => { }; // изменит статус выполнения задачи в list   + displayTask

let renderTask = () => {
    for (let i = 0; i < list.list.length; i++) {
        list.list[i]
        
    }
        
    
    if ((priority === "hight") || (priority.currentTarget.id === "hight")) {
        formHi.insertAdjacentHTML('afterend',
        `<div class="form_task">
          <div><input type="checkbox"></div>
          <div class="task">${inputHi.value}</div>
          <img class="close_icon" src="close-icon.svg">
        </div>`);
    inputHi.value = '';
    } else {
        formLow.insertAdjacentHTML('afterend',
        `<div class="form_task">
          <div><input type="checkbox"></div>
          <div class="task">${inputLow.value}</div>
          <img class="close_icon" src="close-icon.svg">
        </div>`);
        inputLow.value = '';
    }
}  


let createTask = (priority) => {
    if ((priority === "hight") || (priority.currentTarget.id === "hight")) {
        formHi.insertAdjacentHTML('afterend',
        `<div class="form_task">
          <div><input type="checkbox"></div>
          <div class="task">${inputHi.value}</div>
          <img class="close_icon" src="close-icon.svg">
        </div>`);
    inputHi.value = '';
    } else {
        formLow.insertAdjacentHTML('afterend',
        `<div class="form_task">
          <div><input type="checkbox"></div>
          <div class="task">${inputLow.value}</div>
          <img class="close_icon" src="close-icon.svg">
        </div>`);
        inputLow.value = '';
    }
}



let formHi = document.querySelector('div[name="high_priority"]');
let inputHi = document.querySelector('div[name="high_priority"] > .input');
let buttonHi = document.querySelector('div[name="high_priority"] > .add');

let formLow = document.querySelector('div[name="low_priority"]');
let inputLow = document.querySelector('div[name="low_priority"] > .input');
let buttonLow = document.querySelector('div[name="low_priority"] > .add');

inputHi.addEventListener('keydown', function (key) { if (key.keyCode === 13) { createTask("hight") } });
buttonHi.addEventListener('click', createTask);

inputLow.addEventListener('keydown', function (key) { if (key.keyCode === 13) { createTask("low"); } });
buttonLow.addEventListener('click', createTask);