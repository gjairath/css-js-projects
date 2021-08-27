/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Todo.js":
/*!*********************!*\
  !*** ./src/Todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Todo {\r\n  constructor(title, status) {\r\n    \r\n    this.title = title;\r\n    this.status = status; // 0 prog, 1 back, 2 done\r\n  }\r\n  \r\n     get_name() {return this.name;}\r\n     \r\n     \r\n        \r\n   get_status() {\r\n   \r\n       if (status == 0) {\r\n           return \"IN-PROGRESS\";\r\n       } else if (status == 1) {\r\n           return \"BACKLOG\";\r\n       }\r\n       return \"DONE\";\r\n   \r\n   }\r\n}\r\n  \r\n  \r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);\n\n//# sourceURL=webpack://todolist-Attempting-Webpacks/./src/Todo.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ \"./src/project.js\");\n/* harmony import */ var _Todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Todo.js */ \"./src/Todo.js\");\n/* harmony import */ var _master_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./master.js */ \"./src/master.js\");\n\r\n\r\n\r\n\r\n\r\n// UI STUFF\r\n\r\nfunction new_project() {\r\n    const title = document.getElementById('project-name').value;\r\n    const desc = document.getElementById('project-description').value;\r\n    var new_desc = \"\";\r\n    if (desc.length > 25) {\r\n        new_desc = desc.substring(0, 25);\r\n    }\r\n    \r\n    if (desc == \"\") {\r\n        new_desc = \"(No Description)\"\r\n    }\r\n    \r\n    const project = new _project_js__WEBPACK_IMPORTED_MODULE_0__.default(title, new_desc, new Array());\r\n    const todo = new _Todo_js__WEBPACK_IMPORTED_MODULE_1__.default(\"Default Task-1\", 0);    \r\n    project.add(todo);\r\n    \r\n    console.log(master.vomit_info());\r\n    master.add(project);\r\n    \r\n    saveProjects();\r\n}\r\n\r\nfunction find_project_by_name(name) {\r\n    return master.find(name);\r\n}\r\n\r\nfunction add_project(){\r\n  modal.classList.add('modal-active')\r\n  overlay.classList.add('active');\r\n}\r\n\r\nfunction add_task() {\r\n    console.log(current_project);\r\n    \r\n    const new_todo = new _Todo_js__WEBPACK_IMPORTED_MODULE_1__.default(\"New Task (Click me!)\", 0);\r\n    current_project.add(new_todo);\r\n    \r\n    // save changes\r\n    saveProjects();\r\n    \r\n    // display it again.\r\n    display_todo(false);\r\n    \r\n}\r\n\r\n\r\n// STATUS BUTTON Datastructures\r\n    // In progress, Backlog OR Done.\r\n    const progress = {title:\"IN-PROGRESS\", bcolor:\"dark-blue\", color: \"white\"};\r\n    const backlog = {title:\"BACKLOG\", bcolor:\"gray\", color:\"dark-blue\"};\r\n    const done = {title:\"DONE\", bcolor:\"green\", color:\"white\"};\r\n\r\n    const options = [progress, backlog, done];\r\n\r\nfunction update_status_btns(btn) {\r\n\r\n    let todo_idx = btn.getAttribute('data');\r\n    \r\n    let this_todo = current_project.todo_list[todo_idx];\r\n    \r\n    let desired_object = options[this_todo.status];\r\n    btn.textContent = desired_object.title;\r\n    btn.style.backgroundColor = \"var(--\" + desired_object.bcolor +\")\";\r\n    btn.style.color = \"var(--\" + desired_object.color +\")\";\r\n}\r\n\r\nfunction change_status_task() {\r\n\r\n    if (current_project == null) {return;}\r\n\r\n    \r\n    let current_option_idx = options.findIndex(object => object.title == this.textContent);\r\n    \r\n    \r\n    // Make the array wrap around in case I add more elements to options.\r\n        // this IDX is assigned to the status var for {current_project}.todoitem.status\r\n            // todoitem: this.getAttribute('data')\r\n            // data is a simple counter 0 -> n tasks for {current_project}\r\n    \r\n    var new_idx = current_option_idx + 1;\r\n    \r\n    // update the status on the todo item\r\n    let this_todo_idx = parseInt(this.getAttribute('data'));\r\n    current_project.todo_list[this_todo_idx].status = new_idx;\r\n    \r\n    \r\n    // Now update the button    \r\n    // mod\r\n    let m = options.length\r\n    \r\n    // 4 % 3 = 1 => 1+3 => 4 % 4 = 0. idx 4 = 0.\r\n    new_idx = ( new_idx % m + m) % m;\r\n    \r\n    \r\n    // change the type now.\r\n    let desired_object = options[new_idx];\r\n    this.textContent = desired_object.title;\r\n    this.style.backgroundColor = \"var(--\" + desired_object.bcolor +\")\";\r\n    this.style.color = \"var(--\" + desired_object.color +\")\";\r\n    \r\n    \r\n    saveProjects();\r\n}\r\n\r\nfunction change_date() {\r\n\r\n    console.log(this);\r\n}\r\n\r\nfunction update_date_btns() {\r\n\r\n}\r\n\r\n\r\nfunction reset_modal(){\r\n    modal.classList.remove('modal-active')\r\n    overlay.classList.remove('active');\r\n}\r\n\r\nfunction display_todo(btn_send = true) {\r\n\r\n    // Show stuff on the main screen based on projects.\r\n    var this_project = null;\r\n\r\n    if (btn_send == false) {\r\n        \r\n        // if called by \"add-task\", current_project is already set, stop dedpulication\r\n        this_project = current_project;\r\n    } else {\r\n        this_project = find_project_by_name(this.textContent);\r\n        // update the global var to see which project is currently on screen.\r\n        current_project = this_project;\r\n    }\r\n        \r\n    var html_string =\r\n    `\r\n    <div class=\"project-title\">            ${this_project.get_name()} \r\n                                <div id=\"desc\"> Description: ${this_project.get_desc()} </div>\r\n    </div>\r\n    <div class=\"underline-divider\"></div>\r\n    \r\n    <table class=\"fixed\" style=\"width:100%\">\r\n      <tr>\r\n        <th>Due Date</th>\r\n        <th>Title</th>\r\n        <th>Status</th>\r\n      </tr>\r\n      `\r\n     \r\n     // add the todos\r\n     let num_tasks = 0;\r\n     for (let todos of this_project.todo_list) {\r\n         console.log(todos);\r\n         html_string += \r\n         `\r\n               <tr>\r\n              <td> <input type=\"date\" class=\"date-table\" id=\"date-table\"></td>\r\n              <td contentEditable>  ${todos.title} </td>\r\n              <td>   <button class=\"status-btn\" id=\"status-btn\" data=${num_tasks}>${todos.get_status()}</button> </td>\r\n              </tr>`;\r\n              \r\n        num_tasks += 1;\r\n     }\r\n     \r\n     html_string += `</table>`;\r\n\r\n     main_view.innerHTML = html_string; \r\n     \r\n     // Now update the dates and detect any changes\r\n     let all_date_btns = document.getElementsByClassName(\"date-table\");\r\n     \r\n     for (let btn of all_date_btns) {\r\n         btn.onclick = change_date;\r\n         update_date_btns();\r\n     }\r\n     \r\n     // update the status buttons and detect any changes\r\n     let all_status_btns = document.getElementsByClassName(\"status-btn\");\r\n     \r\n     for (let btn of all_status_btns) {\r\n         btn.onclick = change_status_task;\r\n         update_status_btns(btn);\r\n     }              \r\n}\r\n\r\nfunction set_defaults() {\r\n        \r\n    // Project First\r\n    const default_project_node = document.createElement('button');\r\n    default_project_node.classList.add('btn');\r\n        \r\n    const project = new _project_js__WEBPACK_IMPORTED_MODULE_0__.default(\"Implement UX\", \"Something\", new Array());\r\n    const todo = new _Todo_js__WEBPACK_IMPORTED_MODULE_1__.default(\"Call That Nerd\", 0);    \r\n    project.add(todo);\r\n    \r\n    master.add(project);\r\n    show_projects();\r\n    \r\n    return;\r\n}\r\n\r\nfunction show_projects() {\r\n    project_grid.innerHTML = \"\";\r\n    \r\n    for (let project of master.master) {\r\n        const project_node = document.createElement('button');\r\n        project_node.classList.add('btn');\r\n    \r\n        project_node.textContent = project.get_name();\r\n        project_node.onclick = display_todo;        \r\n        \r\n        project_grid.appendChild(project_node);\r\n        \r\n        project_node.click();\r\n    }\r\n    return;\r\n}\r\n\r\n// NODES\r\n\r\nconst main_view = document.getElementById('main-project-content');\r\nconst add_project_btn = document.getElementById('add-project');\r\nconst add_task_btn = document.getElementById('add-task');\r\nconst modal =   document.getElementById('modal');\r\nconst overlay = document.getElementById('overlay')\r\nconst add_form_btn = document.getElementById(\"add_project\");\r\nconst project_grid = document.getElementById(\"projects\");\r\n\r\n\r\n\r\nvar current_project = null;\r\n\r\nconst saveProjects = () => {\r\n  localStorage.setItem('full_project_list', JSON.stringify(master.master));\r\n}\r\n\r\nadd_project_btn.onclick = add_project;\r\nadd_task_btn.onclick = add_task;\r\n\r\n\r\noverlay.onclick = reset_modal;\r\nadd_form_btn.onclick = new_project;\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// ------------------------------------------------------------------------------\r\n                            // DRIVING CODE\r\n// ------------------------------------------------------------------------------\r\nconst master_JSON = JSON.parse(localStorage.getItem('full_project_list'));\r\n\r\nconst convToProject = (project) => {\r\n\r\n    const this_project = new _project_js__WEBPACK_IMPORTED_MODULE_0__.default(project.name, project.desc, new Array());\r\n\r\n    for (let todos of project.todo_list) {\r\n        const task = new _Todo_js__WEBPACK_IMPORTED_MODULE_1__.default(todos.title, todos.status);\r\n        this_project.add(task);\r\n    }\r\n\r\n  return this_project;\r\n}\r\n\r\nconst restoreLocal = () => {\r\n  for (let project of master_JSON) {\r\n    // The projects that are added are already unqiue, use constant complexity\r\n    master.master.push(convToProject(project));\r\n  }         \r\n}\r\n\r\n\r\nconst master = new _master_js__WEBPACK_IMPORTED_MODULE_2__.default();\r\n\r\nif (master_JSON != null) {\r\n    // parse the JSON, second loading.\r\n    restoreLocal();\r\n} else {\r\n    // INIT the defaults.\r\n    set_defaults();\r\n}\r\n\r\n// Display it again, on page-reload as well.\r\nshow_projects();\r\n\n\n//# sourceURL=webpack://todolist-Attempting-Webpacks/./src/index.js?");

