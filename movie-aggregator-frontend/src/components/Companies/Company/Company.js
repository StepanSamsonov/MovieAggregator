import React, { Component } from 'react';
import './Company.css';
import api from "../../../api";
import ClassName from "classnames";
import FilmDemo from "../../Films/FilmDemo/FilmDemo";
import GenreDemo from "../../Genres/GenreDemo/GenreDemo";
import Loading from "../../Loading/Loading";


class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            foundingDate: '',

            films: [],
            genres: [],

            activeTab: 'Films',
        };
    }

    async componentWillMount() {
        const res = await api.companies.getOne(this.props.match.params.id);

        this.setState({
            id: res.id,
            name: res.name,
            foundingDate: res.foundingDate,

            films: res.films,
            genres: res.genres,
        });
    }

    render() {
        if (this.state.id === null) {
            return(<Loading/>);
        }

        return(
            <div className='company-main'>
                <div className='company-top'>
                    <div>
                        <h4>{this.state.name}</h4>
                    </div>
                    <div className='company-date'>
                        <label>First release date:</label>
                        <div>{this.state.foundingDate}</div>
                    </div>
                </div>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item" onClick={() => this.setState({activeTab: 'Films'})}>
                            <div className={ClassName({'nav-link': true, 'active': this.state.activeTab === 'Films'})}>
                                Films
                            </div>
                        </li>
                        <li className="nav-item" onClick={() => this.setState({activeTab: 'Genres'})}>
                            <div className={ClassName({'nav-link': true, 'active': this.state.activeTab === 'Genres'})}>
                                Genres
                            </div>
                        </li>
                    </ul>
                    <div className='company-nav-content'>
                        {
                            this.state.activeTab === 'Films' ?
                                this.state.films.length ?
                                    this.state.films.map(film => <FilmDemo key={film.id} {...film}/>)
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Company;
