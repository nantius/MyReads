import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Debounce } from 'react-throttle';

class SearchBar extends React.Component {

    state = {
        foundBooks : []     
    }

    searchBooks = (query) => {
        const text = query.target.value 
        BooksAPI.search(text,20).then(books => this.setState({foundBooks:books}))
    }

    render(){

        const {foundBooks} = this.state
        const {books} = this.props

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                         <Debounce time="400" handler="onChange">
                            <input 
                                type="text" 
                                placeholder="Search by title or author"
                                onChange={(event) => this.searchBooks(event)}
                            />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            foundBooks.map((foundBook,key) => {
                            // searches for matching books between the searched ones and the state ones
                            const sameBook = books.filter(book =>(book.id === foundBook.id))
                            // assigns shelf to the searched book before being displayed
                            sameBook[0] && (foundBook.shelf = sameBook[0].shelf)
                            return (
                                        <li key={key}>
                                            <Book 
                                                onBookUpdate={this.props.onBookUpdate} 
                                                book={foundBook}  
                                            />
                                        </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}
export default SearchBar;