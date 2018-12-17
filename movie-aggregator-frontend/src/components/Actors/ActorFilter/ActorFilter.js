import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ActorFilter.css';


class ActorFilter extends Component{
    static propTypes = {
        submit: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            filter: '',
        };
    }

    submit = (event) => {
        event.preventDefault();
        this.props.submit();
    };

    render() {
        return(
            <form className='actors-filter card' onSubmit={this.submit}>
                <div className='card-body'>
                    <div className='actor-filter-label'>
                        <label className='col-form-label'>Filter by name:</label>
                    </div>
                    <div>
                        <input className='form-control' value={this.state.filter}
                               onChange={(e) => this.setState({filter: e.target.value})}
                        />
                    </div>
                    <div>
                        <input type='submit' className='btn btn-primary' value='Search'/>
                    </div>
                </div>
            </form>
        );
    }
}

export default ActorFilter;
