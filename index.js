const axios = require("axios").default;
const waitForUserInput = require("wait-for-user-input");
const prompt = require("prompt-sync")();
class Publication {
  constructor(title, author, year) {
    if (!title || !year || !author) {
      throw new Error("Need to provide title, author and year correctly");
    }

    this.title = title;
    this.year = year;
    this.author = author;
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

    super(title, author, year);

    this.publisher = publisher;
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
    if (!journal || !volume) {
      throw new Error(
        "Need to give valid values of jounral, author and volume"
      );
    }

    super(title, author, year);
    this.journal = journal;
    this.volume = volume;
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
  constructor(title, author, year, url) {
    if (!url) {
      throw new Error("Invalid URL");
    }
    super(title, author, year);
    this.url = url;
  }

  isWebPage() {
    return this.isPublication() && this.url !== undefined;
  }

  citeAPA() {
    return `${this.title}. Retrieved ${this.year}, from ${this.url}.`;
  }

  citeMLA() {
    return `${this.title}. Web. ${this.url} ${this.year}.`;
  }
}

class ReferenceManager {
  constructor() {
    this.publications = [];
  }

  addPaper(title, author, year, journal, volume) {
    this.publications.push(new Paper(title, author, year, journal, volume));
  }

  addBook(title, author, year, publisher) {
    this.publications.push(new Book(title, author, year, publisher));
  }

  addWebsite(title, author, url, year) {
    this.publications.push(new WebPage(title, author, url, year));
  }

  printCitations(type) {
    console.clear();
    console.log("\n");
    for (let pub of this.publications) {
      if (type.toLowerCase() === "apa") console.log(pub.citeAPA() + "\n");
      else console.log(pub.citeMLA());
    }
  }

  removeCitation() {
    const firstElement = this.publications.shift();
    console.log("\n\nThe removed element is: " + JSON.stringify(firstElement));
  }

  async menuDrivenProgram() {
    let userInput = "";
    do {
      //   console.clear();
      console.log("\nPlease select an option from the menu below: \n");
      console.log("1. Add Book\n");
      console.log("2. Add Paper\n");
      console.log("3. Add Webpage\n");
      console.log("4. Display All Publications\n");
      console.log("5. Search for an author online\n");
      console.log("6. Delete Citation\n");
      console.log("7. Exit\n");
      // console.log("Enter your choice: ");
      // userInput = await this.getUserInput();
      // await
      await this.menusCalls(prompt("Enter your choice: "));
    } while (userInput !== "7");
  }

  async menusCalls(userInput) {
    let obj = {};
    switch (userInput) {
      case "1":
        console.clear();
        console.log("Please enter details for book:\n");

        // console.log("Enter Title: ");
        // obj = { ...obj, title: await this.getUserInput() };

        // console.log("\nEnter Author: ");
        // obj = { ...obj, author: await this.getUserInput() };

        // console.log("\nEnter Year: ");
        // obj = { ...obj, year: await this.getUserInput() };

        // console.log("\nEnter Publisher: ");
        // obj = { ...obj, publisher: await this.getUserInput() };

        obj = {
          title: prompt("Enter Title: "),
          author: prompt("Enter Author: "),
          year: prompt("Enter Year: "),
          publisher: prompt("Enter Publisher: "),
        };

        this.addBook(obj.title, obj.author, obj.year, obj.publisher);
        break;

      case "2":
        console.clear();
        console.log("Please enter details for Paper:\n");

        obj = {
          ...obj,
          title: prompt("Enter Title: "),
          author: prompt("Enter Author: "),
          year: prompt("Enter Year: "),
          journal: prompt("Enter Journal: "),
          volume: prompt("Enter Volume: "),
        };
        // console.log("Enter Title: ");
        // obj = { ...obj, title: await this.getUserInput() };

        // console.log("\nEnter Author: ");
        // obj = { ...obj, author: await this.getUserInput() };

        // console.log("\nEnter Year: ");
        // obj = { ...obj, year: await this.getUserInput() };

        // console.log("\nEnter Journal: ");
        // obj = { ...obj, journal: await this.getUserInput() };

        // console.log("\nEnter Volume: ");
        // obj = { ...obj, volume: await this.getUserInput() };

        console.log("my obj", obj);

        this.addPaper(obj.title, obj.author, obj.year, obj.journal, obj.volume);
        break;

      case "3":
        console.clear();
        console.log("Please enter details for Webpage:\n");

        // console.log("Enter Title: ");
        // obj = { ...obj, title: await this.getUserInput() };

        // console.log("\nEnter url: ");
        // obj = { ...obj, url: await this.getUserInput() };

        // console.log("\nEnter Year: ");
        // obj = { ...obj, year: await this.getUserInput() };

        obj = {
          ...obj,
          title: prompt("Enter Title: "),
          url: prompt("Enter URL: "),
          year: prompt("Enter Year: "),
          author: prompt("Enter Author: "),
        };

        this.addWebsite(obj.title, obj.author, obj.url, obj.year);
        break;

      case "4":
        console.clear();
        // console.log("\nEnter the type of Citation (APA/ MLA): ");
        this.printCitations(prompt("Enter the type of Citation (APA/ MLA): "));
        break;

      case "5":
        await this.getAuthor();
        break;

      case "6":
        this.removeCitation();
        break;

      case "7":
        process.exit();

      default:
        process.exit();
    }
  }

  async getUserInput() {
    let userInput = await waitForUserInput("");
    return userInput;
  }

  async getAuthor() {
    console.clear();
    // console.log("Search for Author (Enter spaces in name, if any)");
    let author = prompt("Search for Author (Enter spaces in name, if any) ");
    author = author.replaceAll(/ /g, "%20");

    let authorDetails = await axios.get(
      `https://openlibrary.org/search/authors.json?q=${author}`
    );

    console.log("authorDetails, ", authorDetails);

    // let authorData = authorDetails?.data?.docs || [];
    // console.log("authorDetails", authorData);

    await this.printAuthorDetails(authorDetails);
  }

  async printAuthorDetails(author) {
    if (
      author?.data &&
      author?.data?.numFound &&
      author?.data?.numFoundExact &&
      author?.data?.docs
    ) {
      let data = author?.data?.docs || [];
      data = data[0];
      console.clear();
      console.log("Here are the details of the author searched: \n");
      console.log("\nName: ", data?.name || "");
      console.log("\nTop Work: ", data?.top_work || "");
      console.log("\nWork Count: ", data?.work_count || "");
      console.log("\nBirth Date: ", data?.birth_date || "");
      console.log("\n\n");
    }
  }
}

// let bk = new Book("title", "author", "year", "publisher");
// bk.getUser();

let manager = new ReferenceManager();
manager.menuDrivenProgram();
// manager.getAuthor();
