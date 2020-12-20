

import React from 'react';
import './styles.scss';
import CollapsibleTable from './tablecontent/tablecontent';

const DataSide = (props) => {

    const trans = false;

    const {
        transactions,
        drivers,
        customers
    } = props;

    return (
        <div className="datasidecont" style={{ overflow: trans ? 'auto' : 'hidden' }}>
            <div className="selectedFilters">
                <input type="text" placeholder="Search for customer, driver, vehicle number" />
                <div className="exportExcelBtn">
                    <button>Export Excel</button>
                </div>
            </div>
            <div className="datacontent">
                <CollapsibleTable
                    transactions={transactions}
                    customers={customers}
                    drivers={drivers}
                />
            </div>
        </div>
    );
};

export default DataSide;