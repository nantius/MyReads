import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar'
import Shelf from './Shelf'

class BooksApp extends React.Component {

  state = {
      books: [],
      shelves: [
        {title: 'Currently Reading', shelf: 'currentlyReading'},
        {title: 'Want to Read', shelf: 'wantToRead'},
        {title: 'Read', shelf: 'read'}
      ]
  }

  onBookUpdate = (e, book) => {
    let updatedBook = book
    updatedBook.shelf = e.target.value
    //Updates book information
    BooksAPI.update(book, e.target.value)
    .then(() =>{
                let stateBooks = this.state.books
                // Creation of a new array without the book to be updated
                let filteredBooks = stateBooks.filter(bk => (book.id !== bk.id))
                // Adition of the updated book
                filteredBooks.push(updatedBook)
                // New state is set with the book updated
                this.setState({books : filteredBooks})       
    })
  }

  componentDidMount = () => {
    BooksAPI.getAll()
    .then(books =>{this.setState({books})})
  }

  render() {
    return (
      <div className="app">
        
        <Route exact path="/search" render={() => (
            <SearchBar 
              books={this.state.books}
              onBookUpdate={this.onBookUpdate}
            />
        )} />
      
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {
                this.state.shelves.map(shelf => (
                  <Shelf
                    key={shelf.title}
                    onBookUpdate={this.onBookUpdate}
                    title={shelf.title}
                    books={this.state.books.filter(book => (book.shelf === shelf.shelf))}         
                  />  
                ))
              }
          </div>
          )}
        /> 
      </div>
    )
  }
}

export default BooksApp