/***/ }),

/***/ "./src/master.js":
/*!***********************!*\
  !*** ./src/master.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Master {\r\n  constructor() {\r\n    this.master = [];\r\n  }\r\n      \r\n   add(project) {\r\n       this.master.push(project);\r\n   }\r\n   \r\n  find(project_name) {\r\n  //find a project by its name\r\n    return this.master.find((project) => project.name === project_name);\r\n  }\r\n  vomit_info() {return `Master: ${this.master}`;}\r\n\r\n}\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Master);\n\n//# sourceURL=webpack://todolist-Attempting-Webpacks/./src/master.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Project {\r\n\r\n  constructor(name, desc, todo_list) {\r\n    this.name = name;\r\n    this.desc = desc;\r\n    this.todo_list = todo_list;\r\n  }\r\n   \r\n   get_name() {return this.name;}\r\n   set_name(new_name) {this.name = new_name;}\r\n    \r\n   get_desc() {return this.desc;}\r\n\r\n   \r\n   vomit_info() {return `Name: ${this.name}`;}\r\n   \r\n   \r\n   add(todo) {\r\n       this.todo_list.push(todo);\r\n   }\r\n\r\n}\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);\r\n\n\n//# sourceURL=webpack://todolist-Attempting-Webpacks/./src/project.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;