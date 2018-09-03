import React, { Component } from "react";
import PropTypes from "prop-types";
import { update } from "./BooksAPI";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeBook: PropTypes.func.isRequired
  };

  updateBook = shelf => {
    update(this.props.book, shelf)
      .then(res => {
        console.log(res);
        this.props.onChangeBook(this.props.book, shelf, "success", true);
      })
      .catch(error => {
        console.log("Error in Update", error);
        this.props.onChangeBook(this.props.book, shelf, "error", true);
      });
  };

  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                book.imageLinks && book.imageLinks.thumbnail
                  ? `url(${book.imageLinks.thumbnail})`
                  : "url('./img/Image-Not-Available.png')"
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.shelf || "none"}
              onChange={event => this.updateBook(event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title || "No title available"}</div>
        {book.authors ? (
          book.authors.map((author, index) => (
            <div className="book-authors" key={index}>
              {author}
            </div>
          ))
        ) : (
          <div className="book-authors">Authors Unknown</div>
        )}
      </div>
    );
  }
}

export default Book;
