import React, { Component } from 'react';

const style = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '460px',
  padding: '10px',
  background: '#555',
  color: 'white'
};

export default class DataViz extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;

    return (
      <div style={style}>
        <h5 style={{textAlign: 'center'}}>The Basket</h5>
        <pre style={{
          paddingBottom: '20px',
          border: 'none',
          background: '#555',
          color: 'white'
        }}>
          { JSON.stringify(data, null, 2) }
        </pre>
      </div>
    );
  }
}
