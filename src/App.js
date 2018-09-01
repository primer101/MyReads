import React from "react";
import "./App.css";
import BookShelf from "./BookShelf";
import Search from "./Search";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookShelf} />
        <Route path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp;
