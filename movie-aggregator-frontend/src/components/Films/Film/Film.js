import React, { Component } from 'react';
import './Film.css';
import api from "../../../api";
import globals from "../../../globals";
import ClassName from "classnames";
import ActorDemo from "../../Actors/ActorDemo/ActorDemo";
import CompanyDemo from "../../Companies/CompanyDemo/CompanyDemo";
import GenreDemo from "../../Genres/GenreDemo/GenreDemo";
import Loading from "../../Loading/Loading";


class Film extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            budget: 0,
            language: '',
            overview: '',
            country: '',
            date: '',
            revenue: '',
            runtime: '',
            tagline: '',
            image: '',

            actors: [],
            genres: [],
            companies: [],
            reviews: [],

            activeTab: 'Actors',
        };
    }

    async componentWillMount() {
        const res = await api.films.getOne(this.props.match.params.id);

        this.setState({
            id: res.id,
            name: res.name,
            budget: res.budget,
            language: res.language,
            overview: res.overview,
            country: res.country,
            date: res.date,
            revenue: res.revenue,
            runtime: res.runtime,
            tagline: res.tagline,
            image: res.image,

            actors: res.actors,
            genres: res.genres,
            companies: res.companies,
            reviews: res.reviews,
        });
    }

    render() {
        if (this.state.id === null) {
            return(<Loading/>);
        }

        return(
            <div className='film-main'>
                <div className='film-top'>
                    <div className='film-image col-4'>
                        <img src={globals.imdb_url_large+this.state.image} alt=''/>
                    </div>
                    <div className='film-table col-8'>
                        <div className='film-table-element list-group-item'>
                            <h4>
                                {this.state.name}
                            </h4>
                        </div>
                        <div className='film-table-element list-group-item'>
                            <label>Budget:</label>
                            <div>{this.state.budget}</div>
                        </div>
                        <div className='film-table-element list-group-item'>
                            <label>Revenue:</label>
                            <div>{this.state.revenue}</div>
                        </div>
                        <div className='film-table-element list-group-item'>
                            <label>Country:</label>
                            <div>{this.state.country}</div>
                        </div>
                        <div className='film-table-element list-group-item'>
                            <label>Release date:</label>
                            <div>{this.state.date}</div>
                        </div>
                        <div className='film-table-element list-group-item'>
                            <label>Language:</label>
                            <div>{this.state.language}</div>
                        </div>
                        <div className='film-table-element list-group-item'>
                            <label>Runtime:</label>
                            <div>{this.state.runtime}</div>
                        </div>
                        {
                            this.state.tagline !== 'nan' ?
                                <div className='film-table-element list-group-item'>
                                    <label>Tagline:</label>
                                    <div>{this.state.tagline}</div>
                                </div>
                                : null
                        }
                    </div>
                </div>
                <div className='film-overview list-group-item list-group-item-secondary'>
                    {this.state.overview}
                </div>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item" onClick={() => this.setState({activeTab: 'Actors'})}>
                            <div className={ClassName({'nav-link': true, 'active': this.state.activeTab === 'Actors'})}>
                                Actors
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => this.setState({activeTab: 'Genres'})}>
                            <div className={ClassName({'nav-link': true, 'active': this.state.activeTab === 'Genres'})}>
                                Genres
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => this.setState({activeTab: 'Companies'})}>
                            <div className={ClassName({'nav-link': true, 'active': this.state.activeTab === 'Companies'})}>
                                Companies
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => this.setState({activeTab: 'Reviews'})}>
                            <div className={ClassName({'nav-link': true, 'active': this.state.activeTab === 'Reviews'})}>
                                Reviews
                            </div>
                        </li>
                    </ul>
                    <div className='film-nav-content'>
                        {
                            this.state.activeTab === 'Actors' ?
                                this.state.actors.length ?
                                    this.state.actors.map(actor => <ActorDemo key={actor.id} {...actor}/>)
                                    : <h5>Nothing to show</h5>
                                : null
                        }
                        {
                            this.state.activeTab === 'Genres' ?
                                this.state.genres.length ?
                                    this.state.genres.map(genre => <GenreDemo key={genre.id} {...genre}/>)
                                    : <h5>Nothing to show</h5>
                                : null
                        }
                        {
                            this.state.activeTab === 'Companies' ?
                                this.state.companies.length ?
                                    this.state.companies.map(company => <CompanyDemo key={company.id} {...company}/>)
                                    : <h5>Nothing to show</h5>
                                : null
                        }
                        {
                            this.state.activeTab === 'Reviews' ?
                                this.state.reviews.length ?
                                    this.state.reviews.map(review =>
                                        <div className={ClassName(
                                            {
                                                'list-group-item': true,
                                                'list-group-item-success': review.is_positive,
                                                'list-group-item-danger': !review.is_positive,
                                            }
                                            )}>
                                            <div className="content"
                                                 dangerouslySetInnerHTML={{__html: review.text}}
                                            />
                                        </div>
                                    )
                                    : <h5>Nothing to show</h5>
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Film;
