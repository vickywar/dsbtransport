

import React from 'react';
import './styles.scss';

const Loader = (props) => {

    const { loadingLabel } = props;

    return (
        <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <span>{loadingLabel ? loadingLabel : "Loading"}</span>
        </div>
    );
};

export default Loader;