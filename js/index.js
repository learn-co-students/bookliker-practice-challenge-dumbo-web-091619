document.addEventListener("DOMContentLoaded", function(event) {

	event.preventDefault()

	const book_list_ul = document.querySelector("#list-panel ul")
	const book_show_div = document.querySelector("#show-panel")

	fetch('http://localhost:3000/books')
	.then(response => response.json())
	.then((response_object) => {
		response_object.forEach((book) => {
			make_book_list(book)
		})
	})

	function make_book_list(book){
		let book_list_li = document.createElement("li")

		book_list_li.innerText = `${book.title}`

		book_list_li.addEventListener("click", (event) => {

			event.preventDefault()

			book_show_div.innerHTML = ""

			let book_title = document.createElement("h1")
			let book_img = document.createElement("img")
			let book_desc = document.createElement("p")
			let book_readers_ul = document.createElement("ul")

			let book_readers_array = book.users

			book_readers_ul.id = "reader-list"
			book_title.innerText = `${book.title}`
			book_img.src = `${book.img_url}`
			book_desc.innerText = `${book.description}`

			book_readers_array.forEach((reader) => {
				let book_readers_li = document.createElement("li")

				book_readers_li.innerText = `${reader.username}`

				book_readers_ul.append(book_readers_li)
			})

			book_show_div.append(book_title)
			book_show_div.append(book_img)
			book_show_div.append(book_desc)
			book_show_div.append(book_readers_ul)

			book_button(book)
		})

		book_list_ul.append(book_list_li)
	}

	function book_button(book){
		let button_element = document.createElement("button")
		button_element.innerText = "Read Book"

		button_element.addEventListener("click", (event) => {
			let current_user = fetch("http://localhost:3000/users/1")
			.then(user_response => user_response.json())
			.then((current_user) => {
				reader_update(book, current_user)
			})

			function reader_update(book, current_user){
				let found_user = false

				for(var i = 0; i < book.users.length; i++) {
					if (book.users[i].username == current_user.username) {
						found_user = true
						break
					}
				}

				if (found_user !== true) {
					let new_users = book.users.push(current_user)
					fetch(`http://localhost:3000/books/${book.id}`, {
						method: "PATCH",
						body: JSON.stringify({
							users: book.users
						}),
						headers: {
							"Content-Type": "application/json"
						}
					})
					.then(book_response => book_response.json())
					.then((response_object) => {
						reader_ul = document.querySelector("#reader-list")

						reader_ul.innerHTML = ""

						response_object.users.forEach((reader) => {
							let reader_li = document.createElement("li")

							reader_li.innerText = `${reader.username}`

							reader_ul.append(reader_li)
						})
					})
				} else {
					alert("You have already read this book.")
				}
			}
		})
	book_show_div.append(button_element)
	}
});
