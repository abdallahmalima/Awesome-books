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
    const bookCards = document.querySelectorAll('.remove-btn');
    bookCards.forEach((bookCard, cardIndex) => {
      bookCard.addEventListener('click', () => {
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
    this.bookContainer.innerHTML += `
    <tr>
      <td>${book.title} by ${book.author}</td>
      <td><button class="remove-btn">remove</button></td>
    </tr>`;
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
const booksContainer = document.querySelector('.book-content');

const book1 = new BookModel(booksContainer);
book1.refreshContent();

createBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  book1.addBook(createBookForm);
});