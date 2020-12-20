

import React, { useState } from 'react';
import './styles.scss';
import { Label, Backspace } from '@material-ui/icons';
import { setFilter } from 'reduxstore/actions';
import { useDispatch } from 'react-redux';

const Filter = (props) => {

    const [otherFilters, setOtherFilters] = useState({
        transcomp: false,
        transpend: false,
        paymcomp: false,
        paympend: false
    });
    const [customerFilter, setCustomerFilter] = useState("");
    const [driverFilter, setDriverFilter] = useState("");
    const [dateRange, setDateRange] = useState([]);

    const dispatch = useDispatch();

    const {
        customers,
        drivers
    } = props;

    const getCustomerSelect = (filtername) => {

        var selectoption = filtername === "customer" ? customers : drivers;
        selectoption = selectoption ? selectoption : [];

        return (
            <div className="mainoptions">
                <p style={{ width: '90%', fontWeight: '500' }}>Select by {filtername}</p>
                <select className="customerSelect" onChange={(e) => {
                    filtername === "customer" ? setCustomerFilter(e.target.value)
                    : setDriverFilter(e.target.value);
                    updateReduxFilter(filtername, e.target.value);
                }}>
                    <option value={"all"} defaultChecked>{`${filtername} - All`}</option>
                    {
                        selectoption.map((el, id) => {
                            return (
                                <option value={el.id} key={id}>{el.username}</option>
                            );
                        })
                    }
                </select>
            </div>
        );
    }

    const updateReduxFilter = (filterType, filterSet) => {
        const filterPayload = {
            filterType: filterType,
            filterSet: filterSet
        }
        dispatch(setFilter(filterPayload));
    }

    const getOtherFilters = () => {
        return (
            <div className="suboptions">
                <p>Other Filters</p>
                <div className="transcomp"
                    onClick={() => {
                        setOtherFilters(otherFilters => ({
                            ...otherFilters,
                            transcomp: !otherFilters.transcomp
                        }));
                    }}
                    style={{ backgroundColor: otherFilters.transcomp ? 'rgb(167, 167, 111)' : '' }}>
                    <Label fontSize="default" style={{ color: 'green' }} />
                    <p>Completed Transactions</p>
                </div>
                <div className="transpend"
                    onClick={() => {
                        setOtherFilters(otherFilters => ({
                            ...otherFilters,
                            transpend: !otherFilters.transpend
                        }))
                    }}
                    style={{ backgroundColor: otherFilters.transpend ? 'rgb(167, 167, 111)' : '' }}>
                    <Backspace fontSize="default" style={{ color: 'red' }} />
                    <p>Pending Transactions</p>
                </div>
                <div className="drivcomp"
                    onClick={() => {
                        setOtherFilters(otherFilters => ({
                            ...otherFilters,
                            paymcomp: !otherFilters.paymcomp
                        }))
                    }}
                    style={{ backgroundColor: otherFilters.paymcomp ? 'rgb(167, 167, 111)' : '' }}
                >
                    <Backspace fontSize="default" style={{ color: 'red' }} />
                    <p> Pending Driver Payments</p>
                </div>
                <div className="drivpend"
                    onClick={() => {
                        setOtherFilters(otherFilters => ({
                            ...otherFilters,
                            paympend: !otherFilters.paympend
                        }))
                    }}
                    style={{ backgroundColor: otherFilters.paympend ? 'rgb(167, 167, 111)' : '' }}>
                    <Label fontSize="default" style={{ color: 'green' }} />
                    <p>Completed Driver Payments</p>
                </div>
            </div>
        );
    };


    return (
        <div className="filtercont">
            <div className="filtertitle">
                <p>Filter Data</p>
            </div>
            <div className="filterwith">
                {getCustomerSelect("customer")}
                {getCustomerSelect("driver")}
                <div className="dateFilter">
                    <div>
                        <label htmlFor="startDate">Start Date</label>
                        <input id="startDate" type="date" />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date</label>
                        <input id="endDate" type="date" />
                    </div>
                </div>
                <div className="otherfilters">
                    {getOtherFilters()}
                </div>
            </div>
        </div>
    );
};

export default Filter;