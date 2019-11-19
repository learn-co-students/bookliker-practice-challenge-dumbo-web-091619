// document.addEventListener("DOMContentLoaded", function() {});

// function getBooks(){
//    return  fetch(`http://localhost:3000/books`)
//     .then(res => res.json())
    
// }

// getBooks().then((beerArr) => {
//     console.log(beerArr)
// })



//         description: "100 Shades of Sin... In The Billionaires, Calista Fox delivers a sexy and sensuous friends-to-lovers tale with a delicious love triangle twist. Jewel Catalano, Rogen Angelini, and Vin D'Angelo had been childhood best friends, spending every possible moment with one another. Rogen became her first love, the first one to show her what pleasure could be. Until a volatile feud erupted between their powerful California wine country families and she and Rogen were torn apart from each other. What she didn't expect was to find comfort and passion like she had never known in Vin's arms and bed. But when that too ended in disaster, Jewel moved to San Francisco to work for the Catalano empire. Years later, a series of daring acquisitions brings Jewel back to River Cross, the hometown where Rogen and Vin have recently returned as well. Jewel has the curves, the smarts, and the success to bring any man to his knees—especially the two men who remained best friends and still burn to possess her. Mixing family business with erotic pleasure ignites a smoldering love triangle. But in order to pull off the bold deal that will build the trios’ own legacy and to stay in their heady, sensual paradise, they must discover what true love really is—or lose everything their hearts' desire, in The Billionaires by Calista Fox."
// id: 8
// img_url: "http://books.google.com/books/content?id=dZs0DgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
// title: "The Billionaires"
// users: (3) [{…}, {…}, {…}]
        
let listDiv = document.querySelector('#list-panel')
let showDiv = document.querySelector('#show-panel')
let booksUl = document.querySelector('#list')



fetch(`http://localhost:3000/books`)
.then(res => res.json())
.then((bookArr) => {
    bookArr.forEach(book => {
        let bookLi = document.createElement('li')

        bookLi.innerText = book.title

        booksUl.append(bookLi)

        

        bookLi.addEventListener('click',(evt) => {
            // console.log(evt)
            showDiv.innerHTML = ''
            let bookTitle = document.createElement('h1')
            let bookImg = document.createElement('img')
            let bookDescP = document.createElement('p')
            let bookUserUl = document.createElement('ul')
            let bookLikeButton = document.createElement('button')

            bookLikeButton.innerText = "like"
            bookLikeButton.className = "like-btn"
            bookLikeButton.id = book.id
            bookTitle.innerText = book.title
            bookImg.src = book.img_url
            bookDescP.innerText = book.description
            
            
            
            book.users.forEach((user) => {
                let bookUserLi = document.createElement('li')

                bookUserLi.innerText = user.username

                bookUserUl.append(bookUserLi)
                
            })

            showDiv.append(bookTitle,bookImg,bookDescP,bookUserUl,bookLikeButton)

            bookLikeButton.addEventListener('click',(evt) => {
                console.log(evt.target)

                console.log(book.users)


                let user1 = {"id":1, "username":"pouros"}

                // let newUsersArr = book.users.push(user1)

                book.users.push(user1) // return value is the number of elements in array

                debugger

                fetch(`http://localhost:3000/books/${evt.target.id}`, {
                  method:'PATCH',
                 headers: { 
                     'Content-type': 'application/json'
                 },
                 body: JSON.stringify({
                     users: book.users
                  })
                })
                .then(res => res.json())
                .then((book) => {
                    // debugger
                    let newUser = book.users[book.users.length - 1].username

                    let bookUserLi = document.createElement('li')

                    bookUserLi.innerText = newUser

                    bookUserUl.append(bookUserLi)


                    
                })
            })
            
            
        })
    });
})


// fetch(`http://localhost:3000/books`)
// .then(res => res.json())
// .then((bookArr) => {
//     bookArr.forEach(book => {
//         let bookLi = document.createElement('li')
        // let bookImg = document.createElement('img')
        // let bookDescP = document.createElement('p')
        // let bookUserUl = document.createElement('ul')
        // let bookUserLi = document.createElement('li')

//         bookLi.innerText = book.title
//         bookImg.src = book.img_url
//         bookDescP.innerText = book.description

//         bookLi.append(bookImg,bookDescP,bookUserUl)

//         booksUl.append(bookLi)

//         listDiv.append(booksUl)

//         book.users.forEach((user) => {

//             let bookUserLi = document.createElement('li')
           
//             bookUserLi.innerText = user.username

//             bookUserUl.append(bookUserLi)
//         })




//     });

// })


