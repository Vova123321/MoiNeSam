import React from 'react';
import Header from "../../Components/Header/Header.jsx";
import TableOrders from "./TableOrders/TableOrders.jsx";

const ListOfOrders = () => {
    return (
        <div>
            <Header/>
            <TableOrders/>
        </div>
    );
};

export default ListOfOrders;