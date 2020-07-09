import React from 'react';
const {Provider, Consumer} = React.createContext();

class AppProvider extends React.Component {
  render() {
    return (
      <Provider value={{...this.props.state}}>
        {this.props.children}
      </Provider>
    );
  }
}

export {AppProvider, Consumer as AppConsumer};