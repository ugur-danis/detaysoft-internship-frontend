const libraryManager = new LibraryManager();

const titleInput = document.getElementById("bookTitle");
const relaseYearInput = document.getElementById("relaseYear");
const bookTypeInput = document.getElementById("bookType");
const authorInput = document.getElementById("author");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

saveBtn.addEventListener("click", () => {
  const book = {
    AuthorId: authorInput.value,
    BookTitle: titleInput.value,
    BookRelaseYear: relaseYearInput.value,
    /*  bookTypes: Array.from(bookTypeInput.selectedOptions).map(({ value }) => {
      return parseInt(value);
    }), */
  };
  libraryManager.add(book).then(() => goIndexPage());
});

cancelBtn.addEventListener("click", () => {
  goIndexPage();
});

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

// setBookTypesSelectElement();
setAuthorSelectElement();
