import React from 'react';
import TabelBody from './tableBody';
import TableHeader from './TableHeader';

const Table = ({columns, selectColumn, onSort, data}) => {

    return (  
        <table className="table">
            <TableHeader
                columns={columns}
                selectColumn={selectColumn}
                onSort={onSort}
            />
            <TabelBody
                data={data}  
                columns={columns}  
            />
        </table>
    );
}
 
export default Table;