import React, { Component } from 'react';
import PropTypes from 'prop-types';
import globals from '../../../globals';
import { Link } from "react-router-dom";
import './ActorDemo.css';


class ActorDemo extends Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
    };

    link = `/actors/${this.props.id}`;

    render() {
        return(
            <div className='list-group-item actor-demo-container'>
                <div className='actor-demo-label'>
                    <Link to={this.link}>
                        <span className='text-dark'>
                            {this.props.name}
                        </span>
                    </Link>
                </div>
                <Link to={this.link}>
                    {
                        this.props.image ?
                            <img src={`${globals.imdb_url_small}/${this.props.image}`} alt=''/>
                            :
                            <img src={require('../NotFound.png')} alt=''/>
                    }
                </Link>
            </div>
        );
    }
}

export default ActorDemo;
