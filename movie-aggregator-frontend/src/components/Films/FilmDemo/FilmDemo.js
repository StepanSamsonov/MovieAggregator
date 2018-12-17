import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FilmDemo.css';
import { Link } from "react-router-dom";
import globals from '../../../globals';


class Demo extends Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
    };

    link = `/films/${this.props.id}`;

    render() {
        return(
            <div className='list-group-item film-demo'>
                <div>
                    <Link to={this.link}>
                    <span className='text-dark'>
                        {this.props.name}
                    </span>
                    </Link>
                </div>
                <Link to={this.link}>
                    <img src={`${globals.imdb_url_small}/${this.props.image}`} alt=''/>
                </Link>
            </div>
        );
    }
}

export default Demo;
