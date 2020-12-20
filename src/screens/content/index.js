

import React, { useEffect, useState } from 'react';
import DataSide from './dataside';
import Filter from './filter';
import './styles.scss';
import { useRouteMatch, Route } from 'react-router-dom';
import NewModal from './newmodal';
import firebasehandler from "firebaseconfig";
import { useSelector } from 'react-redux';

const ContentPage = () => {

    const match = useRouteMatch();
    const addDetails = useSelector(state => state.adddetails.addingType);
    const { modalType, shouldShowModal } = addDetails;

    const [customers, setCustomers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [transaction, setTransaction] = useState([]);


    const db = firebasehandler.firestore();

    useEffect(() => {
        const customerData = db.collection('customer');
        const custsubscribe = customerData.onSnapshot((snap) => {
            setCustomers(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        return () => custsubscribe();
    }, [])

    useEffect(() => {
        const driverData = db.collection('driver');
        const drivsubscribe = driverData.onSnapshot((snap) => {
            setDrivers(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        return () => drivsubscribe();
    }, [])

    useEffect(() => {
        const transactionData = db.collection('transaction');
        const transsubscribe = transactionData.onSnapshot((snap) => {
            setTransaction(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        return () => transsubscribe();
    }, [])

    return (
        <div className="contentcont">
            <Route path={`${match.path}/newmodal`} component={NewModal} />
            <div className="filterside">
                <Filter
                    customers={customers}
                    drivers={drivers}
                />
            </div>
            <div className="dataside">
                <DataSide
                    transactions={transaction}
                    customers={customers}
                    drivers={drivers}
                />
            </div>
            <NewModal
                shouldShowModal={shouldShowModal}
                modalType={modalType}
                customers={customers}
                drivers={drivers}
            />
        </div>
    );
};

export default React.memo(ContentPage);