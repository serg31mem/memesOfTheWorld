import {connect} from "react-redux";
import Friends from "./Friends";

let mapStateToProps = (state) => {
    return {
        profileData: state.profilePage.profileData,
    }
}

export default connect (mapStateToProps)(Friends)