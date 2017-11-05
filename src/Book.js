import React from 'react'
import BookOption from './BookOption'
import PropTypes from 'prop-types'

Book.propTypes = {
    onBookUpdate: PropTypes.func,
    book: PropTypes.object,
    title: PropTypes.string,
    shelf: PropTypes.string,
    authors: PropTypes.array
  }

function Book (props) {

    const {book,  onBookUpdate} = props
    const {title, authors, shelf, imageLinks} = props.book

    const bookOptions = [
        {value : 'currentlyReading', title: 'Currently Reading'},
        {value : 'wantToRead', title: 'Want To Read'},
        {value : 'read', title: 'Read'},
        {value : 'none', title: 'None'}
    ]

    return(
        <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.thumbnail ? imageLinks.thumbnail : imageLinks.smallThumbnail}")`}}></div>
            <div className="book-shelf-changer">

            <select defaultValue="move"  onChange={(e) => onBookUpdate(e, book)}>
                <option value="move" disabled>Move to...</option> 
                {bookOptions.map((option,key) => (
                    <BookOption key={key} shelf={shelf}  value={option.value} title={option.title} />
                ))}
            </select>

            </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
            {(authors === undefined ? true : authors)}           
        </div>
    </div>
    )
}

export default Book;
           






