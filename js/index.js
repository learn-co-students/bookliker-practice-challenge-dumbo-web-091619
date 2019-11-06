// document.addEventListener("DOMContentLoaded", function() {
let bookList = document.querySelector('#list')
let showPanel = document.querySelector('#show-panel')
let user1 = {id: 1, username: 'pouros'}
let isTrue = true

// initial fetch of books
fetch("http://localhost:3000/books")
  .then(function(response) {
    return response.json();
  })
  .then(function(books){
    books.forEach(function(book){
      renderBooks(book)
    })
  })

  // Render the book/books
  function renderBooks(book){
    let newBookLi = document.createElement('li')
    newBookLi.innerText = book.title
    newBookLi.addEventListener('click', function(){
      addDetails(book)
      button(book)
    })
    bookList.append(newBookLi)
  }

  // Add the details of the book after click event
  function addDetails(book){

    let readButton = document.createElement('button')
    let bookImg = document.createElement('img')
    let bookTitle = document.createElement('h2')
    let bookDescription = document.createElement('h5')

    readButton.innerText = "Read Book"
    readButton.className = "like-button"
    showPanel.innerText = ""
    bookImg.src = book.img_url
    bookTitle.innerText = book.title
    bookDescription.innerText = book.description

    showPanel.append(bookTitle, bookImg, bookDescription, readButton)
    bookUsers(book)
  }




  // render the users of each book when read click event
  function bookUsers(books){

      books.users.forEach(function(user){
        let newDiv = document.createElement('div')
        let reader = document.createElement('li')
        reader.innerText = user.username
        newDiv.append(reader)
        showPanel.append(newDiv)
        })


  }



  function button(book){
    let buttonEve = document.querySelector('button')
    buttonEve.addEventListener('click', function(){
      if((book.users.map(user => user.username)).includes(user1.username)){
        alert("You already liked this book")
        isTrue = false
      } else {
        isTrue = true
        book.users.push(user1)
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
              'content-type': 'application/json',
              'accept': 'application/json'
            },
            body: JSON.stringify({
              users: book.users,
            })
          })
          .then((r) => r.json())
          .then(() => bookUsers(book))
          // delete everything in the  showpanel
          // then re call renderBooks and Book Users???
      }


    })

}
