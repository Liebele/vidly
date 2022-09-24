import React, { Component } from 'react';

class Like extends Component {

    render() { 
        let classes = 'fa fa-heart';
        if (this.props.movie.liked !== true) classes += '-o';

        return (<i onClick={() => this.props.onClick(this.props.movie)} className={classes} aria-hidden="true"></i>);
    }
}
 
export default Like;