import {connect} from "react-redux";
import Friends from "./Friends";
import {AppType} from "../../Redux/store-redux";
import { profileDataType } from "../../Types/types";

type mapStateToPropsType = {
    profileData: Array<profileDataType>
}

let mapStateToProps = (state: AppType): mapStateToPropsType => {
    return {
        profileData: state.profilePage.profileData,
    }
}

export default connect (mapStateToProps)(Friends)