

import React, { useState } from 'react';
import './newtransaction.scss';

/**
 * To be added fields
 * lr number - completed transaction
 * balance date ( to driver )
 * loading hamali - should be added in add transaction
 * unloading hamali - comes along with customer balance 
 * customer balance - still stand alone field
 * remarks
 */

const NewTransaction = (props) => {

    const [vehobj, setVehObj] = useState([]);

    const {
        customers,
        drivers
    } = props;

    const requiredFieldDetails = [
        {
            name: 'custname',
            type: 'text',
            label: 'Customer name'
        },
        {
            name: 'ldate',
            type: 'date',
            label: 'Choose loading date'
        },
        {
            name: 'fromPlace',
            type: 'text',
            label: 'ORIGIN'
        },
        {
            name: 'toPlace',
            type: 'text',
            label: 'DESTINATION'
        },
        {
            name: 'drivname',
            type: 'text',
            label: 'Driver name'
        },
        {
            name: 'vehno',
            type: 'text',
            label: 'Vehicle number'
        },
        {
            name: 'custadv',
            type: 'number',
            label: 'Received customer advance'
        },
        {
            name: 'custbal',
            type: 'number',
            label: 'Balance customer advance'
        },
        {
            name: 'loadingHalami',
            type: 'number',
            label: 'Loading Halami'
        },
    ]

    const handleTransactionSelect = (e, el, fielddata) => {

        function getValue (docId) {
            var selectedVal = "";
            fielddata.map((driv) => {
                if (driv.id == docId) {
                    selectedVal = driv.username
                }
            })
            return selectedVal
        }

        if (el.name === "drivname") {
            fielddata.map((driver) => {
                if (driver.id === e.target.value) {
                    setVehObj(driver.vehicles)
                    props.setTransaction({ ...props.transaction, [e.target.name]: getValue(e.target.value) })
                }
            })
        }
        props.setTransaction({ ...props.transaction, [e.target.name]: e.target.value })
    }

    const selectOption = (el, fielddata) => {

        if (fielddata === undefined && el.name === "vehno") {
            fielddata = vehobj
        }
        return (
            <select
                name={el.name}
                className="newTransSelect"
                onChange={(e) => handleTransactionSelect(e, el, fielddata)}
            >
                <option defaultChecked>{el.label}</option>
                {
                    fielddata.map((elem, id) => {
                        return (
                            <option
                                value={elem.id}
                                key={id}
                                name={el.name}
                            >
                                {el.name === "vehno" ? elem.vehname : elem.username}
                            </option>
                        );
                    })
                }
            </select>
        )
    };

    return (
        <div className="newTransaction">
            {
                requiredFieldDetails.map((el, id) => {
                    var selectoption = el.name === "custname" ? customers : drivers;
                    selectoption = selectoption ? selectoption : [];

                    return (

                        <div className="transactionField" key={id}>
                            <p>{el.label}</p>
                            {
                                !["custname", "drivname", "vehno"].includes(el.name) ?

                                    <input
                                        type={el.type}
                                        name={el.name}
                                        placeholder={el.label}
                                        value={props.transaction[el.name]}
                                        onChange={(e) => {
                                            props.setTransaction({ ...props.transaction, [e.target.name]: e.target.value })
                                        }}
                                    /> : el.name !== "vehno" ?
                                        selectOption(el, selectoption)
                                        : selectOption(el, vehobj)
                            }
                        </div>

                    );
                })
            }
        </div>
    );
};

export default NewTransaction;