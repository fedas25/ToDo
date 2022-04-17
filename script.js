const list = {
    list: [{
        id: 1,
        name: "сделать to Do",
        status: "todo",
        priority: 'low'
    },
    {
        id: 2,
        name: "потупить",
        status: "todo",
        priority: 'hight'
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


// let renderTask = () => { };  отображает все задачи из list в dom
// беря во внимание приоритет и "сделанность" задачи

let performTask = () => { }; // изменит статус выполнения задачи в list   + displayTask
// cделать отображение сделанных задач из list
let renderTask = () => {
    for (let i = 0; i < list.list.length; i++) {
        if (list.list[i].priority === "hight") {
            formHi.insertAdjacentHTML('afterend',
                `<div class="form_task">
              <div><input type="checkbox"></div>
              <div class="task">${list.list[i].name}</div>
              <img name="hight" class="close_icon" src="close-icon.svg">
            </div>`);
            linkingDeleteIcon("hight");
        } else {
            formLow.insertAdjacentHTML('afterend',
                `<div class="form_task">
              <div><input type="checkbox"></div>
              <div class="task">${list.list[i].name}</div>
              <img name="low" class="close_icon" src="close-icon.svg">
            </div>`);
            linkingDeleteIcon("low");
        }
    }
}

let clearTask = () => {   // очищает все задачи из doom, а не list
    let tasks = document.querySelectorAll('.form_task');
    for (const task of tasks) {
        task.remove();
    }
};

let displayTask = () => { // выводит актуальные задачи из list
    clearTask();
    renderTask();
}

let createTask = (priority) => {
    if ((priority === "hight") || (priority.currentTarget.id === "hight")) {
        list.list.push(
            {
                id: list.list.length + 1,
                name: inputHi.value,
                status: "todo",
                priority: "hight"
            }
        )
        inputHi.value = '';
    } else {
        list.list.push(
            {
                id: list.list.length + 1,
                name: inputLow.value,
                status: "todo",
                priority: "low"
            }
        )
        inputLow.value = '';
    }
    displayTask();
}

linkingDeleteIcon = (priority) => {
    addListenerClick((priority === "hight") ? delIconHi = document.querySelectorAll('img[name="hight"]') : delIconLow = document.querySelectorAll('img[name="low"]'));
}

let addListenerClick = (delIcons) => {
    for (const delIcon of delIcons) {
        if (delIcon.getAttribute('listener') !== 'true') {
            // delIcon.task.target = ""; // небогоугодно
            delIcon.addEventListener('click', deliteTask);
            delIcon.setAttribute('listener', 'true');
            delIcon.classList.add("losos"); // что - то придумать
        }
    }
}

let deliteTask = () => {

};  // удаляет задачу из list     + displayTask

let formHi = document.querySelector('div[name="high_priority"]');
let inputHi = document.querySelector('div[name="high_priority"] > .input');
let buttonHi = document.querySelector('div[name="high_priority"] > .add');
let delIconHi = undefined; // невозможно привязать, нет в dom

let formLow = document.querySelector('div[name="low_priority"]');
let inputLow = document.querySelector('div[name="low_priority"] > .input');
let buttonLow = document.querySelector('div[name="low_priority"] > .add');
let delIconLow = undefined; // невозможно привязать, нет в dom


inputHi.addEventListener('keydown', function (key) { if (key.keyCode === 13) { createTask("hight") } }); // чуть изменить для объектов
buttonHi.addEventListener('click', createTask);

inputLow.addEventListener('keydown', function (key) { if (key.keyCode === 13) { createTask("low"); } }); // чуть изменить для объектов
buttonLow.addEventListener('click', createTask);



// displayTask();