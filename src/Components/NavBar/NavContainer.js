import {connect} from "react-redux";
import Nav from "./Nav";

let mapStateToProps = (state) => ({
    profileData: state.profilePage.profileData,
    isAuth: state.auth.isAuth,
})

export default connect (mapStateToProps)(Nav)