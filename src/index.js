"strict mode";

class Todo {
  constructor(title, dueDate = "No date") {
    this.title = title;
    this.dueDate = dueDate;
  }

  get todoTitle() {
    return this.title;
  }

  get date() {
    return this.dueDate;
  }

  set date(newDate) {
    this.dueDate = newDate;
  }
}

class App {
  constructor() {
    this.state = { selectedProject: "Inbox"};
    this.allTodos = {
      Inbox: [],
    };
  }

  get appState() {
    return this.state;
  }

  todoByProject = (name) => {
    return this.allTodos[name];
  };

  get selectedProject() {
    return this.state.selectedProject;
  }

  set selectedProject(projectName) {
    this.state.selectedProject = projectName;
  }

  newProject(projectName) {
    this.allTodos[projectName] = [];
  }

  get completeTodos() {
    return this.allTodos;
  }

  receiveTodo = (todo) => {
    this.allTodos[this.selectedProject].push(todo);
  };
}

const app = new App();

const inputTodo = document.querySelector(".create-todo");
const buttonTodo = document.querySelector("#create-button");
const buttonCancelTodo = document.querySelector("#cancel-btn-todo");

const inputProject = document.querySelector(".project-name");
const btnCreateProject = document.querySelector("#create-project");
const buttonCancelProject = document.querySelector("#cancel-btn-project");

const showProjects = document.querySelector("#list-projects");
const showTodos = document.querySelector("#list-todos");

const createTodo = (todoValue, project = "Inbox") => {
  if (app.completeTodos.hasOwnProperty(project)) {
    app.selectedProject = project;
    app.receiveTodo(new Todo(todoValue));
  }
};

const cleanInput = (input) => {
  input.value = "";
};

buttonTodo.addEventListener("click", () => {
  if (inputTodo.value.length > 0)
    createTodo(inputTodo.value, app.selectedProject);
  cleanInput(inputTodo);
  showTodosList();
});

buttonCancelProject.addEventListener("click", () => cleanInput(inputProject));
buttonCancelTodo.addEventListener("click", () => cleanInput(inputTodo));

btnCreateProject.addEventListener("click", () => {
  if (inputProject.value.length > 0) {
    app.newProject(inputProject.value);
  }
  cleanInput(inputProject);
  showProjectsList();
});

const deleteProjectName = (projectName) => {
  let idElement = projectName.replace(/\W/g, "");
  document.getElementById(idElement).outerHTML = "";
  delete app.completeTodos[projectName];
  selectDefaultProject()
  // console.log(app.completeTodos);
  showProjectsList();
};

const selectProject = (parentElement) => {
  parentElement.childNodes.forEach((el) => {
    el.addEventListener("click", () => {
      removeActives()
      el.classList.add("active");
      app.selectedProject = el.name
      showTodos.innerHTML=''
      showTodosList()
    });
  });
};


const removeActives = () => {
  showProjects.childNodes.forEach((el) => {
    if(el.classList.contains('active'))el.classList.remove("active");
  });
};

const selectDefaultProject = () => {
  let inboxDefault = document.getElementById('Inbox')
  inboxDefault.classList.add('active')
  console.log(inboxDefault)
  showTodosList()
}



const showProjectsList = () => {
  Object.keys(app.completeTodos).forEach((project) => {
    let projectFixedName = project.replace(/\W/g, "");
    let listItem = document.createElement("button");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    if (app.selectedProject === project) {
      listItem.classList.add("active");
    }
    listItem.id = projectFixedName;
    listItem.name = project
    listItem.innerText = project;
    listItem.type = "button"
    let deleteProject = document.createElement("button");
    deleteProject.classList.add("btn");
    deleteProject.classList.add("btn-danger");
    deleteProject.type = "button";
    deleteProject.innerText = "Delete";
    deleteProject.addEventListener("click", () => deleteProjectName(project));

    if (project !== "Inbox") listItem.appendChild(deleteProject);

    if (document.querySelector(`#${projectFixedName}`) === null) {
      showProjects.appendChild(listItem);
      selectProject(showProjects);
    }
  });
};

const showTodosList = () => {
  if(app.allTodos.hasOwnProperty(app.selectedProject) !== false){
    if (app.allTodos[app.selectedProject].length > 0) {
      app.allTodos[app.selectedProject].forEach((todo) => {
        let todoFixedName = todo.todoTitle.replace(/\W/g, "");
        let listItem = document.createElement("li");
        listItem.className =
          "list-group-item d-flex justify-content-between align-items-center";
        listItem.id = todoFixedName;
        listItem.innerText = todo.todoTitle;
        let date = document.createElement("button");
        date.innerText = todo.date;
        listItem.appendChild(date);
        if (document.querySelector(`#${todoFixedName}`) === null) {
          showTodos.appendChild(listItem);
        }
      });
    }
  }
};

showProjectsList();

// console.log(document.querySelector("#list-projects").childNodes);
