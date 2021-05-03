/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\"strict mode\";\n\nclass Todo {\n  constructor(title, dueDate = \"No date\") {\n    this.title = title;\n    this.dueDate = dueDate;\n  }\n\n  get todoTitle() {\n    return this.title;\n  }\n\n  get date() {\n    return this.dueDate;\n  }\n\n  set date(newDate) {\n    this.dueDate = newDate;\n  }\n}\n\nclass App {\n  constructor() {\n    this.state = { selectedProject: \"Inbox\"};\n    this.allTodos = {\n      Inbox: [],\n    };\n  }\n\n  get appState() {\n    return this.state;\n  }\n\n  todoByProject = (name) => {\n    return this.allTodos[name];\n  };\n\n  get selectedProject() {\n    return this.state.selectedProject;\n  }\n\n  set selectedProject(projectName) {\n    this.state.selectedProject = projectName;\n  }\n\n  newProject(projectName) {\n    this.allTodos[projectName] = [];\n  }\n\n  get completeTodos() {\n    return this.allTodos;\n  }\n\n  receiveTodo = (todo) => {\n    this.allTodos[this.selectedProject].push(todo);\n  };\n}\n\nconst app = new App();\n\nconst inputTodo = document.querySelector(\".create-todo\");\nconst buttonTodo = document.querySelector(\"#create-button\");\nconst buttonCancelTodo = document.querySelector(\"#cancel-btn-todo\");\n\nconst inputProject = document.querySelector(\".project-name\");\nconst btnCreateProject = document.querySelector(\"#create-project\");\nconst buttonCancelProject = document.querySelector(\"#cancel-btn-project\");\n\nconst showProjects = document.querySelector(\"#list-projects\");\nconst showTodos = document.querySelector(\"#list-todos\");\n\nconst createTodo = (todoValue, project = \"Inbox\") => {\n  if (app.completeTodos.hasOwnProperty(project)) {\n    app.selectedProject = project;\n    app.receiveTodo(new Todo(todoValue));\n  }\n};\n\nconst cleanInput = (input) => {\n  input.value = \"\";\n};\n\nbuttonTodo.addEventListener(\"click\", () => {\n  if (inputTodo.value.length > 0)\n    createTodo(inputTodo.value, app.selectedProject);\n  cleanInput(inputTodo);\n  showTodosList();\n});\n\nbuttonCancelProject.addEventListener(\"click\", () => cleanInput(inputProject));\nbuttonCancelTodo.addEventListener(\"click\", () => cleanInput(inputTodo));\n\nbtnCreateProject.addEventListener(\"click\", () => {\n  if (inputProject.value.length > 0) {\n    app.newProject(inputProject.value);\n  }\n  cleanInput(inputProject);\n  showProjectsList();\n});\n\nconst deleteProjectName = (projectName) => {\n  let idElement = projectName.replace(/\\W/g, \"\");\n  document.getElementById(idElement).outerHTML = \"\";\n  delete app.completeTodos[projectName];\n  selectDefaultProject()\n  // console.log(app.completeTodos);\n  showProjectsList();\n};\n\nconst selectProject = (parentElement) => {\n  parentElement.childNodes.forEach((el) => {\n    el.addEventListener(\"click\", () => {\n      removeActives()\n      el.classList.add(\"active\");\n      app.selectedProject = el.name\n      showTodos.innerHTML=''\n      showTodosList()\n    });\n  });\n};\n\n\nconst removeActives = () => {\n  showProjects.childNodes.forEach((el) => {\n    if(el.classList.contains('active'))el.classList.remove(\"active\");\n  });\n};\n\nconst selectDefaultProject = () => {\n  let inboxDefault = document.getElementById('Inbox')\n  inboxDefault.classList.add('active')\n  console.log(inboxDefault)\n  showTodosList()\n}\n\n\n\nconst showProjectsList = () => {\n  Object.keys(app.completeTodos).forEach((project) => {\n    let projectFixedName = project.replace(/\\W/g, \"\");\n    let listItem = document.createElement(\"button\");\n    listItem.className =\n      \"list-group-item d-flex justify-content-between align-items-center\";\n    if (app.selectedProject === project) {\n      listItem.classList.add(\"active\");\n    }\n    listItem.id = projectFixedName;\n    listItem.name = project\n    listItem.innerText = project;\n    listItem.type = \"button\"\n    let deleteProject = document.createElement(\"button\");\n    deleteProject.classList.add(\"btn\");\n    deleteProject.classList.add(\"btn-danger\");\n    deleteProject.type = \"button\";\n    deleteProject.innerText = \"Delete\";\n    deleteProject.addEventListener(\"click\", () => deleteProjectName(project));\n\n    if (project !== \"Inbox\") listItem.appendChild(deleteProject);\n\n    if (document.querySelector(`#${projectFixedName}`) === null) {\n      showProjects.appendChild(listItem);\n      selectProject(showProjects);\n    }\n  });\n};\n\nconst showTodosList = () => {\n  if(app.allTodos.hasOwnProperty(app.selectedProject) !== false){\n    if (app.allTodos[app.selectedProject].length > 0) {\n      app.allTodos[app.selectedProject].forEach((todo) => {\n        let todoFixedName = todo.todoTitle.replace(/\\W/g, \"\");\n        let listItem = document.createElement(\"li\");\n        listItem.className =\n          \"list-group-item d-flex justify-content-between align-items-center\";\n        listItem.id = todoFixedName;\n        listItem.innerText = todo.todoTitle;\n        let date = document.createElement(\"button\");\n        date.innerText = todo.date;\n        listItem.appendChild(date);\n        if (document.querySelector(`#${todoFixedName}`) === null) {\n          showTodos.appendChild(listItem);\n        }\n      });\n    }\n  }\n};\n\nshowProjectsList();\n\n// console.log(document.querySelector(\"#list-projects\").childNodes);\n\n\n//# sourceURL=webpack://todo-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;