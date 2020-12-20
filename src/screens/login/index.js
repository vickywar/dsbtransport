

import TextField from 'components/TextField';
import React from 'react';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmail, getPassword, signInFunc } from 'reduxstore/actions';
import Loader from 'components/Loader';

const Login = () => {

    const email = useSelector(state => state.auth.email);
    const password = useSelector(state => state.auth.password);
    const isloggedin = useSelector(state => state.auth.isloggedin);
    const isloading = useSelector(state => state.auth.isLoading);
    const dispatch = useDispatch();
    const history = useHistory();


    const textfieldstyle = {
        color: 'black'
    }

    const registerChange = (fieldname, text) => {
        fieldname === "email" ? dispatch(getEmail(text)) : dispatch(getPassword(text))
    }

    const loginFunc = () => {
        dispatch(signInFunc(email, password));
    }

    const handleKeyPressHandler = (event) => {
        if (event.keyCode === 13) {
            loginFunc();
        }
    }

    const returnLoggedInPageOrDashboard = () => {
        if (isloading) {
            return <Loader loadingLabel="Checking authentication status .. Please wait" />
        } else if (isloggedin) {
            history.replace("/dashboard");
            return null;
        } else {
            return (
                <div className="loginpagecontainer">
                    <div className="rightBottom"></div>
                    <div className="leftTop"></div>
                    <div className="logincredsContainer">
                    <div className="rightBottomInside"></div>
                        <div className="logincreds">
                            <div className="title">
                                <div className="title1">DSB</div>
                                <div className="title2">Transport</div>
                            </div>
                            <TextField
                                type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => registerChange("email", e)}
                                isIconRequired={false}
                                style={textfieldstyle}
                            />
                            <TextField
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => registerChange("password", e)}
                                isIconRequired={true}
                                style={textfieldstyle}
                                onKeyDown={handleKeyPressHandler}
                            />
                            <button className="loginbtn" onClick={loginFunc}>Login</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        returnLoggedInPageOrDashboard()
    );
};

export default Login;