import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import SearchBox from './searchBox';

class Movies extends Component {
    state = {
        movies: [],
        genres:[],
        pageSize: 4,
        currentPage: 1,
        searchQuery: '',
        selectColumn: {path: 'title', order: 'asc'},
        currentGenre: {_id:'',name: 'AllGenres'}
    }

    componentDidMount() {
        const genres = [{_id:'',name: 'AllGenres'}, ...getGenres()];
        this.setState({movies: getMovies(), genres});
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    }

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked
        this.setState({movies});
    }

    handlePageChange = page => {
        this.setState({currentPage: page})
    }

    handleGenreSelect = genre => {
        this.setState({currentGenre: genre, searchQuery:'', currentPage: 1})
    }

    handleSort = selectColumn => {
        this.setState({selectColumn})
    }

    handleSearch = query => {
        this.setState({searchQuery: query, currentGenre: null, currentPage: 1})
    }


    render() {
        return (
            this.showMovies()
        );  
    }

    getPagedDate = () => {
        const {pageSize, currentPage, currentGenre, selectColumn, searchQuery, movies: allMovies} = this.state;

        let filtered = allMovies;
        if (searchQuery) 
            filtered = allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        else if (currentGenre && currentGenre._id)
            filtered = allMovies.filter(m => m.genre._id === currentGenre._id);

        const sorted = _.orderBy(filtered, [selectColumn.path], [selectColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies};
    }

    showMovies() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, currentGenre, selectColumn, genres, searchQuery} = this.state;
        
        const {totalCount, data: movies} = this.getPagedDate();

        if (count !== 0)
            return (
                <div className='row'>
                    <div className="col-2">
                        <ListGroup 
                            items={genres} 
                            onItemSelect={this.handleGenreSelect}
                            currentGenre={currentGenre}
                        />
                    </div>
                    <div className="col">
                        <button 
                            className="btn btn-primary m-2" 
                            onClick={() => this.props.history.push('/movies/new')}>New Movie</button>
                        <p>There is {totalCount} movies in database!</p>
                        <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                        <MoviesTable
                            movies={movies}
                            selectColumn={selectColumn}
                            onDelete={this.handleDelete}
                            onLike={this.handleLike}
                            onSort={this.handleSort}
                        />
                        <Pagination
                            itemsCount={totalCount}
                            onPageChange={this.handlePageChange}
                            pageSize={pageSize}
                            currentPage={currentPage}
                        />
                    </div>
                </div>);
        return <p>There is no movie in database!</p>
    }
}

export default Movies;