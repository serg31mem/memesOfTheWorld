import {connect} from "react-redux";
import Footer from "./Footer";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default connect (mapStateToProps)(Footer)