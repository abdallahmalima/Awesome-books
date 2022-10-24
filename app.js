let books = JSON.parse(localStorage.getItem('books')) === null ? [] : JSON.parse(localStorage.getItem('books'));
const createBookForm = document.querySelector('.create-book');
const booksContainer = document.querySelector('.books-container');

function saveLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function clearForm() {
  createBookForm.elements.title.value = '';
  createBookForm.elements.author.value = '';
}

function createSingleBookCard(book) {
  booksContainer.innerHTML += `<div class="book-card">
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button id="">remove</button>
    <hr/>
    </div>`;
}

function refreshContent() {
  booksContainer.innerHTML = '';
  books.forEach((book) => {
    createSingleBookCard(book);
  });

  if (books.length > 0) {
    removeBook();
  }
}

function removeBook() {
  const bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach((bookCard, cardIndex) => {
    bookCard.children[2].addEventListener('click', () => {
      books = books.filter((book, i) => i !== cardIndex);
      saveLocalStorage();
      refreshContent();
    });
  });
}

function addBook(event) {
  event.preventDefault();
  const title = createBookForm.elements.title.value;
  const author = createBookForm.elements.author.value;
  if (title.trim().length > 0 && author.trim().length > 0) {
    books.push({
      title, author,
    });
    clearForm();
    saveLocalStorage();
    refreshContent();
  }
}

refreshContent();

createBookForm.addEventListener('submit', addBook);
