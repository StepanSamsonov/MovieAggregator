import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CompanyDemo.css';
import {Link} from "react-router-dom";


class Demo extends Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        foundingDate: PropTypes.number,
    };

    render() {
        return(
            <div className='company-demo list-group-item'>
                <div>
                    <Link to={`/companies/${this.props.id}`}>
                        <span className='text-dark'>{this.props.name}</span>
                    </Link>
                </div>
                <div>
                    <div className='text-dark'>First release date: {this.props.foundingDate}</div>
                </div>
            </div>
        );
    }
}

export default Demo;
