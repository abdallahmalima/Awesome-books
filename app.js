const createBookForm = document.querySelector('.create-book');

function clearForm() {
  createBookForm.elements.title.value = '';
  createBookForm.elements.author.value = '';
}

function addBook(event) {
  event.preventDefault();
  const title = createBookForm.elements.title.value;
  const author = createBookForm.elements.author.value;
  const book = { title, author };
  
  clearForm();
}



createBookForm.addEventListener('submit', addBook);