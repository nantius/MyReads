import React from 'react'
import Book from './Book'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

Shelf.propTypes = {
    books: PropTypes.array,
    title: PropTypes.string
  }

function Shelf (props) {
   
    const {books, title} = props

    return(
            <div className="list-books-content">
                <div className="open-search">
                        <Link to="/search">Add a book</Link>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {  
                                books.map((book) => (                   
                                   <li key={book.title}>
                                        <Book books={books} onBookUpdate={props.onBookUpdate} book={book} />
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            </div>
       
    )
}

export default Shelf;