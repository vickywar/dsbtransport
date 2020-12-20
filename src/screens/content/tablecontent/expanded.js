

import React, { useState } from 'react';
import './styles.scss';

/**
 * drivadv
 * drivbal
 * drivbalDate
 * loading
 * unloading halami
 * lrnumber
 * remarks
 * vehno
 */

const ExpandedDetail = (props) => {

    const {
        drivadv,
        drivadvbal,
        drivBalDate,
        unloadingHamali,
        vehno,
        lrnumber,
        remarks
    } = props.transactions;

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="extended-container">
            <div className="field-container">
                <div className="transaction-fields">
                    <div>
                        <p style={{ textAlign: 'left' }}>Paid Driver Advance</p>
                        <input disabled={!isEdit} type="text" placeholder="Paid Driver Advance" defaultValue={drivadv} />
                    </div>
                    <div>
                        <p style={{ textAlign: 'left' }}>Balance Driver Amount</p>
                        <input disabled={!isEdit} type="text" placeholder="Balance Driver Amount" defaultValue={drivadvbal} />
                    </div>
                    <div>
                        <p style={{ textAlign: 'left' }}>Driver Balance Paid Date</p>
                        <input disabled={!isEdit} type="text" placeholder="Driver Balance Paid Date" defaultValue={drivBalDate} />
                    </div>
                    <div>
                        <p style={{ textAlign: 'left' }}>Unloading Hamali</p>
                        <input disabled={!isEdit} type="text" placeholder="Unloading Hamali" defaultValue={unloadingHamali} />
                    </div>
                    <div>
                        <p style={{ textAlign: 'left' }}>Vehicle Number</p>
                        <input disabled={!isEdit} type="text" placeholder="Vehicle Number" defaultValue={vehno} />
                    </div>
                    <div>
                        <p style={{ textAlign: 'left' }}>LR Number</p>
                        <input disabled={!isEdit} type="text" placeholder="LR Number" autoComplete="off" defaultValue={lrnumber} />
                    </div>
                    <div>
                        <p style={{ textAlign: 'left' }}>Remarks</p>
                        <textarea disabled={!isEdit} name="remarks" defaultValue={remarks} cols="30" rows="5"></textarea>
                    </div>
                </div>
                <div className="action-btns">
                    <button onClick={() => setIsEdit(!isEdit)}>{!isEdit ? "Edit" : "Cancel"}</button>
                    <button disabled={!isEdit}
                        style={{
                            backgroundColor: !isEdit ? "gray" : "green",
                            cursor: !isEdit ? "default" : "pointer"
                        }}
                    >
                        Save
                        </button>
                    <button>Done</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ExpandedDetail;