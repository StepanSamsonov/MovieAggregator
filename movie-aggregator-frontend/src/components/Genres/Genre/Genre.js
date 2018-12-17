import React, { Component } from 'react';
import './Genre.css';
import api from "../../../api";
import ClassName from 'classnames';
import FilmDemo from "../../Films/FilmDemo/FilmDemo";
import ActorDemo from "../../Actors/ActorDemo/ActorDemo";
import CompanyDemo from "../../Companies/CompanyDemo/CompanyDemo";
import Loading from "../../Loading/Loading";


class Genre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            image: '',
            description: '',

            films: [],
            actors: [],
            companies: [],

            activeTab: 'Films',
        };
    }

    async componentWillMount() {
        const res = await api.genres.getOne(this.props.match.params.id);

        this.setState({
            id: res.id,
            name: res.name,
            image: res.image,
            description: res.description,

            films: res.films,
            actors: res.actors,
            companies: res.companies,
        });
    }

    render() {
        if (this.state.id === null) {
            return(<Loading/>);
        }

        return(
            <div className='genre-main'>
                <div className='genre-title'>
                    <h3>{this.state.name}</h3>
                </div>
                <div className='genre-image'>
                    <img src={'data:image/png;base64,'+this.state.image} alt=''/>
                </div>
                <div className='genre-description card'>
                    <div className='card-body'>
                        {this.state.description}
                    </div>
                </div>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item" onClick={() => this.setState({activeTab: 'Films'})}>
                            <div className={ClassName({'nav-link': true, 'active': this.state.activeTab === 'Films'})}>
                                Films
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => this.setState({activeTab: 'Actors'})}>
                            <div className={ClassName({'nav-link': true, 'active': this.state.activeTab === 'Actors'})}>
                                Actors
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => this.setState({activeTab: 'Companies'})}>
                            <div className={ClassName({'nav-link': true, 'active': this.state.activeTab === 'Companies'})}>
                                Companies
                            </div>
                        </li>
                    </ul>
                    <div className='genre-nav-content'>
                        {
                            this.state.activeTab === 'Films' ?
                                this.state.films.length ?
                                    this.state.films.map(film => <FilmDemo key={film.id} {...film}/>)
                                : <h5>Nothing to show</h5>
                            : null
                        }
                        {
                            this.state.activeTab === 'Actors' ?
                                this.state.actors.length ?
                                    this.state.actors.map(actor => <ActorDemo key={actor.id} {...actor}/>)
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Genre;
