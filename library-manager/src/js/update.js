const libraryManager = new LibraryManager();

const titleInput = document.getElementById("bookTitle");
const relaseYearInput = document.getElementById("relaseYear");
const bookTypeInput = document.getElementById("bookType");
const authorInput = document.getElementById("author");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
let _book;

saveBtn.addEventListener("click", () => {
  const book = {
    BookId: _book.BookId,
    AuthorId: authorInput.value,
    BookTitle: titleInput.value,
    BookRelaseYear: relaseYearInput.value,
    /* bookTypes: Array.from(bookTypeInput.selectedOptions).map(({ value }) => {
      return parseInt(value);
    }), */
  };
  libraryManager.update(book).then(() => goIndexPage());
});

cancelBtn.addEventListener("click", () => {
  goIndexPage();
});

function setInputValues() {
  titleInput.value = _book.BookTitle;
  relaseYearInput.value = _book.BookRelaseYear;
  authorInput.value = _book.Author.AuthorId;
  /*  bookTypeInput.options[0].selected = false;
  _book.bookTypes.forEach((type) => {
    bookTypeInput.options[--type.typeId].selected = true;
  }) */
}

function goIndexPage() {
  window.location.pathname =
    window.location.pathname.split("/").slice(0, -1).join("/") + "/";
}

/* async function setBookTypesSelectElement() {
  const types = await libraryManager.getBookTypes();
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.typeId;
    option.innerHTML = type.typeName;
    bookTypeInput.append(option);
  });
  bookTypeInput.firstChild.selected = true;
  bookTypeInput.size = types.length;
} */

async function setAuthorSelectElement() {
  const authors = await libraryManager.getAuthors();

  authors.forEach((author) => {
    const option = document.createElement("option");
    option.value = author.AuthorId;
    option.innerHTML = author.AuthorName + " " + author.AuthorLastName;
    authorInput.append(option);
  });
  authorInput.firstChild.selected = true;
}

window.addEventListener("load", () => {
  _book = JSON.parse(window.localStorage.getItem("updateBook"));
  window.localStorage.clear();
  if (_book == null) goIndexPage();
  else {
    //setBookTypesSelectElement().then(() => {
    setAuthorSelectElement().then(() => {
      setInputValues();
    });
    //});
  }
});
