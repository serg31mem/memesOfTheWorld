import {connect} from "react-redux";
import Nav from "./Nav";

let mapStateToProps = (state) => ({
    profileData: state.profilePage.profileData
})

export default connect (mapStateToProps)(Nav)