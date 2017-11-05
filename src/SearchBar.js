import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Debounce } from 'react-throttle';

class SearchBar extends React.Component {

    state = {
        foundBooks : []     
    }

    searchBooks = (query) => {
        const { value: text} = query.target

        if(text.length < 3) return 

        BooksAPI.search(text.trim(),20)
        .then(foundBooks => this.setState({foundBooks}))
    }

    render(){
        // console.log('SearchBar rendering')
        const {foundBooks} = this.state
        // console.log(foundBooks)
        const {books, onBookUpdate} = this.props

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                         <Debounce time="400" handler="onChange">
                            <input 
                                type="text" 
                                placeholder="Search by title or author"
                                onChange={this.searchBooks}
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
                                                onBookUpdate={onBookUpdate} 
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