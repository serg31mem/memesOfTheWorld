import {connect} from "react-redux";
import Footer from "./Footer";
import {AppType} from "../../Redux/store-redux";

type mapStateToPropsType = {
    isAuth: boolean
}

let mapStateToProps = (state: AppType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
})

export default connect (mapStateToProps)(Footer)