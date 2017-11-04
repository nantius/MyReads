import React from 'react'
import PropTypes from 'prop-types'

BookOption.propTypes = {
    value: PropTypes.string,
    title: PropTypes.string,
    shelf: PropTypes.string,
}

function BookOption (props) {

    const {value, title, shelf} = props

    return(
            (
                shelf === value 
                ? <option disabled value={value}>{title}</option>
                : <option value={value}>{title}</option>
            )
    )
}

export default BookOption