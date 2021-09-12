import * as React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {authLogout, authMe} from "../../Redux/auth-reducer";
import {AppType} from "../../Redux/store-redux";

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
    userPhoto: string | null
}
type mapDispatchToPropsType = {
    authLogout: () => void
}
type PropsType = mapStateToPropsType & mapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state: AppType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userPhoto: state.auth.userPhoto,
    }
}

export default connect(mapStateToProps, {authLogout})(HeaderContainer)