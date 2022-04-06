const list = {
    list : [],
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

list.addTask("1fe e eed");
list.addTask("2fed e e");
list.addTask("3fddd dd");
list.showList();