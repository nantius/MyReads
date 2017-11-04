import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar'
import Shelf from './Shelf'


class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      books: []
    }
  }

  onBookUpdate = (e,book) => {
    //Updates book information
    BooksAPI.update(book, e.target.value)
    //Retrieves all books
    .then(() => (BooksAPI.getAll()
    //Updates app state with updated book info
    .then(books =>{this.setState({books})})))   
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books =>{this.setState({books})})
  }

  render() {

    const { books } = this.state;
    const shelves = [
      {title: 'Currently Reading', shelf: 'currentlyReading'},
      {title: 'Want to Read', shelf: 'wantToRead'},
      {title: 'Read', shelf: 'read'}
    ]

    return (
      <div className="app">
        
        <Route exact path="/search" render={() => (
            <SearchBar 
              books={books}
              onBookUpdate={this.onBookUpdate}
            />
        )} />

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        {shelves.map(shelf => {
          //filters books by shelf before passing them
          const filteredBooks = books.filter(book => (book.shelf === shelf.shelf))

          return(
            <Route exact path="/" key={shelf.title} render={() => (
              <Shelf
                onBookUpdate={this.onBookUpdate}
                title={shelf.title}
                books={filteredBooks}         
              />
            )}/>
          )
        })}
      </div>
    )
  }
}

export default BooksApp