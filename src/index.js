import React, { Component, Fragment } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PropTypes from 'prop-types';

export default class Frame extends Component {
  static propTypes = {
    title: PropTypes.string,
    head: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    frameRef: PropTypes.func,
    documentRef: PropTypes.func,
  };
  static defaultProps = {
    title: undefined,
    head: undefined,
    frameRef: undefined,
    documentRef: undefined,
  };
  componentDidMount() {
    const doc = this.frame.contentDocument;
    this.frameRoot = doc.createElement('div');
    doc.body.appendChild(this.frameRoot);

    this.renderContent();

    if (typeof this.props.documentRef === 'function') {
      this.props.documentRef(doc);
    }
  }
  componentDidUpdate() {
    this.renderContent();
  }

  componentWillUnmount() {
    const doc = this.frame.contentDocument;

    unmountComponentAtNode(doc.head);
    unmountComponentAtNode(this.frame);
  }

  renderContent = () => {
    const doc = this.frame.contentDocument;
    const head = this.props.head;
    if (head != null) {
      render(head, doc.head);
    }
    render(<Fragment>{this.props.children}</Fragment>, this.frameRoot);
  };
  frameRef = f => {
    if (f != null) {
      this.frame = f;
    }
    if (typeof this.props.frameRef === 'function') {
      this.props.frameRef(this.frameRoot);
    }
  };
  render() {
    const { title, style } = this.props;
    return <iframe ref={this.frameRef} title={title} style={style} />;
  }
}
