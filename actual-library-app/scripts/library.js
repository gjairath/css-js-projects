// -------------------------------------------------
            // Book constructors.
function Book(name, author) {
    this.name = name;
    this.author = author;   
}


Book.prototype.info = function() {
  return `Book Name: ${this.name}\nAuthor Name: ${this.author}` ;
}

// -------------------------------------------------


let full_library = [];

function addBookToLibrary() {
    var person = prompt("Please enter your book name", "Harry Potter");
    const new_book = new Book(person, "JK");
    
    full_library.push(new_book);
    console.log(full_library[0].info());
}

function displayBooks() {
    var card_body = document.getElementById("card-body");         

    for (let i = 0; i < full_library.length; i++) {
        card_body.innerHTML = full_library[i].name;
    }
    
}


//addBookToLibrary();
//displayBooks();





// -------------- CSS STUFF -----------------

function toggle_light_mode() {
  var element = document.getElementById("container-below");
  element.classList.toggle("dark-mode");
  
  
  var lightbulb = document.getElementById("light-mode-icon")
  if(lightbulb.style.color == "gray") {
      lightbulb.style.color = "black";
  } else{
      lightbulb.style.color = "gray";
  }
}