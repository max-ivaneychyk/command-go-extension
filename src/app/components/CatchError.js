import {ErrorBoundary} from "react-error-boundary";
import NotificationMessage from "./NotificationMessage";
import React from "react";


function fallbackRender({error}) {
  console.error(error);

  return (
    <NotificationMessage>
      <p className={'flex flex-col '}>
        <span>Something went wrong:</span>
        <span>{error.message}</span>
      </p>
    </NotificationMessage>
  );
}


const CatchError = ({children}) => (
  <ErrorBoundary
    fallbackRender={fallbackRender}>
    {children}
  </ErrorBoundary>
)

export default CatchError
