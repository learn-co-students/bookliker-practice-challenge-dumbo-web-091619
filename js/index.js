const sampleUser = { id: 1, username: "pouros"}
const bookList = document.querySelector("#list")
const showDiv = document.querySelector("#show-panel")

document.addEventListener("DOMContentLoaded", function() {

// Fetch the books
fetch(`http://localhost:3000/books`)
// Turn response into a js obj
.then(response => response.json())
// then add response to DOM
.then((responseArray) => {
    for (const book of responseArray) {
        appendBook(book)
    }
})

// HELPER FUNCTIONS
// appendBook
    function appendBook(book){
        // Create and append book title
        let bookLi = document.createElement("li")
        bookLi.setAttribute("id", book.id)
        bookLi.innerText = book.title
        bookList.append(bookLi)
        // Add eventListener to each book
        bookLi.addEventListener("click", (event) => {
            fetch(`http://localhost:3000/books/${book.id}`)
            .then(resp => resp.json())
            .then(showBook)
        })
    }
    
    // showBook
    function showBook(book){
        // Image of the book
        let bookImg = document.createElement("img")
        bookImg.setAttribute("src", book.img_url)
        // append image
        let booksShowLi = document.createElement("li")
        booksShowLi.append(bookImg)
        showDiv.append(booksShowLi)
        // Book Description
        let bookDesc = document.createElement("p")
        bookDesc.innerText = book.description
        showDiv.append(bookDesc)

        // Book users
        let likeButton = document.createElement("button")
        likeButton.setAttribute("class", "like-button")
        likeButton.setAttribute("id", book.id)
        likeButton.innerText = "like book"
        showDiv.append(likeButton)
        likeButton.addEventListener('click', (event) => {
            if ((book.users.map(user => user.username)).includes(sampleUser.username)){
                alert("You already liked this book")
            } else {
                book.users.push(sampleUser)
                updateUsers(book)
            }
        })
        showUsers(book)
    }
    
    // Update BookUsers
    function updateUsers(book){
        // Do a "PATCH" fetch request with updated users list to update book users
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "users": book.users
            })
        })
        .then(resp => resp.json())
        .then((book) => {
            // then display updated list
            let updatedUserLi = document.createElement("li")
            updatedUserLi.innerText = sampleUser.username
            usersUl = document.getElementById("users-list")
            usersUl.append(updatedUserLi)
            // showUsers(book)
        })
    }

    // Show users
    function showUsers(book){
        // create and append header
        let userListHeading = document.createElement("h3")
        userListHeading.innerText = "Users who like this book"
        showDiv.append(userListHeading)
        // create a users ul, iterate through the users and append them
        let usersUl = document.createElement("ul")
        usersUl.setAttribute("id", "users-list")
        for (const user of book.users) {
            let userLi = document.createElement("li")
            userLi.innerText = user.username
            usersUl.append(userLi)
        }
        showDiv.append(usersUl)
    }


});
