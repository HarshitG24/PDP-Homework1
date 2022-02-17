# PDP-Homework1
This project is made by Harshit Bhavesh Gajjar

# Configuration Steps
* Clone this repository on your local machine
* Change directory to **PDP-Homework1** and open the project in your favourite editor, either VS Code or Sublime
* Run **npm install** or **yarn install** to install **node_modules** in the project. This step is mandatory for the project to work.
* To run the project, use the following command: **node index.js**
* Open the terminal in full size to view the output and responses and for better experience

# Packages used in the project
* [Axios](https://www.npmjs.com/package/axios) -> This is used to make HTTP Api calls in the project 
* [prompt-sync](https://www.npmjs.com/package/prompt-sync) -> To take user input during runtime

# Understading the Project
The project works with user input and no data is hard-coded. Use **node index.js** to start the project and it will bring various options to choose:
* Add Book
* Add Paper
* Add Webpage
* Displaying all the Publications
* Searching for the author online **[Unique feature]**
* Delete Publication/Citation
* Exit

# Delete Feature
In the option 6 of the menu driven program (Delete Publication/Citation), user can delete the citation of choice. User will be able to view all theb citations such as Books, pages and Webpages added and will be shown an unique integer id mapped against it. The ID entered by the user, that citation will be deleted permanently.

# Unique Feature
* Made a menu-driven program, based on command line input, wherein everything is dynamic and no data is hard coded
* In the menu, the option 5 asks the user to search for an author. The user inputs an author name and api call is made to fetch the details of author.
* The user enters name of an author of their choice.
* We make HTTP GET request api calls, to fetch details of an author, based on the input given by the user.
* If the api call is successful, we print the following information to the user
  * Name
  * Top Work
  * Count of work
  * Birth Date
* Spaces are allowed to be entered by the user (Eg. J K Rowling). The spaces are handled in the code.

### Behind the scenes for Unique Feature
* To implement this feature, we make a GET request to the following api: https://openlibrary.org/search/authors.json?q=AUTHOR_NAME
* We make the use of Axios library to make the api call and the name of author from the user input is sent as query parameter
* Api documentation can be found [Here](https://openlibrary.org/dev/docs/api/authors)

