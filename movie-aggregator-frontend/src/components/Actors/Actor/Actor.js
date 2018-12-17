import React, { Component } from 'react';
import './Actor.css';
import api from "../../../api";
import globals from "../../../globals";
import ClassName from "classnames";
import FilmDemo from "../../Films/FilmDemo/FilmDemo";
import GenreDemo from "../../Genres/GenreDemo/GenreDemo";
import Loading from "../../Loading/Loading";


class Actor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            image: '',

            films: [],
            genres: [],

            activeTab: 'Films',
        };
    }

    async componentWillMount() {
        const res = await api.actors.getOne(this.props.match.params.id);
        this.setState({
            id: res.id,
            name: res.name,
            image: res.image,
            films: res.films,
            genres: res.genres,
        });
    }

    render() {
        if (this.state.id === null) {
            return(<Loading/>);
        }
        return(
            <div className='actor-main'>
                <div className='actor-left'>
                    <div className='actor-name col-5'>
                        <h3>
                            {this.state.name}
                        </h3>
                    </div>
                    <div className='actor-middle'>
                        <div className='actor-image col-5'>
                            <img src={globals.imdb_url_large+this.state.image} alt=''/>
                        </div>
                        <div className='actor-right col-7'>
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
                            <div className='actor-nav-content'>
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
                                            this.state.genres.map(company => <GenreDemo key={company.id} {...company}/>)
                                            : <h5>Nothing to show</h5>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Actor;
