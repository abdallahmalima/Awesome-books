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

// const createBookForm = document.querySelector('.create-book');
let options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', second:'2-digit' };
const dateContainer=document.querySelector('.date');
dateContainer.textContent = new Date().toLocaleString("en-US",options);
setInterval(()=>{
dateContainer.textContent = new Date().toLocaleString("en-US",options);
},1000);
// const booksContainer = document.querySelector('.book-content');
const booksContainer = document.createElement('div');
booksContainer.classList.add('books-container');
const table = document.createElement('table');
table.classList.add('book-content');
booksContainer.append(table);
const lists = document.querySelectorAll('.link-btn');
const contentWrapper=document.querySelector('#content .wrapper');

contentWrapper.append(booksContainer);
const book1 = new BookModel(table);
book1.refreshContent();

// createBookForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   book1.addBook(createBookForm);
// });


lists.forEach((list , index) =>{
 list.addEventListener('click',() => {
    if(index===0){
      contentWrapper.innerHTML=booksContainer.innerHTML;
      book1.refreshContent();
    }else if(index===1){
      contentWrapper.innerHTML=`
      <div class="content-container">
      <div class="form-container">
      <h2>Add a new book</h2>
      <form class="create-book" action="">
        <input class="input" name="title" type="text" placeholder="Title">
        <input class="input" name="author" type="text" placeholder="Author">
        <button id="add-btn" type="submit">Add</button>
      </form>
    </div>
    </div>
      `;
    }else{
      contentWrapper.innerHTML=`
      <div class="content-container">
      <h2>Contact Information</h2>
        <div class="contact-container">
          <p>Do you have any questions or you just want to say hello?, You can reach out to us</p>

          <ul>
            <li>Our email is email@email.com</li>
            <li>Our phone is : +124125475</li>
            <li>Our address is : Streethome 214, 14237 city, Country</li>
          </ul>
    </div>
      `;
    }
 })
})

