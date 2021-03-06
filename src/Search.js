import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import { Link } from "react-router-dom";
import { ToastContainer, ToastStore } from "react-toasts";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      query: ""
      // query: "biography",
    };
    this.booksSelected = [];
    this.booksOwned = [];
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.booksSelected = books;
        this.booksOwned.length = this.booksSelected.length;
        this.booksOwned.fill(false);
      })
      .catch(error => console.log("All error: " + error));
  }

  onChangeSearch = search => {
    this.setState({
      query: search.trimStart()
    });

    if (search === "") {
      this.setState({ books: [] }, () =>
        console.log("State updated: ", this.state)
      );
    } else {
      BooksAPI.search(this.state.query)
        .then(
          books =>
            books instanceof Array
              ? this.setState({ books }, () => {
                  console.log("State updated", this.state);
                  this.booksSelected.forEach(book => {
                    this.onChangeBook(book, book.shelf, "success", false);
                  });
                })
              : this.setState({ books: [] })
        )
        .catch(error => console.log("Search error: " + error));
    }
  };

  onChangeBook = (book, shelf, result, showToast) => {
    if (result === "success") {
      this.setState(prevState => ({
        books: prevState.books.map((item, index) => {
          if (item.id === book.id) {
            item.shelf = shelf;
            shelf && shelf !== "none"
              ? (this.booksOwned[index] = true)
              : (this.booksOwned[index] = false);
          }
          return item;
        })
      }));
      showToast &&
        ToastStore.success("The book was updated in your bookshelf. 👍");
    } else {
      showToast && ToastStore.error("There was an error updating the book. 😒");
    }
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
              {this.state.books.length > 0 ? (
                <ListBooks
                  books={this.state.books}
                  booksOwned={this.booksOwned}
                  onChangeBook={this.onChangeBook}
                />
              ) : (
                "No books found, try another search"
              )}
            </div>
          </div>
        </div>
        <ToastContainer
          store={ToastStore}
          position={ToastContainer.POSITION.TOP_RIGHT}
        />
      </div>
    );
  }
}

export default Search;
