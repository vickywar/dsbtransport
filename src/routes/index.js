

import Loader from 'components/Loader';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ContentPage from 'screens/content';
import Header from 'screens/header';
import Login from 'screens/login';
import ProtectedRoute from './protectedroute';
import './styles.scss';

const MainRouter = () => {

    const isDataLoaded = true;

    return (
        isDataLoaded ?
            (< Router >
                <Switch>
                    <Route path="/login" component={Login} />
                    <div className="dashboard">
                        <div className="header">
                            <Header />
                        </div>
                        <div className="content">
                            <ProtectedRoute exact path="/dashboard" component={ContentPage} />
                            <Redirect exact from="/" to="/dashboard" />
                        </div>
                    </div>
                </Switch>
            </Router >) : (<Loader />)

    );
};

export default MainRouter;