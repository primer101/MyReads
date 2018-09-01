import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import { Link } from "react-router-dom";

class BookShelf extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  onChangeBook = (book, shelf) => {
    this.setState((prevState, props) => ({
      books: prevState.books.map(item => {
        if (item.id === book.id) {
          item.shelf = shelf;
        }
        return item;
      })
    }));
  };

  render() {
    let currentReading = this.state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    let wantRead = this.state.books.filter(book => book.shelf === "wantToRead");
    let read = this.state.books.filter(book => book.shelf === "read");
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ListBooks
                books={currentReading}
                onChangeBook={this.onChangeBook}
              />
            </div>
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ListBooks books={wantRead} onChangeBook={this.onChangeBook} />
            </div>
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ListBooks books={read} onChangeBook={this.onChangeBook} />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelf;
