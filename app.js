class Book{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class UI{
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href="#" class="btn btn-danger btn-sm delete">X</a></td> 
        `
        list.appendChild(row);
    }

    static showAlert(msg,className)
    {
        const div=document.createElement('div');
        div.className=`alert alert-${className} mt-2`;
        div.appendChild(document.createTextNode(msg));
        const container=document.querySelector(".container");
        const form=document.querySelector("#book-form");
        container.insertBefore(div,form);

        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 3000);
    }

    static deleteBook(element)
    {
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.querySelector("#title").value='';
        document.querySelector("#author").value='';
        document.querySelector("#isbn").value='';
    }
}

class Store{
    static getBooks()
    {
        let books=localStorage.getItem("books");
        if(books===null)
            books=[];
        else{
            books=JSON.parse(books);
        }
        return books;
    }

    static addBook(book)
    {
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }

    static removeBook(isbn)
    {
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn)
                books.splice(index,1);
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded',UI.displayBooks);

document.querySelector('#book-form').addEventListener("submit", (e) => {
    e.preventDefault();
    
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

    if(title=='' || author=='' || isbn=='')
    {
        UI.showAlert('Please fill all the box','danger');
    }
    else{

        const book=new Book(title,author,isbn);
        // console.log(book);
        UI.addBookToList(book);
       
        Store.addBook(book);

        UI.showAlert('Book Added Succesfully','success');
  
        UI.clearFields();
    }
});

document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
   
    // To get isbn of delete button clicked
    const isbn=e.target.parentElement.previousElementSibling.textContent;
    Store.removeBook(isbn);
    
    UI.showAlert('Book Deleted Succesfully','success');
  
});