

import React from 'react';
import './styles.scss';
import { userLogout } from 'reduxstore/actions/auth/auth';
import { showModal } from 'reduxstore/actions/getdetails/getdetails';
import { useDispatch } from 'react-redux';

const Header = () => {

    const dispatch = useDispatch();

    const logoutFunc = () => {
        dispatch(userLogout());
    }

    const addDetails = (modalname) => {
        const addDetailPayload = {
            modalState: true,
            modalType: modalname
        };
        dispatch(showModal(addDetailPayload));
    };

    return (
        <div className="headerCont">
            <div className="titleCont">
                <div className="title1">DSB</div>
                <div className="title2">Transport</div>
            </div>
            <div className="navigators">
                <p className="newcustomer" onClick={() => { addDetails("customer") }}>+ Add new Customer</p>
                <p className="newdriver" onClick={() => { addDetails("driver") }}>+ Add new Driver</p>
                <p className="newdriver" onClick={() => { addDetails("transaction") }}>+ Add new Transaction</p>
                <p className="settings" onClick={logoutFunc}>Logout</p>
            </div>
        </div>
    );
};

export default Header;