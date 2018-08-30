import React, { Component } from "react";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import Book from './Book';

ListBooks = props => {
  return {props.books.map(book => (
    <li key={book.id}>
      <Book book={book} />
    </li>
  ))}

export default ListBooks;
