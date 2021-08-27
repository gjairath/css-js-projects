// Utility functions

// https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
// Taken from here ^
function generate_random_color() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}


var first_run = true;
const all_read_fn = () => {
    for (let idx = 0; idx < full_library.full_library.length; idx++) {
        
        if (first_run == true) {
            full_library.full_library[idx].isRead = true;
        } else {
            full_library.full_library[idx].isRead = !full_library.full_library[idx].isRead;    
        }
        
    }
    
    if (first_run == true) {
        warning_item.innerHTML = "Your data is being stored locally..."
        first_run = false;
    }
    saveBooks();
    displayBooks();
}


// Taken from docs and modified
function search_cards() {

  var input, filter, txtValue;
  input = document.getElementById('search-bar');
  filter = input.value.toUpperCase();
    

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < card_grid.children.length; i++) {
    let child_card = card_grid.children[i];
    
    title_content = child_card.children[1].children[0];
    
    txtValue = title_content.textContent || title_content.innerText;
    console.log(txtValue);
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      child_card.style.display = "";
    } else {
      child_card.style.display = "none";
    }
  }
}


// -------------------------------------------------
    // Relevant Classes
class Library {
  constructor() {
    this.full_library = []
  }

  add(newBook) {
      if(this.exists(newBook) == false) {
          warning_item.innerHTML = "";
          this.full_library.push(newBook);
          num_books = num_books + 1;

      } else{
          warning_item.innerHTML = "This book already exists!";
      }
  }

  remove(id) {

    this.full_library = this.full_library.filter((book) => book.id !== id);
    displayBooks();
  }

  find(id) {
    return this.full_library.findIndex((book) => book.id === id)
  }

  exists(book){
  //  return arr.some(arrVal => val === arrVal);
    return this.full_library.some((exist_books) => exist_books.name === book.name);
   }
}
            // Book constructors.
function Book(name, author, pages, isRead, color, id) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    
    this.color = color;
    this.id = id;
}

Book.prototype.info = function() {
  return `Book Name: ${this.name}\nAuthor Name: ${this.author}\nPages: ${this.pages}\nisRead: ${this.isRead}` ;
}


const full_library = new Library()

// -------------------------------------------------
// Nodes
var toggleClass = function (el, className) {
    if (el) {
        if (el.className.indexOf(className) != -1) {
            el.className = el.className.replace(className, '');
        } else {
            el.className += ' ' + className;
        }
    }
};
const add_book_btn = document.getElementById('add-book-btn');
const add_book_form = document.getElementById('add-book-form');

const add_book_modal = document.getElementById('add-book-modal');
const card_grid = document.getElementById('card-grid');

const warning_item = document.getElementById('warning-item');

const all_read = document.getElementById('all_read');

var num_books = 0;

// Event Listeners
const openBookModal = () => {
    add_book_modal.classList.remove('hidden');
    toggleClass(add_book_modal, "hide");
    toggleClass( add_book_form, "slide-animation");

}

const fetchData = (event) => {
    event.preventDefault();
    form = document.getElementById("add-book-form");
    
    const newBook = getBookFromInput();
    full_library.add(newBook);
    close_modal();
    // The way I designed the toggle functionality of a modal, you must clear the hidden classes.
        // This is safe (however)
    add_book_btn.click();

    saveBooks();
    displayBooks();
}

const getBookFromInput = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;
  
  const color = generate_random_color();
  const id = num_books;
  return new Book(title, author, pages, isRead, color, id);
}

function reset_modal(){
    if (add_book_modal.className.indexOf('hide') == -1) {
        add_book_modal.classList.add('hide');
        toggleClass( add_book_form, "slide-animation");

    }
}
    
add_book_btn.onclick = openBookModal;
add_book_form.onsubmit = fetchData;
card_grid.onclick = reset_modal;
all_read.onclick = all_read_fn;
// -------------- CSS STUFF -----------------

function toggle_light_mode() {
  var container_below = document.getElementById("container-below");
  var mini_top = document.getElementById("mini-top");
  var top_banner = document.getElementById("top-banner");

  mini_top.classList.toggle("dark-mode");
  top_banner.classList.toggle("dark-mode");
  container_below.classList.toggle("dark2-mode");
  
  var children = card_grid.children;
  for (var i = 0; i < children.length; i++) {

        // change each card not card container.      
      children[i].children[0].style.backgroundColor = "#404040";
            
    }  
  
  var lightbulb = document.getElementById("content-light-btn")
  if(lightbulb.style.color == "blue") {
      // will revert to light mode now.
      lightbulb.style.color = "black";
      displayBooks();
      
  } else{
      lightbulb.style.color = "blue";
      document.getElementById("warning-item").innerText = "";
  }
}

