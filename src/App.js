import './App.css';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import React from "react";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializedSuccess} from "./Redux/app-reducer";
import Preloader from "./Components/Common/Preloader/Preloader";
import store from "./Redux/store-redux";
import {withSuspense} from "./Components/hoc/withSuspense";
import FriendsContainer from "./Components/Friends/FriendsContainer";
import NavContainer from "./Components/NavBar/NavContainer";
import {compose} from "redux";

const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializedSuccess()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavContainer/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Redirect exact from="/" to="/profile" />
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                        <Route path='/friends'
                               render={() => <FriendsContainer />}/>
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/users' render={withSuspense(UsersContainer)}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <div><b>404 NOT FOUND</b></div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializedSuccess})
)(App)

const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer {...props}/>
        </Provider>
    </BrowserRouter>
}

export default MainApp
