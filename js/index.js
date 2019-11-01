const bookList = document.querySelector('#list')
fetch('http://localhost:3000/books') //eslint-disable-line
  .then(response => response.json())
  .then(appendAllBooks)

function appendAllBooks (books) {
  for (const book of books) {
    appendBook(book)
  }
}

function appendBook (book) {
  createAndAppendElement('li', bookList, (element) => {
    element.dataset.book = book.id
    element.innerText = book.title
    element.addEventListener('click', (event) => {
      fetchBook(event.target.dataset.book).then(showBook)
    })
  })
}

function fetchBook (id) {
  return fetch(`http://localhost:3000/books/${id}`) //eslint-disable-line
    .then(response => response.json())
}

function showBook (book) {
  const showPanel = document.querySelector('#show-panel')
  showPanel.innerHTML = ''
  createAndAppendElement('h1', showPanel, (element) => { element.innerText = book.title })
  createAndAppendElement('img', showPanel, (element) => { element.src = book.img_url })
  createAndAppendElement('p', showPanel, (element) => { element.innerText = book.description })
  const userList = createAndAppendElement('ul', showPanel)
  appendUsersToList(book.users, userList)
  createAndAppendElement('button', showPanel, (element) => {
    element.dataset.book = book.id
    element.innerText = "Like!"
    element.addEventListener('click', likeBook)
  })
}

function appendUsersToList (users, list) {
  for (const user of users) {
    createAndAppendElement('li', list, (element) => {
      element.innerText = user.username
    })
  }
}

function likeBook (event) {
  const me = {
    id: '1',
    username: 'pouros'
  }
  const id = event.target.dataset.book
  fetchBook(id).then(book => {
    const userIds = book.users.map(user => user.id)
    if (!userIds.includes(me.id)) {
      book.users.push(me)
      updateUsersFor(book.id, book)
    } else {
      alert('Sorry- you have already liked the book!') //eslint-disable-line
    }
  })
}

function updateUsersFor (id, book) {
  fetch(`http://localhost:3000/books/${id}`, { //eslint-disable-line
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(book)
  }).then(response => response.json())
    .then(showBook)
}

function createAndAppendElement (tagName, parent, callback) {
  const element = document.createElement(tagName)
  parent.append(element)
  if (callback !== undefined) {
    callback(element)
  }
  return element
}
