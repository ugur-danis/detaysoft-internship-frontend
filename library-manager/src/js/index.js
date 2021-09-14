const libraryManager = new LibraryManager();
const bookListElement = document.getElementById("bookList");

async function getBookList() {
  bookListElement.innerHTML = "";
  const bookList = await libraryManager.getAll();
  let i = 1;

  bookList.forEach((book) => {
    const newTr = document.createElement("tr");
    const numberTd = document.createElement("td");
    numberTd.setAttribute("scope", "row");
    numberTd.innerHTML = i;
    newTr.append(numberTd);

    const nameTd = document.createElement("td");
    nameTd.innerHTML = book.author.name;
    newTr.append(nameTd);

    const lastNameTd = document.createElement("td");
    lastNameTd.innerHTML = book.author.lastName;
    newTr.append(lastNameTd);

    const titleTd = document.createElement("td");
    titleTd.innerHTML = book.title;
    newTr.append(titleTd);

    const typeTd = document.createElement("td");
    typeTd.innerHTML += book.bookTypes.map((type) => type.typeName);
    newTr.append(typeTd);

    const relaseYearTd = document.createElement("td");
    relaseYearTd.innerHTML = book.relaseYear;
    newTr.append(relaseYearTd);

    const actionTd = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.className = "btn btn-primary me-2";
    editButton.innerHTML = "Edit";
    editButton.onclick = () => {
      editBtn(book);
    };

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = () => {
      deleteBtn(book);
    };

    actionTd.append(editButton, deleteButton);
    newTr.append(actionTd);
    bookListElement.append(newTr);
    i++;
  });

  const addNewBookTr = document.createElement("tr");
  const addNewBookTd = document.createElement("td");
  addNewBookTd.setAttribute("colspan", "7");
  addNewBookTd.classList = "text-center";

  const addnewBookA = document.createElement("a");
  addnewBookA.href = "./create.html";
  addnewBookA.className = "link-info";
  addnewBookA.innerHTML = "Add New Book";

  addNewBookTd.append(addnewBookA);
  addNewBookTr.append(addNewBookTd);
  bookListElement.append(addNewBookTr);
}

async function saveBtn() {
  const newBook = {
    id: 0,
    author: {
      id: 0,
      name: "",
      lastName: "",
    },
    title: "",
    relaseYear: "",
    bookTypes: [
      {
        typeId: 0,
        typeName: "",
      },
    ],
  };
  await libraryManager.add(book);
  await getBookList();
}

async function deleteBtn(book) {
  await libraryManager.delete(book);
  await getBookList();
}

function editBtn(book) {
  window.localStorage.setItem("updateBook", JSON.stringify(book));
  window.location.pathname =
    window.location.pathname.split("/").slice(0, -1).join("/") + "/update.html";
}

getBookList();
