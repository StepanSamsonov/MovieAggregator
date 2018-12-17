import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GenreDemo.css';
import {Link} from "react-router-dom";


class GenreDemo extends Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
    };

    link = `/genres/${this.props.id}`;

    render() {
        return(
            <div className='list-group-item genre-demo-container'>
                <div>
                    <Link to={this.link}>
                        <span className='text-dark'>
                            {this.props.name}
                        </span>
                    </Link>
                </div>
                <Link to={this.link}>
                    <img src={'data:image/png;base64,'+this.props.image} alt=''/>
                </Link>
            </div>
        );
    }
}

export default GenreDemo;
