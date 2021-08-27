import Project from './project.js';
import Todo from './Todo.js';
import Master from './master.js';


// UI STUFF

function new_project() {
    const title = document.getElementById('project-name').value;
    const desc = document.getElementById('project-description').value;
    var new_desc = "";
    if (desc.length > 25) {
        new_desc = desc.substring(0, 25);
    }
    
    if (desc == "") {
        new_desc = "(No Description)"
    }
    
    const project = new Project(title, new_desc, new Array());
    const todo = new Todo("Default Task-1", 0);    
    project.add(todo);
    
    console.log(master.vomit_info());
    master.add(project);
    
    saveProjects();
}

function find_project_by_name(name) {
    return master.find(name);
}

function add_project(){
  modal.classList.add('modal-active')
  overlay.classList.add('active');
}

function add_task() {
    console.log(current_project);
    
    const new_todo = new Todo("New Task (Click me!)", 0);
    current_project.add(new_todo);
    
    // save changes
    saveProjects();
    
    // display it again.
    display_todo(false);
    
}


// STATUS BUTTON Datastructures
    // In progress, Backlog OR Done.
    const progress = {title:"IN-PROGRESS", bcolor:"dark-blue", color: "white"};
    const backlog = {title:"BACKLOG", bcolor:"gray", color:"dark-blue"};
    const done = {title:"DONE", bcolor:"green", color:"white"};

    const options = [progress, backlog, done];

function update_status_btns(btn) {

    let todo_idx = btn.getAttribute('data');
    
    let this_todo = current_project.todo_list[todo_idx];
    
    let desired_object = options[this_todo.status];
    btn.textContent = desired_object.title;
    btn.style.backgroundColor = "var(--" + desired_object.bcolor +")";
    btn.style.color = "var(--" + desired_object.color +")";
}

function change_status_task() {

    if (current_project == null) {return;}

    
    let current_option_idx = options.findIndex(object => object.title == this.textContent);
    
    
    // Make the array wrap around in case I add more elements to options.
        // this IDX is assigned to the status var for {current_project}.todoitem.status
            // todoitem: this.getAttribute('data')
            // data is a simple counter 0 -> n tasks for {current_project}
    
    var new_idx = current_option_idx + 1;
    
    // update the status on the todo item
    let this_todo_idx = parseInt(this.getAttribute('data'));
    current_project.todo_list[this_todo_idx].status = new_idx;
    
    
    // Now update the button    
    // mod
    let m = options.length
    
    // 4 % 3 = 1 => 1+3 => 4 % 4 = 0. idx 4 = 0.
    new_idx = ( new_idx % m + m) % m;
    
    
    // change the type now.
    let desired_object = options[new_idx];
    this.textContent = desired_object.title;
    this.style.backgroundColor = "var(--" + desired_object.bcolor +")";
    this.style.color = "var(--" + desired_object.color +")";
    
    
    saveProjects();
}

function change_date() {

    console.log(this);
}

function update_date_btns() {

}


function reset_modal(){
    modal.classList.remove('modal-active')
    overlay.classList.remove('active');
}

function display_todo(btn_send = true) {

    // Show stuff on the main screen based on projects.
    var this_project = null;

    if (btn_send == false) {
        
        // if called by "add-task", current_project is already set, stop dedpulication
        this_project = current_project;
    } else {
        this_project = find_project_by_name(this.textContent);
        // update the global var to see which project is currently on screen.
        current_project = this_project;
    }
        
    var html_string =
    `
    <div class="project-title">            ${this_project.get_name()} 
                                <div id="desc"> Description: ${this_project.get_desc()} </div>
    </div>
    <div class="underline-divider"></div>
    
    <table class="fixed" style="width:100%">
      <tr>
        <th>Due Date</th>
        <th>Title</th>
        <th>Status</th>
      </tr>
      `
     
     // add the todos
     let num_tasks = 0;
     for (let todos of this_project.todo_list) {
         console.log(todos);
         html_string += 
         `
               <tr>
              <td> <input type="date" class="date-table" id="date-table"></td>
              <td contentEditable>  ${todos.title} </td>
              <td>   <button class="status-btn" id="status-btn" data=${num_tasks}>${todos.get_status()}</button> </td>
              </tr>`;
              
        num_tasks += 1;
     }
     
     html_string += `</table>`;

     main_view.innerHTML = html_string; 
     
     // Now update the dates and detect any changes
     let all_date_btns = document.getElementsByClassName("date-table");
     
     for (let btn of all_date_btns) {
         btn.onclick = change_date;
         update_date_btns();
     }
     
     // update the status buttons and detect any changes
     let all_status_btns = document.getElementsByClassName("status-btn");
     
     for (let btn of all_status_btns) {
         btn.onclick = change_status_task;
         update_status_btns(btn);
     }              
}

function set_defaults() {
        
    // Project First
    const default_project_node = document.createElement('button');
    default_project_node.classList.add('btn');
        
    const project = new Project("Implement UX", "Something", new Array());
    const todo = new Todo("Call That Nerd", 0);    
    project.add(todo);
    
    master.add(project);
    show_projects();
    
    return;
}

function show_projects() {
    project_grid.innerHTML = "";
    
    for (let project of master.master) {
        const project_node = document.createElement('button');
        project_node.classList.add('btn');
    
        project_node.textContent = project.get_name();
        project_node.onclick = display_todo;        
        
        project_grid.appendChild(project_node);
        
        project_node.click();
    }
    return;
}

// NODES

const main_view = document.getElementById('main-project-content');
const add_project_btn = document.getElementById('add-project');
const add_task_btn = document.getElementById('add-task');
const modal =   document.getElementById('modal');
const overlay = document.getElementById('overlay')
const add_form_btn = document.getElementById("add_project");
const project_grid = document.getElementById("projects");



var current_project = null;

const saveProjects = () => {
  localStorage.setItem('full_project_list', JSON.stringify(master.master));
}

add_project_btn.onclick = add_project;
add_task_btn.onclick = add_task;


overlay.onclick = reset_modal;
add_form_btn.onclick = new_project;







// ------------------------------------------------------------------------------
                            // DRIVING CODE
// ------------------------------------------------------------------------------
const master_JSON = JSON.parse(localStorage.getItem('full_project_list'));

const convToProject = (project) => {

    const this_project = new Project(project.name, project.desc, new Array());

    for (let todos of project.todo_list) {
        const task = new Todo(todos.title, todos.status);
        this_project.add(task);
    }

  return this_project;
}

const restoreLocal = () => {
  for (let project of master_JSON) {
    // The projects that are added are already unqiue, use constant complexity
    master.master.push(convToProject(project));
  }         
}


const master = new Master();

if (master_JSON != null) {
    // parse the JSON, second loading.
    restoreLocal();
} else {
    // INIT the defaults.
    set_defaults();
}

// Display it again, on page-reload as well.
show_projects();
