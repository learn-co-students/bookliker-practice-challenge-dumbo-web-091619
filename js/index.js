document.addEventListener("DOMContentLoaded", function() {
    const bookList = document.getElementById("list")
    const showPanel = document.getElementById("show-panel")

    const allBooks = async () => {
        let response = await fetch('http://localhost:3000/books')
        let books = await response.json()
        books.forEach(book => {
            console.log(book)
            appendBook(book)
        })
    }

    const appendBook = (book) => {
        let bookLi = document.createElement("li")
        bookLi.innerText = book.title
        bookLi.addEventListener("click", () =>{
            let child = showPanel.lastElementChild  
            while (child) { 
                showPanel.removeChild(child); 
                child = showPanel.lastElementChild 
            } 
            displayBook(book)
        })
        bookList.appendChild(bookLi)
    }

    const displayBook = (book) => {
        let displayDiv = document.createElement("div")
        
        let bookTitle = document.createElement("h2")
        bookTitle.innerText = book.title
        displayDiv.appendChild(bookTitle)

        let bookImg = document.createElement("img")
        bookImg.src = book.img_url
        displayDiv.appendChild(bookImg)

        let bookDesc = document.createElement("p")
        bookDesc.innerText = book.description
        displayDiv.appendChild(bookDesc)

        let bookLikers = document.createElement("ul")
        book.users.forEach(user => {
            let bookLiker = document.createElement("li")
            bookLiker.innerText = user.username
            bookLikers.appendChild(bookLiker)
        })
        displayDiv.appendChild(bookLikers)

        let likeButton = document.createElement("button")
        likeButton.innerText = "Like This Book!"
        displayDiv.appendChild(likeButton)

        likeButton.addEventListener("click", () => {
            let liNodes = bookLikers.getElementsByTagName("li")
            let likers = Array.from(liNodes)
            let likersUsernames = []
            likers.forEach(liker =>{
                likersUsernames.push(liker.innerText)
            })
          if (likersUsernames.includes("pouros")){
              likeButton.innerText = "Like This Book"
            unLikeBook(book)
            let child = bookLikers.lastElementChild  
            while (child) { 
                bookLikers.removeChild(child); 
                child = bookLikers.lastElementChild 
            } 
            book.users.forEach(user => {
                let bookLiker = document.createElement("li")
                bookLiker.innerText = user.username
                bookLikers.appendChild(bookLiker)
            })
          } else  { 
            likeButton.innerText = "Unlike This Book"
            likeBook(book)
            let child = bookLikers.lastElementChild  
            while (child) { 
                bookLikers.removeChild(child); 
                child = bookLikers.lastElementChild 
            } 
            book.users.forEach(user => {
                let bookLiker = document.createElement("li")
                bookLiker.innerText = user.username
                bookLikers.appendChild(bookLiker)
            })
        }
        })

        showPanel.appendChild(displayDiv)
    }

    const likeBook = async (book) => {

        let user = {"id":1, "username":"pouros"}

        let users = book.users.push(user)
        console.log(users)

        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify({users})
        }

        let response = await fetch("http://localhost:3000/books/" + book.id, configObj)
        let updatedBookInfo = await response.json()
        console.log(updatedBookInfo)
    }

    const unLikeBook = async (book) => {

        book.users.pop()
        let users = book.users
        console.log(users)

        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify({users})
        }

        let response = await fetch("http://localhost:3000/books/" + book.id, configObj)
        let updatedBookInfo = await response.json()
        console.log(updatedBookInfo)
    }

    allBooks()



});