function close_modal() {
    add_book_modal.classList.add('hidden');
}


// ------------ MAIN -------------------
function displayBooks() {
    card_grid.innerHTML = "";
    // create cards and upload them.
    for (let book of full_library.full_library) {
          const bookContainer = document.createElement('div');

          const bookCard = document.createElement('div');
          
          const bookContent = document.createElement('div');
          
          const readButton = document.createElement('button');
          readButton.textContent = `Read ${book.pages} Pages`;
          const deleteButton = document.createElement('button');
          deleteButton.textContent = "x";
          
          
          this_btn_id = `${book.id}`;
          deleteButton.id = this_btn_id;
          readButton.id = "read" + this_btn_id;

         
          deleteButton.onclick = deleteBook;
          readButton.onclick = readBook;
          var att = document.createAttribute("data_val");
          att.value = this_btn_id;
          readButton.setAttributeNode(att);

          const title = document.createElement('p');
          const author_pages = document.createElement('p');
          
        
            // Add styling.
          bookContainer.classList.add('card-container');
          bookCard.classList.add('card');
          bookContent.classList.add('card-content');
            
          readButton.classList.add('btn', 'btn-card');
          if (book.isRead == true) {
              readButton.classList.add('btn-success');
          }
          
          
          deleteButton.classList.add('delete-btn');
              
          title.classList.add('title-content')
          author_pages.classList.add('author-content')
          
                
          bookCard.style.backgroundColor = book.color;
          
          title.textContent = `${book.name}`;
          author_pages.textContent = `${book.author}`;

          bookCard.appendChild(deleteButton);
          bookCard.appendChild(readButton);

          bookContainer.appendChild(bookCard);          
          bookContainer.appendChild(bookContent);
          
          bookContent.appendChild(title);
          bookContent.appendChild(author_pages);
          card_grid.appendChild(bookContainer);

    }
}

function deleteBook() {
    let book_idx = parseInt(this.id) + 1;
    if(confirm(`Are you sure you want to delete this Book?`) == false){
        return;
    }
    full_library.remove(book_idx - 1);
    
    saveBooks();
    num_books = num_books - 1;
}

function readBook() {
    
    // this is the index thats static with each book object
    let read_idx = this.getAttribute("data_val")
    
    let book_idx = full_library.find(parseInt(read_idx));

        
    full_library.full_library[book_idx].isRead = !full_library.full_library[book_idx].isRead;
        
    toggleClass(document.getElementById("read" + read_idx), "btn-success");
    saveBooks();
}


function restore(){
    // Restore stuff, on first launch or consecutive, << driving code >> .
    const default_book = new Book("HARRY POTTAH", "JK RO RO", "223", true, 'rgba(234, 193, 139, 0.7)', num_books);
    num_books = num_books + 1;
    full_library.full_library.push(default_book);
    displayBooks();

}

const saveBooks = () => {
  localStorage.setItem('full_library', JSON.stringify(full_library.full_library))
}


const convToBook = (book) => {
  return new Book(book.name, book.author, book.pages, book.isRead, book.color, book.id);
}

const restoreLocal = () => {
  const all_books = JSON.parse(localStorage.getItem('full_library'));
  
  if (all_books.length !== 0) {
      
      for (let book of all_books) {
          // The books that are added are already unqiue, use constant complexity
          full_library.full_library.push(convToBook(book));
          num_books = num_books + 1;
      }
    
      displayBooks();
      
  } else {
    full_library.full_library = [];
    restore();
  }
   
  
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function prompt_test(){
    full_library.full_library = [];
    let num_books = prompt("Number of Random Books:", "10");
    test(num_books);
}

function test(num_books){
    for (let val = 0; val < num_books; val++) {
        const test1 = new Book(val.toString(), val, val * getRandomInt(1000), Math.random() < 0.5, generate_random_color(), val);
        full_library.full_library.push(test1);
    }
    saveBooks();
    displayBooks();
    first_run = true;
}

// run once to save and uncomment inelegant but whatever 
// edit: inelegance eliminated
// test(100);

restoreLocal();