import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ExpandedDetail from './expanded';

const DataTable = (props) => {

    const [trExpand, setTrExpand] = useState("");
    const [selectedTrans, setSelectedTrans] = useState({});

    const {
        transactions,
        customers,
        drivers
    } = props;

    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const {
        customer,
        driver,
        dateRange,
        otherFilters
    } = useSelector(state => state.filters);

    useEffect(() => {
        // to be done : otherfilters
        if (transactions.length > 0) {
            if (customer.length || driver.length) {
                const arr = [];
                transactions.forEach(item => {
                    if (item.custname === customer[0] || item.drivname === driver[0]) {
                        arr.push(item);
                    }
                });
                setFilteredTransactions(arr);
                return;
            }
        }
        setFilteredTransactions(transactions);
    }, [customer, driver, dateRange, otherFilters, transactions]);

    const getName = (docId, field) => {
        var fielddata = field === "customer" ? customers : drivers;
        var selectedVal = "";
        fielddata.forEach((driv) => {
            if (driv.id === docId) {
                selectedVal = driv.username
            }
        })
        return selectedVal;
    }

    const selectedTransFunc = (transId) => {
        setTrExpand("");
        if (trExpand !== "") {
            setTrExpand("");
        } else {
            setTrExpand(transId);
        }
        transactions.map((trans) => {
            if (trans.id === transId) {
                setSelectedTrans(trans)
            }
        })
    }

    const transComponent = () => {
        return (
            filteredTransactions.map((el, id) => (
                <>
                    <tr key={id} onClick={() => { selectedTransFunc(el.id) }}>
                        <td>{id + 1}</td>
                        <td><input className="transField" type="text" value={getName(el.custname, "customer")} /> </td>
                        <td><input className="transField" type="text" value={el.fromPlace} /> </td>
                        <td><input className="transField" type="text" value={el.toPlace} /> </td>
                        <td><input className="transField" type="text" value={el.ldate} /> </td>
                        <td><input className="transField" type="text" value={el.custadv} /> </td>
                        <td><input className="transField" type="text" value={getName(el.drivname, "driver")} /> </td>
                        <td><input className="transField" type="text" value={el.vehno} /> </td>
                        <td><input className="transField" type="text" value={el.custbal} /> </td>
                    </tr>
                    {
                        trExpand === el.id ?
                            <tr key={id} className={`trExpanded${trExpand === el.id ? "--view" : ""}`}>
                                <td colSpan={9} style={{ border: 'none', padding: 0 }}>
                                    <ExpandedDetail transactions={selectedTrans} />
                                </td>
                            </tr> : null
                    }
                </>
            ))
        )
    }

    return (
        <table>
            <thead>
                <tr className="red">
                    <th style={{ width: 50 }}>S.NO</th>
                    <th>CUSTOMER</th>
                    <th>FROM</th>
                    <th>TO</th>
                    <th>LDATE</th>
                    <th>CUST ADV</th>
                    <th>DRIVER</th>
                    <th>VEH NO</th>
                    <th style={{ borderRight: 'none' }}>CUST ADV B</th>
                </tr>
            </thead>
            <tbody>
                {transComponent()}
            </tbody>
        </table>
    );
};

export default React.memo(DataTable);