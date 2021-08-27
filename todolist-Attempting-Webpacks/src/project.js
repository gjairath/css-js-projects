class Project {

  constructor(name, desc, todo_list) {
    this.name = name;
    this.desc = desc;
    this.todo_list = todo_list;
  }
   
   get_name() {return this.name;}
   set_name(new_name) {this.name = new_name;}
    
   get_desc() {return this.desc;}

   
   vomit_info() {return `Name: ${this.name}`;}
   
   
   add(todo) {
       this.todo_list.push(todo);
   }

}


export default Project
