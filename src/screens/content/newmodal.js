

import React, { useState } from 'react';
import './newmodal.scss';
import { showModal, addCustomer, addDriver, addDetailsTemp } from 'reduxstore/actions/getdetails/getdetails';
import { useDispatch } from 'react-redux';
import TextField from 'components/TextField';
import { AddCircle, Delete } from '@material-ui/icons'
import NewTransaction from './newtransaction';


const NewModal = (props) => {

    const {
        shouldShowModal,
        modalType,
        customers,
        drivers
    } = props;

    const dispatch = useDispatch();
    const [custdet, setCustDet] = useState({ username: "" });
    const [driverdet, setDriverDet] = useState({ username: "", vehicles: [{ vehname: "" }] });
    const initialTransaction = {
        ldate: "",
        fromPlace: "",
        toPlace: "",
        custname: "",
        custadv: "",
        custbal: "",
        loadingHalami: "",
        drivname: "",
        vehno: "",
        drivadv: "",
        drivadvbal: "",
        lrnumber: "",
        drivBalDate: "",
        unloadingHamali: "",
        remarks: ""
    }
    const [transaction, setTransaction] = useState(initialTransaction);

    const closeModal = () => {
        const addDetailPayload = {
            modalState: false,
            modalType: ""
        };
        dispatch(showModal(addDetailPayload));
    }


    const getCustomerForm = () => {

        return (
            <div className="userInputForm">
                <TextField
                    type="text"
                    placeholder="Enter customer name"
                    value={custdet.custname}
                    onChange={(e) => { setCustDet({ ...custdet, username: e }) }}
                    isIconRequired={false}
                    style={{ backgroundColor: 'rgb(219, 215, 215)', color: 'black' }}
                    label="Customer Name"
                />
            </div>
        );
    }

    const clearState = () => {
        setCustDet({ username: "" });
        setDriverDet({ username: "", vehicles: [{ vehname: "" }] });
        setTransaction(initialTransaction);
    }

    const handleDriverInput = (e, id) => {
        const { name, value } = e.target;
        const list = [...driverdet.vehicles];
        list[id][name] = value;
        setDriverDet({ ...driverdet, vehicles: list });
    }

    const handleDriverRemove = id => {
        const list = [...driverdet.vehicles];
        list.splice(id, 1);
        setDriverDet({ ...driverdet, vehicles: list });
    }

    const handleDriverAdd = () => {
        setDriverDet({ ...driverdet, vehicles: [...driverdet.vehicles, { vehname: "" }] });
    }

    const getTransactionForm = () => {
        return (
            <div className="userInputForm">
                <NewTransaction
                    transaction={transaction}
                    customers={customers}
                    drivers={drivers}
                    setTransaction={setTransaction}
                />
            </div>
        );
    }

    const getDriverForm = () => {

        var driverList = driverdet.vehicles;

        return (
            <div className="userInputForm">
                <TextField
                    type="text"
                    placeholder="Enter driver name"
                    value={driverdet.drivername}
                    onChange={(e) => { setDriverDet({ ...driverdet, username: e }) }}
                    isIconRequired={false}
                    style={{ backgroundColor: 'rgb(219, 215, 215)', color: 'black' }}
                    label="Driver's name"
                />
                <div className="vehicleDetails">
                    {
                        driverList.map((el, i) => {
                            return (
                                <div className="vehicleNumber" key={i}>
                                    <input
                                        type="text"
                                        name="vehname"
                                        placeholder="vehicle no"
                                        value={el.vehname}
                                        onChange={(e) => { handleDriverInput(e, i) }}
                                    />
                                    <AddCircle style={{ color: 'gray' }}
                                        className="addVehicleBtn"
                                        fontSize="large"
                                        onClick={handleDriverAdd}
                                    />
                                    <Delete
                                        className="removeVehicleBtn"
                                        style={{ color: 'red', display: driverList.length === 1 ? 'none' : 'inline' }}
                                        fontSize="large"
                                        onClick={() => { handleDriverRemove(i) }}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );

    }

    const getForms = (modalname) => {
        switch (modalname) {
            case "customer":
                return getCustomerForm();
            case "driver":
                return getDriverForm();
            case "transaction":
                return getTransactionForm();
            default:
                return (<h1>Hello World</h1>);
        }
    }

    const getFormTitle = (modalname) => {
        switch (modalname) {
            case "customer":
                return "Add New Customer";
            case "driver":
                return "Add New Driver Details";
            case "transaction":
                return "Add New Transaction";
            default:
                return (<h1>Hello World</h1>);
        }
    }

    const onAddModal = () => {
        const payloadToBeAdded = {
            typeofadd: modalType,
            addData: modalType === "customer" ? custdet : modalType === "driver" ? driverdet : transaction
        }
        dispatch(addDriver(payloadToBeAdded));
        closeModal();
        clearState();
    }

    const onCloseModal = () => {
        closeModal();
        clearState();
    }

    return (
        shouldShowModal ?
            (
                <div className="newmodalcont" onClick={closeModal}>
                    <div className="newmodal" onClick={(e) => e.stopPropagation()}>
                        <p>{getFormTitle(modalType)}</p>
                        {getForms(modalType)}
                        <div className="submitorcancel">
                            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={onAddModal}>ADD</button>
                            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={onCloseModal}>CANCEL</button>
                        </div>
                    </div>
                </div>
            ) : null
    );
};

export default NewModal;