/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import PageNotFound2 from "../../../src/assets/404-error.jpg";
import "./style.scss";

class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <div class="text-center">
          <div class="image-container">
            <img src={PageNotFound2} class="rounded" alt="..." />
            <Link to="/" class="image-link">
              Go Home
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default NotFoundPage;
