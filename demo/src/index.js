import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Frame from '../../src';

const styles = {
  frame: {
    border: 'none',
    width: '100%',
    height: '100%',
  },
  section: {
    width: '50%',
    height: '500px',
    backgroundColor: 'khaki',
    margin: 'auto',
  },
};

class FrameExample extends Component {
  state = { width: undefined, msg: undefined };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ msg: 'Re-rendered!' });
    }, 1000);
    this.document.defaultView.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    this.document.defaultView.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    this.setState({ width: this.document.body.clientWidth });
  };
  render() {
    return (
      <Frame
        documentRef={doc => {
          this.document = doc;
          this.onResize();
        }}
        title="iFrame example"
        style={styles.frame}
        head={
          <Fragment>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <style>{'body{margin: 0} h1{color:#7d2a96}'}</style>
          </Fragment>
        }
      >
        <h1>iframe-react Demo</h1>
        <p>{this.state.msg}</p>
        <p>width: {this.state.width}</p>
      </Frame>
    );
  }
}

class Demo extends React.Component {
  render() {
    return (
      <div>
        <section style={styles.section}>
          <FrameExample />
        </section>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
