

import firebasehandler from "firebaseconfig";

export const fetchData = async () => {
    const db = firebasehandler.firestore();

    const data = {
        driver: [],
        customer: [],
        transaction: []
    };

    const driverData = db.collection('driver');
    driverData.onSnapshot((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
            data["driver"] = [...data.driver, doc.data()];
        })
    })
    // const driverData = await db.collection('driver').get();
    // driverData.docs.map((doc) =>{
    //     console.log(doc.data());
    //     data["driver"] = [...data.driver, doc.data()];
    // });

    const customerData = await db.collection('customer').get();
    customerData.docs.map((doc) =>{
        console.log(doc.data());
        data["customer"] = [...data.customer, doc.data()];
    });

    const transactionData = await db.collection('transaction').get();
    transactionData.docs.map((doc) =>{
        console.log(doc.data());
        data["transaction"] = [...data.transaction, doc.data()];
    });

    return data;
};