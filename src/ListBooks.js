import React, { Component } from "react";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import Book from "./Book";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    booksOwned: PropTypes.array,
    onChangeBook: PropTypes.func.isRequired
  };

  onChangeBook = (book, shelf, result, showToast) => {
    this.props.onChangeBook(book, shelf, result, showToast);
  };

  render() {
    return (
      <ol className="books-grid">
        {this.props.books &&
          this.props.books.sort(sortBy("title")).map((book, index) => (
            <li key={book.id}>
              <Book
                book={book}
                onChangeBook={this.onChangeBook}
                bookOwned={
                  this.props.booksOwned
                    ? this.props.booksOwned[index] || false
                    : false
                }
              />
            </li>
          ))}
      </ol>
    );
  }
}

export default ListBooks;
