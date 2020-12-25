import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

function mapStateToProps(state: AppStateType) {
  return {
    isAuth: state.auth.isAuth
  }
}

type MapStateToPropsType = {
  isAuth: boolean
}

type MapDispatchToPropsType = {
}

// WCP - Wrapped Component Props
function withAuthRedirect<WCP> (Component: React.ComponentType<WCP>) {
  const RedirectComponent = (props: MapStateToPropsType & MapDispatchToPropsType) => {
    const {isAuth, ...restProps} = props
    if (!isAuth) {
      return <Redirect to='/login'/>
    }
    return (
      <Component {...restProps as WCP} />
    )
  }

  return connect<MapStateToPropsType, MapDispatchToPropsType, WCP, AppStateType>
  (mapStateToProps, {})
  (RedirectComponent)
};

export default withAuthRedirect
