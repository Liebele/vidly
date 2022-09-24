import React from 'react';

const ListGroup = ({items, valueProperty, textProperty, onItemSelect, currentGenre}) => {

    return (
        <ul className="list-group m-2">
            {items.map(item => (
                <li key={item[valueProperty]} 
                    onClick={() => onItemSelect(item)}
                    className={(currentGenre && currentGenre.name === item.name) ? "list-group-item active" : "list-group-item"}>
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    valueProperty: '_id',
    textProperty: 'name'
}

export default ListGroup;