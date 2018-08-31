import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";

class BookShelf extends Component {
  state = {
    currentReading: [],
    wantRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        currentReading: books.filter(book => book.shelf === "currentlyReading"),
        wantRead: books.filter(book => book.shelf === "wantToRead"),
        read: books.filter(book => book.shelf === "read")
      });
    });
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ListBooks books={this.state.currentReading} />
        </div>
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ListBooks books={this.state.wantRead} />
        </div>
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ListBooks books={this.state.read} />
        </div>
      </div>
    );
  }
}

export default BookShelf;
