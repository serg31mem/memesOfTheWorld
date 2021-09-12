import {connect} from "react-redux";
import Nav from "./Nav";
import {AppType} from "../../Redux/store-redux";
import {profileDataType} from "../../Types/types";

type mapStateToPropsType = {
    profileData: Array<profileDataType>
    isAuth: boolean
}

let mapStateToProps = (state: AppType): mapStateToPropsType => ({
    profileData: state.profilePage.profileData,
    isAuth: state.auth.isAuth,
})

export default connect (mapStateToProps)(Nav)