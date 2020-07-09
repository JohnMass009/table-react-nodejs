import React from 'react';
import {ErrorIndicator} from "components/error-indicator";

export class ErrorBoundry extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({hasError: true});
  }
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator errorMessage={this.state.hasError} />;
    }
    return this.props.children;
  }
}