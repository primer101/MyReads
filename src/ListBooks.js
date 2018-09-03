import React, { Component } from "react";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import Book from "./Book";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBook: PropTypes.func.isRequired
  };

  onChangeBook = (book, shelf, result, showToast) => {
    this.props.onChangeBook(book, shelf, result, showToast);
  };

  render() {
    return (
      <ol className="books-grid">
        {this.props.books &&
          this.props.books.sort(sortBy("title")).map(book => (
            <li key={book.id}>
              <Book book={book} onChangeBook={this.onChangeBook} />
            </li>
          ))}
      </ol>
    );
  }
}

export default ListBooks;
