import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageLinks.css';


class PageLinks extends Component {
    static propTypes = {
        prevPage: PropTypes.number,
        currentPage: PropTypes.number,
        nextPage: PropTypes.number,
        totalPages: PropTypes.number,
        fetchPage: PropTypes.func,
    };
    
    render() {
        return(
            <div className='page-links-container'>
                {
                    this.props.currentPage && this.props.currentPage !== 1 && this.props.currentPage !== 2 ?
                        <input type='button' className='btn btn-primary' value={1}
                               onClick={() => this.props.fetchPage(1)}
                        /> : <div/>
                }
                {
                    this.props.prevPage ?
                        <input type='button' className='btn btn-primary' value={this.props.prevPage}
                               onClick={() => this.props.fetchPage(this.props.prevPage)}
                        /> : <div/>
                }
                {
                    this.props.currentPage ?
                        <input type='button' className='btn btn-primary'
                               value={this.props.currentPage} disabled={true}
                        /> : <div/>
                }
                {
                    this.props.nextPage ?
                        <input type='button' className='btn btn-primary' value={this.props.nextPage}
                               onClick={() => this.props.fetchPage(this.props.nextPage)}
                        /> : <div/>
                }
                {
                    this.props.totalPages && this.props.currentPage !== this.props.totalPages &&
                    this.props.currentPage !== this.props.totalPages - 1 ?
                        <input type='button' className='btn btn-primary' value={this.props.totalPages}
                               onClick={() => this.props.fetchPage(this.props.totalPages)}
                        /> : <div/>
                }
            </div>
        );
    }
}

export default PageLinks;
