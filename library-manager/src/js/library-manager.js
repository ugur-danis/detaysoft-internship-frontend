class LibraryManager {
  constructor() {
    this.apiUrl = "https://localhost:44332/api/books/";
  }

  async getAll() {
    return await fetch(this.apiUrl).then((response) => response.json());
  }

  async getBookTypes() {
    return await fetch("https://localhost:44332/api/types/").then((response) =>
      response.json()
    );
  }

  async getAuthors() {
    return await fetch("https://localhost:44332/api/authors/").then(
      (response) => response.json()
    );
  }

  async add(book) {
    await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
  }

  async update(book) {
    const id = book.id;
    delete book.id;
    await fetch(this.apiUrl + `${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
  }

  async delete(book) {
    await fetch(this.apiUrl + `${book.id}`, {
      method: "DELETE",
      body: book,
    });
  }
}
