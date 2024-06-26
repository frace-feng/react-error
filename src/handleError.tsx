import React from "react";
import DefaultErrorBoundary from "./GlobalErrorBoundary.tsx";

const CatchReactError = function (props) {
  const { Boundary = DefaultErrorBoundary, InnerComponent, ...others } = props;
  return (
    <Boundary {...others}>
      <InnerComponent {...others} />
    </Boundary>
  );
};

export default CatchReactError;
