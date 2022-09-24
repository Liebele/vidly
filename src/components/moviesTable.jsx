import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';

class MoviesTable extends Component {
    columns = [
        {path: 'title', label:'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: 'genre.name', label:'Genre'},
        {path: 'numberInStock', label:'Stock'},
        {path: 'dailyRentalRate', label:'Rate'},
        {key: 'like', content: movie => <Like onClick={this.props.onLike} movie={movie}/>},
        {key: 'delete', content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>}
    ];

    render() { 
        const {movies, onSort, selectColumn} = this.props;

        return ( 
            <Table
                data={movies}
                onSort={onSort}
                selectColumn={selectColumn}
                columns={this.columns}
            />
         );
    }
}

export default MoviesTable;