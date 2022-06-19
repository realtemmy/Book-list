//Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
};

//Ui Constructor
function UI(){

}

//Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row)
}

//Delete list
UI.prototype.deleteList = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//Show alerts
UI.prototype.showAlert = function(message, className){
    //create div
    const div = document.createElement('div')
    //Add class
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 3 secs
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)
}

//Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', 
function(e){
    e.preventDefault();
    //Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    //instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === ''){
        //Error alert
        ui.showAlert('Please fill in all fields', 'error')
    }else{
        //Clear fields
        ui.clearFields();

        //show success
        ui.showAlert('Book Added!', 'success')

        // Add book to list
        ui.addBookToList(book);
    }
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    e.preventDefault();

    //Instantiate UI
    const ui = new UI();

    //show message
    ui.showAlert('Book removed', 'success')

    //delete list
    ui.deleteList(e.target);
    
});

