import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  };

  options = [
    {
      value: "currentlyReading",
      text: "Currently Reading"
    },
    {
      value: "wantToRead",
      text: "Want To Read"
    },
    {
      value: "read",
      text: "Read"
    },
    {
      value: "none",
      text: "None"
    }
  ];

  state = {
    status: this.props.book.shelf || "none" // 'currentlyReading' || 'wantToRead' || 'read' || none */
  };

  render() {
    const { book } = this.props;
    const { status } = this.state;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                /* 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' */
                `url(${book.imageLinks.thumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>
                Move to...
              </option>
              {this.options.map((option, index) => (
                <option
                  key={index}
                  value={option.value}
                  selected={
                    option.value === this.state.status ? "selected" : ""
                  }
                >
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
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
