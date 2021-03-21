import * as React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {authLogout} from "../../Redux/auth-reducer";

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userPhoto: state.auth.userPhoto,
        }
}

export default connect(mapStateToProps, {authLogout})(HeaderContainer)