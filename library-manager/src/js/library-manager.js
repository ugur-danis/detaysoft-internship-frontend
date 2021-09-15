class LibraryManager {
  constructor() {
    this.apiBookUrl = "http://localhost:61363/api/books/";
    this.apiAuthorUrl = "http://localhost:61363/api/authors/";
  }

  async getAll() {
    return await fetch(this.apiBookUrl).then((response) => response.json());
  }

  /* async getBookTypes() {
    return await fetch("https://localhost:44332/api/types/").then((response) =>
      response.json()
    );
  } */

  async getAuthors() {
    return await fetch(this.apiAuthorUrl).then((response) => response.json());
  }

  async add(book) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify(book);
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    await fetch(this.apiBookUrl, requestOptions);
  }

  async update(book) {
    const id = book.BookId;
    delete book.BookId;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify(book);
    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(this.apiBookUrl + `${id}`, requestOptions);
  }

  async delete(book) {
    const id = book.BookId;
    delete book.BookId;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(book);

    let requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(this.apiBookUrl + `${id}`, requestOptions);
  }
}
