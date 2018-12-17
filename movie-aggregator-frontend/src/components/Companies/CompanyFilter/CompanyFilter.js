import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CompanyFilter.css';


class CompanyFilter extends Component {
    static propTypes = {
        submit: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            nameFilter: '',
            dateFilterFrom: 1900,
            dateFilterTo: 2050,
        };
    }

    submit = (event) => {
        event.preventDefault();
        this.props.submit();
    };

    render() {
        return(
            <form className='companies-filters card' onSubmit={this.submit}>
                <div className='card-body'>
                    <div className='list-group-item'>
                        <label className='col-form-label'>Name:</label>
                        <input className='form-control col-6' value={this.state.nameFilter}
                               onChange={(e) => this.setState({nameFilter: e.target.value})}
                        />
                    </div>
                    <div className='list-group-item'>
                        <label className='col-form-label'>Date from:</label>
                        <input type='number' className='form-control col-6' value={this.state.dateFilterFrom}
                               max={this.state.dateFilterTo}
                               onChange={(e) => this.setState({dateFilterFrom: e.target.value})}
                        />
                    </div>
                    <div className='list-group-item'>
                        <label className='col-form-label'>Date to:</label>
                        <input type='number' className='form-control col-6' value={this.state.dateFilterTo}
                               min={this.state.dateFilterFrom}
                               onChange={(e) => this.setState({dateFilterTo: e.target.value})}
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

export default CompanyFilter;
