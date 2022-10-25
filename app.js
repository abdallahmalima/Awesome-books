class BookModel {
  constructor(bookContainer) {
    this.books = (localStorage.getItem('books') === null) ? [] : JSON.parse(localStorage.getItem('books'));
    this.bookContainer = bookContainer;
  }

  getBooks() {
    return this.books;
  }

  addBook(form) {
    const title = form.elements.title.value;
    const author = form.elements.author.value;
    if (title.trim().length > 0 && author.trim().length > 0) {
      this.books.push({
        title, author,
      });
      this.clearForm(form);
      this.saveLocalStorage(this.books);
      this.refreshContent();
    }
  }

  removeBook() {
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((bookCard, cardIndex) => {
      bookCard.children[2].addEventListener('click', () => {
        this.books = this.books.filter((book, i) => i !== cardIndex);
        this.saveLocalStorage(this.books);
        this.refreshContent();
      });
    });
  }

  /*= ================================\*
               Utilities
  \*================================== */

  saveLocalStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  clearForm(form) {
    form.elements.title.value = '';
    form.elements.author.value = '';
  }

  createSingleBookCard(book) {
    this.bookContainer.innerHTML += `<div class="book-card">
      <p>${book.title}</p>
      <p>${book.author}</p>
      <button id="">remove</button>
      <hr/>
      </div>`;
  }

  refreshContent() {
    this.bookContainer.innerHTML = '';
    this.books.forEach((book) => {
      this.createSingleBookCard(book);
    });

    if (this.books.length > 0) {
      this.removeBook();
    }
  }
}

const createBookForm = document.querySelector('.create-book');
const booksContainer = document.querySelector('.books-container');

const book1 = new BookModel(booksContainer);
book1.refreshContent();

createBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  book1.addBook(createBookForm);
});