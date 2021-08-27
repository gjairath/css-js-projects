class Todo {
  constructor(title, status) {
    
    this.title = title;
    this.status = status; // 0 prog, 1 back, 2 done
  }
  
     get_name() {return this.name;}
     
     
        
   get_status() {
   
       if (status == 0) {
           return "IN-PROGRESS";
       } else if (status == 1) {
           return "BACKLOG";
       }
       return "DONE";
   
   }
}
  
  
export default Todo