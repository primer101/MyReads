import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    books: [],
    query: ""
    // query: "biography"
  };

  // componentDidMount() {
  //   BooksAPI.search(this.state.query).then(books => {
  //     this.setState({ books });
  //   });
  // }

  onChangeSearch = search => {
    this.setState({ query: search.trim() });
    BooksAPI.search(this.state.query).then(books => this.setState({ books }));
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.onChangeSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div className="bookshelf">
            <div className="bookshelf-books">
              {this.state.books && this.state.books.length > 0 ? (
                <ListBooks books={this.state.books} />
              ) : (
                "No books found"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
