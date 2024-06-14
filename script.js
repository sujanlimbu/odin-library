//Elements
const newBookBtn = document.getElementById('new-book-btn');
const formPopup = document.getElementById('form-popup');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-form');
const newBookForm = document.getElementById('new-book-form');

//Event listener
newBookBtn.addEventListener('click', openForm);
closeBtn.addEventListener('click', closeFormPopup);
newBookForm.addEventListener('submit', function(event){
    event.preventDefault();

    const formData = new FormData(newBookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read');
    addBookToLibrary(title, author, pages, read);

    alert('New book added!')
    listBooks();
    
    newBookForm.reset();
    closeFormPopup();
});

function closeFormPopup() {
    formPopup.style.display = 'none';
    overlay.style.display = 'none';
}

function openForm() {
    formPopup.style.display = 'block';
    overlay.style.display = 'block';
}

const myLibrary = [];

// myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, "No"));
// myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, "No"));

listBooks();

function listBooks() {
    const tableBody  = document.querySelector('#bookTable tbody');

    tableBody.innerHTML = '';

    if(myLibrary.length <= 0){
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.setAttribute('colspan', '6');
        emptyCell.classList.add('empty-row');
        emptyCell.textContent = "No books found."
        emptyRow.appendChild(emptyCell);
        tableBody.appendChild(emptyRow);
    }
    else{
        myLibrary.forEach((book, index) =>{
            const row = document.createElement('tr');
    
            const snCell = document.createElement('td');
            snCell.textContent = index+1;
            row.appendChild(snCell);
    
            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);
    
            const authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            row.appendChild(authorCell);
    
            const pageCell = document.createElement('td');
            pageCell.textContent = book.pages;
            row.appendChild(pageCell);
    
            const readCell = document.createElement('td');
            readCell.textContent = book.haveRead == 'Yes'? 'Read' : 'Not Read';
            row.appendChild(readCell);
    
            const actionCell = document.createElement('td');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('btn', 'btn-remove');
            removeBtn.dataset.bookIndex = index;
            removeBtn.addEventListener('click', removeBook);
            actionCell.appendChild(removeBtn);
            const changeReadBtn = document.createElement('button');
            changeReadBtn.textContent = 'Change Status';
            changeReadBtn.classList.add('btn', 'btn-change-status');
            changeReadBtn.dataset.bookIndex = index;
            changeReadBtn.addEventListener('click', changeStatus);
            actionCell.appendChild(changeReadBtn);
            row.appendChild(actionCell);
    
            tableBody.appendChild(row);
        });
    }
}

function changeStatus(event){
    const index = event.target.dataset.bookIndex;
    myLibrary[index].changeReadStatus();
    listBooks();
}

function removeBook(event){
    const index = event.target.dataset.bookIndex;
    myLibrary.splice(index, 1);
    console.log(myLibrary);
    listBooks();
}

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead === 'Yes' ? 'already read' : 'not read yet'}.`;
};

Book.prototype.changeReadStatus = function (){
    this.haveRead = (this.haveRead === 'Yes'? 'No' : 'Yes');
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    console.log(newBook.info());
    myLibrary.push(newBook);
    console.log(myLibrary);
}
