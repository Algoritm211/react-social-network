import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth
  }
}

const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render () {
      if (!this.props.isAuth) {
        return <Redirect to='/login' />
      }
      return (
        <Component {...this.props} />
      )
    }
  }
  return connect(mapStateToProps)(RedirectComponent)
};

export default withAuthRedirect
