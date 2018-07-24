import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentDidMount() {
    const { history } = this.props
    this.props.signout(history);
  }

  render() {
    return <div>Sorry to see you go</div>;
  }
}

export default connect(null, actions)(Signout);
