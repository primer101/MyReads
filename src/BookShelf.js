import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import { Link } from "react-router-dom";

class BookShelf extends Component {
  state = {
    currentReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    this.onChangeBook();
  }

  onChangeBook = () => {
    BooksAPI.getAll().then(books =>
      this.setState({
        currentReading: books.filter(book => book.shelf === "currentlyReading"),
        wantToRead: books.filter(book => book.shelf === "wantToRead"),
        read: books.filter(book => book.shelf === "read")
      })
    );
  };

  render() {
    const { currentReading, wantToRead, read } = this.state;
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
              <ListBooks books={wantToRead} onChangeBook={this.onChangeBook} />
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
