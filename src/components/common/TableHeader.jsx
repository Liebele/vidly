import React, { Component } from 'react';

//columns : array
//selectColumn : object
//onSort : func

class TableHeader extends Component {
    raiseSort = path => {
        console.log(path)
        console.log(this.props.selectColumn)
        const selectColumn = {...this.props.selectColumn};
        if (path === selectColumn.path) 
            selectColumn.order = (selectColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            selectColumn.path = path;
            selectColumn.order = 'asc';
        }
        this.props.onSort(selectColumn);
    };
    
    renderSortIcon = column => {
        const {selectColumn} = this.props;
        if (column.path !== selectColumn.path) return null;
        if (selectColumn.order === 'asc') return <i className='fa fa-sort-asc'/>;
        return <i className='fa fa-sort-desc'/>;
    }

    render() { 
        return (
            <thead>
                <tr>
                    {this.props.columns.map(column => (
                        <th
                            className='clickable'
                            key={column.path || column.key} 
                            onClick={() => this.raiseSort(column.path)}
                        >
                            {column.label} {this.renderSortIcon(column)}
                        </th>
                    )) }
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;