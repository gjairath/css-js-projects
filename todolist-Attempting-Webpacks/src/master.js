class Master {
  constructor() {
    this.master = [];
  }
      
   add(project) {
       this.master.push(project);
   }
   
  find(project_name) {
  //find a project by its name
    return this.master.find((project) => project.name === project_name);
  }
  vomit_info() {return `Master: ${this.master}`;}

}


export default Master