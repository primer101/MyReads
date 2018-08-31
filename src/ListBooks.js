import React, { Component } from "react";
// import PropTypes from "prop-types";
import sortBy from "sort-by";
import Book from "./Book";

function ListBooks(props) {
  return (
    <ol className="books-grid">
      {props.books.sort(sortBy("title")).map(book => (
        <li key={book.id}>
          <Book book={book} />
        </li>
      ))}
    </ol>
  );
}

export default ListBooks;
