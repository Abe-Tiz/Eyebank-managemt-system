import React from "react";
import Header from "../header/Header";
import Footer from "../footer/footer";
import "../../static/styles/awareness.css";

const EyeCareAwareness = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="eye-care-container">
        <h1 className="eye-care-title">Eye Care Awareness</h1>
        <p className="eye-care-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
          consectetur nulla, eget pellentesque dolor. Fusce sed felis consequat,
          dapibus lorem vel, tincidunt libero. Praesent ullamcorper tempor
          felis, eget sodales leo eleifend id. In hac habitasse platea dictumst.
          Aliquam erat volutpat. Aenean nec metus ut risus malesuada tempor. Sed
          vitae risus efficitur, aliquam ante quis, laoreet dui. Vivamus
          consectetur metus sed tellus aliquam mollis. Ut in elit eu erat
          tincidunt tristique.
        </p>
        <p className="eye-care-content">
          Maecenas sit amet scelerisque enim. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Nunc
          in enim et lectus volutpat bibendum. Fusce ut dapibus ex. In hac
          habitasse platea dictumst. Integer condimentum, nunc in auctor
          imperdiet, tortor quam lacinia neque, at rhoncus arcu dui non lectus.
          Nulla facilisi. Morbi at nulla eget ex luctus facilisis.
        </p>
        {/* Add more awareness content */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default EyeCareAwareness;
