import React, { Component } from 'react';
import './Companies.css';
import api from "../../api";
import CompanyDemo from "./CompanyDemo/CompanyDemo";
import PageLinks from "../PageLinks/PageLinks";
import CompanyFilter from "./CompanyFilter/CompanyFilter";
import Loading from "../Loading/Loading";


class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevPage: undefined,
            nextPage: undefined,
            totalPages: undefined,
            companies: null,

            currentPage: 1,
        };

        this.filterRef = React.createRef();
    }

    componentWillMount() {
        this.fetchPage(this.state.currentPage);
    }

    fetchPage = async (page) => {
        const filters = this.filterRef.current ? this.filterRef.current.state : {};
        const res = await api.companies.getAll(page, filters);

        this.setState({
            companies: res.data,
            totalPages: res.total_pages,
            prevPage: res.prev_page,
            nextPage: res.next_page,
            currentPage: page,
        });
    };

    render() {
        if (!this.state.companies) {
            return(<Loading/>);
        }

        return(
            <div className='companies-main'>
                <div className='companies-title'>
                    <h2>Companies</h2>
                </div>
                {
                    this.state.companies.length ? null :
                        <div className='companies-nothing col-8'>
                            <h4>Nothing to show :C</h4>
                        </div>
                }
                <div className='companies-middle'>
                    <div className='col-8'>
                        <div>
                            {
                                this.state.companies.map(company =>
                                    <CompanyDemo key={company.id} {...company}
                                    />
                                )
                            }
                        </div>
                        <div>
                            <PageLinks prevPage={this.state.prevPage}
                                       currentPage={this.state.companies.length ? this.state.currentPage : undefined}
                                       nextPage={this.state.nextPage}
                                       totalPages={this.state.totalPages}
                                       fetchPage={this.fetchPage}
                            />
                        </div>
                    </div>
                    <div className='companies-filters col-4'>
                        <CompanyFilter ref={this.filterRef} submit={async () => await this.fetchPage(1)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Companies;
