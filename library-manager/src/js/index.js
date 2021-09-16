const libraryManager = new LibraryManager();
const bookListElement = document.getElementById("bookList");

async function getBookList() {
  bookListElement.innerHTML = "";
  const bookList = await libraryManager.getAll();
  let i = 1;

  if (bookList == null) return;

  bookList.forEach((book) => {
    const newTr = document.createElement("tr");
    const numberTd = document.createElement("td");
    numberTd.setAttribute("scope", "row");
    numberTd.innerHTML = i;
    newTr.append(numberTd);

    const nameTd = document.createElement("td");
    nameTd.innerHTML = book.Author.AuthorName;
    newTr.append(nameTd);

    const lastNameTd = document.createElement("td");
    lastNameTd.innerHTML = book.Author.AuthorLastName;
    newTr.append(lastNameTd);

    const titleTd = document.createElement("td");
    titleTd.innerHTML = book.BookTitle;
    newTr.append(titleTd);

    /* const typeTd = document.createElement("td");
    typeTd.innerHTML += book.BookTypes.map((type) => type.typeName);
    newTr.append(typeTd); */

    const relaseYearTd = document.createElement("td");
    relaseYearTd.innerHTML = book.BookRelaseYear;
    newTr.append(relaseYearTd);

    const actionTd = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.className = "btn btn-primary me-5 w-25";
    editButton.innerHTML = "Edit";
    editButton.onclick = () => {
      editBtn(book);
    };

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger w-25";
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = () => {
      deleteBtn(book);
    };

    actionTd.append(editButton, deleteButton);
    newTr.append(actionTd);
    bookListElement.append(newTr);
    i++;
  });
}

async function deleteBtn(book) {
  await libraryManager.delete(book).then(() => getBookList());
}

function editBtn(book) {
  window.localStorage.setItem("updateBook", JSON.stringify(book));
  window.location.pathname =
    window.location.pathname.split("/").slice(0, -1).join("/") + "/update.html";
}

getBookList();
