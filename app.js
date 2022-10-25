//let books = JSON.parse(localStorage.getItem('books')) === null ? [] : JSON.parse(localStorage.getItem('books'));
const createBookForm = document.querySelector('.create-book');

// function saveLocalStorage() {
//   localStorage.setItem('books', JSON.stringify(books));
// }

// function clearForm() {
//   createBookForm.elements.title.value = '';
//   createBookForm.elements.author.value = '';
// }

// function createSingleBookCard(book) {
//   booksContainer.innerHTML += `<div class="book-card">
//     <p>${book.title}</p>
//     <p>${book.author}</p>
//     <button id="">remove</button>
//     <hr/>
//     </div>`;
// }

// function refreshContent() {
//   booksContainer.innerHTML = '';
//   books.forEach((book) => {
//     createSingleBookCard(book);
//   });

//   if (books.length > 0) {
//     removeBook();
//   }
// }

// function removeBook() {
//   const bookCards = document.querySelectorAll('.book-card');
//   bookCards.forEach((bookCard, cardIndex) => {
//     bookCard.children[2].addEventListener('click', () => {
//       books = books.filter((book, i) => i !== cardIndex);
//       saveLocalStorage();
//       refreshContent();
//     });
//   });
// }

// function addBook(event) {
//   event.preventDefault();
//   const title = createBookForm.elements.title.value;
//   const author = createBookForm.elements.author.value;
//   if (title.trim().length > 0 && author.trim().length > 0) {
//     books.push({
//       title, author,
//     });
//     clearForm();
//     saveLocalStorage();
//     refreshContent();
//   }
// }

// refreshContent();


class BookModel {
  constuctor(bookContainer) {
    this.books = JSON.parse(localStorage.getItem('books')) === null ? [] : JSON.parse(localStorage.getItem('books'));
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
      refreshContent();
    }
  }

  removeBook() {
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((bookCard, cardIndex) => {
      bookCard.children[2].addEventListener('click', () => {
        books = books.filter((book, i) => i !== cardIndex);
        this.saveLocalStorage();
        refreshContent();
      });
    });
  }

  /*=================================\*
               Utilities
  \*==================================*/

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


createBookForm.addEventListener('submit', (event) => {
  const booksContainer = document.querySelector('.books-container');
  event.preventDefault();
  const book1 = new BookModel(booksContainer);
  console.log(booksContainer);
  console.log('you clicked on the button!');
  book1.addBook(createBookForm);
  book1.refreshContent();
});