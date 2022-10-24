let books = JSON.parse(localStorage.getItem('books')) === null ? [] : JSON.parse(localStorage.getItem('books'));

const createBookForm = document.querySelector('.create-book');
const booksContainer = document.querySelector('.books-container');

function saveLocalStorage(){
  localStorage.setItem('books', JSON.stringify(books));
}

function clearForm() {
  createBookForm.elements.title.value = '';
  createBookForm.elements.author.value = '';
}

function refreshContent() {
  booksContainer.innerHTML = ``;
  books.forEach(book => {
    createSingleBookCard(book);
  })
};

function addBook(event) {
  event.preventDefault();
  const title = createBookForm.elements.title.value;
  const author = createBookForm.elements.author.value;
  if (title.trim().length > 0 && author.trim().length > 0) {
    books.push({
      title, author
    });
    clearForm();
    saveLocalStorage();
    refreshContent();
  }
  
}

function createSingleBookCard(obj) {
  booksContainer.innerHTML += `<div class="book-card">
  <p>${obj.title}</p>
  <p>${obj.author}</p>
  <button id="remove-btn">remove</button>
  <hr/>
  </div>`;
}


refreshContent();


createBookForm.addEventListener('submit', addBook);