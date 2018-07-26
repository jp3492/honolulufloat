import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import './auth.css'

class Signin extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.getUser(() => {
        this.props.history.push('/home')
      })
    })
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="authForm" onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Sign in</h3>
        <div>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </div>
        <div>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </div>
        <div>
          <a>{this.props.errorMessage}</a>
          <button>Sign In!</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Signin);
