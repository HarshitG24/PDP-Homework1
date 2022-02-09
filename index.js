class Publication {
  constructor(title, year) {
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
  constructor(title, year, url) {
    if (!url) {
      throw new Error("Invalid URL");
    }
    super(title, year);
    this.url = url;
  }

  isWebPage() {
    return this.isPublication() && this.url !== undefined;
  }

  //   formatDate(date = new Date()) {
  //     let dt = new Date(date);
  //     let dateString =
  //       `${dt.getMonth() + 1}` + "/" + dt.getDate() + "/" + dt.getFullYear();
  //     console.log(dateString);
  //   }

  citeAPA() {
    return `${this.title}. Retrieved ${this.year}, from ${this.url}.`;
  }

  citeMLA() {
    return `${this.title}. Web. ${this.url} ${this.year}.`;
  }
}

class PublicationManager {
  constructor() {
    this.publications = [];
  }

  addPaper(title, author, year, journal, volume) {
    this.publications.push(new Paper(title, author, year, journal, volume));
  }

  addBook(title, author, year, publisher) {
    this.publications.push(new Book(title, author, year, publisher));
  }

  addWebsite(title, url, year) {
    this.publications.push(new WebPage(title, url, year));
  }

  printCitations(type) {
    for (let pub of this.publications) {
      if (type === "APA") console.log(pub.citeAPA());
      else console.log(pub.citeMLA());
    }
  }
}

const manager = new PublicationManager();
manager.addBook("a", "b", "c", "d", "e", "f");

manager.addBook("Rationality", "Christopher", 2021, "Oveja Negra");

manager.addWebsite(
  "Programming Paradigms",
  "https://course.ccs.neu.edu/cs5010f18/lecture1.html",
  2005,
  new Date()
);
manager.printCitations("APA");
