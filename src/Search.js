import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";

class Search extends Component {
  state = {
    books: [],
    query: "linux"
  };

  componentDidMount() {
    BooksAPI.search(this.state.query).then(books => {
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="bookshelf">
        <div className="bookshelf-books">
          <ListBooks books={this.state.books} />
        </div>
      </div>
    );
  }
}

export default Search;
