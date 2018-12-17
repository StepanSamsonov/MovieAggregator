import React, { Component } from 'react';
import './Films.css';
import api from "../../api";
import Demo from "./FilmDemo/FilmDemo";
import PageLinks from "../PageLinks/PageLinks";
import FilmFilter from "./FilmFilter/FilmFilter";
import Loading from "../Loading/Loading";


class Films extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevPage: undefined,
            nextPage: undefined,
            totalPages: undefined,
            films: null,

            genres: [],
            languages: [],
            countries: [],

            currentPage: 1,
        };

        this.filterRef = React.createRef();
    }

    async componentWillMount() {
        await this.fetchPage(this.state.currentPage);
    }

    fetchPage = async (page) => {
        const filters = this.filterRef.current ? {...this.filterRef.current.state} : {};

        delete filters.showLanguages;
        delete filters.showCountries;
        delete filters.showGenres;

        const res = await api.films.getAll(page, filters);

        this.setState({
            films: res.data,
            totalPages: res.total_pages,
            prevPage: res.prev_page,
            nextPage: res.next_page,
            currentPage: page,
            languages: res.languages,
            countries: res.countries,
            genres: res.genres,
        });
    };

    render() {
        if (!this.state.films) {
            return(<Loading/>);
        }

        return(
            <div className='films-main'>
                <div className='films-title'>
                    <h2>Films</h2>
                </div>
                {
                    this.state.films.length ? null :
                        <div className='actors-nothing col-8'>
                            <h4>Nothing to show :C</h4>
                        </div>
                }
                <div className='films-middle'>
                    <div className='col-8'>
                        <div className='films-container'>
                            {this.state.films.map(film => <Demo key={film.id} {...film}/>)}
                        </div>
                        <div>
                            <PageLinks prevPage={this.state.prevPage}
                                       currentPage={this.state.films.length ? this.state.currentPage : undefined}
                                       nextPage={this.state.nextPage}
                                       totalPages={this.state.totalPages}
                                       fetchPage={this.fetchPage}
                            />
                        </div>
                    </div>
                    <div className='col-4'>
                        <FilmFilter ref={this.filterRef} submit={async () => await this.fetchPage(1)}
                                    genres={this.state.genres.slice()} languages={this.state.languages.slice()}
                                    countries={this.state.countries.slice()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Films;
