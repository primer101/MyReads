import React, { Component } from "react";
import PropTypes from "prop-types";
import { update } from "./BooksAPI";
import StarRatingComponent from "react-star-rating-component";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRating: false,
      rating: 0,
      bookOwned: false
    };
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    bookOwned: PropTypes.bool,
    onChangeBook: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.setState({
      rating: this.props.book.averageRating || 0
    });
  }

  updateBook = shelf => {
    update(this.props.book, shelf)
      .then(res => {
        console.log(res);
        this.props.onChangeBook(this.props.book, shelf, "success", true);
      })
      .catch(error => {
        console.log("Error in Update", error);
        this.props.onChangeBook(this.props.book, shelf, "error", true);
      });
  };

  onRatingChange = () => this.setState({ showRating: true });

  onStarClick = (nextValue, prevValue, name) =>
    this.setState(
      {
        rating: nextValue
      },
      () => {
        this.props.book.averageRating = this.state.rating;
        this.updateBook(this.props.book.shelf || "none");
      }
    );

  closeRatingsStars = () =>
    this.state.showRating && this.setState({ showRating: false });

  render() {
    const { book } = this.props;
    const bg = require("./icons/Image-Not-Available.png");
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                book.imageLinks && book.imageLinks.thumbnail
                  ? `url(${book.imageLinks.thumbnail})`
                  : `url(${bg})`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.shelf || "none"}
              onChange={event => this.updateBook(event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
          <div
            className="book-rating-changer"
            onMouseLeave={this.closeRatingsStars}
          >
            <span>{this.state.rating}</span>
            <button onClick={this.onRatingChange} />
            {this.state.showRating && (
              <div
                style={{
                  position: "absolute",
                  fontSize: 24,
                  top: -15,
                  left: 10,
                  width: 120
                }}
              >
                <StarRatingComponent
                  name="app5"
                  value={this.state.rating}
                  onStarClick={this.onStarClick}
                />
              </div>
            )}
          </div>
          {this.props.bookOwned && <div className="book-owned" />}
        </div>
        <div className="book-title">{book.title || "No title available"}</div>
        {book.authors ? (
          book.authors.map((author, index) => (
            <div className="book-authors" key={index}>
              {author}
            </div>
          ))
        ) : (
          <div className="book-authors">Authors Unknown</div>
        )}
      </div>
    );
  }
}

export default Book;
