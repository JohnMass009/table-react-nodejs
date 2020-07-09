import React from "react";

export const ErrorIndicator = ({errorMessage}) => {

  return (
    <div className="error">
      {errorMessage}
    </div>
  );
}