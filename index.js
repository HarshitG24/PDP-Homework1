class Publication {
  constructor(title, year, author, publisher, location, year) {
    // check if both the values of title and year are valid
    if (!title || !year) {
      throw new Error("Need to provide title and year correctly");
    }

    this.title = title;
    this.year = year;
  }

  isPublication() {
    return this.title === undefined && this.year === undefined;
  }
}

class Book extends Publication {
  constructor(title, year, author, publisher) {
    if (!publisher || !author) {
      throw new Error("A valid publisher & author is needed to create a book");
    }

    super(title, year);

    this.publisher = publisher;
    this.author = author;
  }

  isBook() {
    return (
      this.isPublication() &&
      this.publisher !== undefined &&
      this.author !== undefined
    );
  }

  citeAPA() {
    return `${this.author} (${this.year}). ${this.title}. ${this.publisher} `;
  }

  citeMLA() {
    return `${this.author}. ${this.title}. ${this.publisher}. ${this.year}`;
  }
}

class Paper extends Publication {
  constructor(title, author, year, journal, volume) {
    if (!journal || !volume || !author) {
      throw new Error(
        "Need to give valid values of jounral, author and volume"
      );
    }

    super(title, year);
    this.journal = journal;
    this.volume = volume;
    this.author = author;
  }

  isPaper() {
    return (
      this.isPublication() &&
      this.journal !== undefined &&
      this.volume !== undefined &&
      this.author !== undefined
    );
  }

  citeAPA() {
    return `${this.author} (${this.year}). ${this.title}. ${this.journal} : ${this.volume} `;
  }

  citeMLA() {
    return `${this.author}. ${this.title}. ${this.journal} : ${this.volume}. ${this.year}`;
  }
}

class WebPage extends Publication {
  constructor(title, year, url, date) {
    if (!url || !date) {
      throw new Error("Invalid URL");
    }
    super(title, year);
    this.url = url;
    this.date = date;
  }

  isWebPage() {
    return (
      this.isPublication() && this.url !== undefined && this.date !== undefined
    );
  }

  citeAPA() {
    return `${this.title}. Retrieved ${this.date}, from ${this.url}.`;
  }

  citeMLA() {
    return `\${this.title}. Web. ${this.date} <this.url>.`;
  }
}
