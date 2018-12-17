import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FilmFilter.css';


class FilmFilter extends Component {
    static propTypes = {
        submit: PropTypes.func,
        genres: PropTypes.arrayOf(PropTypes.object),
        languages: PropTypes.arrayOf(PropTypes.string),
        countries: PropTypes.arrayOf(PropTypes.string),
    };

    constructor(props) {
        super(props);
        this.state = {
            nameFilter: '',
            budgetFromFilter: 0,
            budgetToFilter: 1000000000,

            languages: [],
            languagesFilter: [],

            countries: [],
            countriesFilter: [],

            genres: [],
            genresFilter: [],

            withReviewsFilter: 'all',

            showLanguages: false,
            showCountries: false,
            showGenres: false,
        };
    }

    componentDidMount() {
        this.setState({
            languages: this.props.languages.slice(),
            languagesFilter: this.props.languages.slice(),

            countries: this.props.countries.slice(),
            countriesFilter: this.props.countries.slice(),

            genres: this.props.genres.slice(),
            genresFilter: this.props.genres.map(genre => genre.id),
        });
    }

    submit = (event) => {
        event.preventDefault();
        this.props.submit();
    };

    clickCheckbox = (name, value) => {
        const filter = this.state[name];
        const valueIndex = filter.indexOf(value);

        if (valueIndex === -1) {
            filter.push(value);
        } else {
            filter.splice(valueIndex, 1);
        }

        this.setState({[name]: filter});
    };

    setAll = (name) => {
        let filter = this.state[name+'Filter'];

        filter = filter.length ? [] : this.props[name].slice();
        filter = name === 'genres' ? filter.map(filter => filter.id) : filter;

        this.setState({[name+'Filter']: filter});
    };

    render() {
        return(
            <form className='films-filter card' onSubmit={this.submit}>
                <div className='card-body'>
                    <div className='films-filter-element list-group-item'>
                        <label className='col-form-label col-4'>Name:</label>
                        <div className='col-8'>
                            <input className='form-control' value={this.state.nameFilter}
                                   onChange={(e) => this.setState({nameFilter: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='films-filter-element list-group-item'>
                        <label className='col-form-label col-4'>Reviews:</label>
                        <div className='col-8'>
                            <select className='form-control' value={this.state.withReviewsFilter}
                                    onChange={(e) => this.setState({withReviewsFilter: e.target.value})}
                            >
                                <option value='all'>All</option>
                                <option value='yes'>Yes</option>
                                <option value='no'>No</option>
                            </select>
                        </div>
                    </div>
                    <div className='list-group-item films-filter-budget'>
                        <label className='col-4'>Budget</label>
                        <div className='films-filter-element'>
                            <label className='col-form-label col-4'>From:</label>
                            <div className='col-8'>
                                <input type='number' className='form-control' max={this.state.budgetToFilter}
                                       value={this.state.budgetFromFilter}
                                       onChange={(e) => this.setState({budgetFromFilter: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className='films-filter-element'>
                            <label className='col-form-label col-4'>To:</label>
                            <div className='col-8'>
                                <input type='number' className='form-control' min={this.state.budgetFromFilter}
                                       value={this.state.budgetToFilter}
                                       onChange={(e) => this.setState({budgetToFilter: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='list-group-item'>
                        <label className='col-5'>Languages:</label>
                        <input type='button' className='btn btn-secondary col-7'
                               value={this.state.showLanguages ? 'Hide' : 'Show'}
                               onClick={() => this.setState({showLanguages: !this.state.showLanguages})}
                        />
                        <div className='films-filter-languages'>
                            {
                                this.state.showLanguages ?
                                    <div className='films-filter-languages-element'>
                                        <label>All</label>
                                        <input type='checkbox'
                                               checked={this.state.languagesFilter.length === this.state.languages.length}
                                               onChange={() => this.setAll('languages')}
                                        />
                                    </div>
                                : null
                            }
                            {
                                this.state.showLanguages ?
                                    this.state.languages.filter(language => language).map((value) =>
                                        <div className='films-filter-languages-element' key={value}>
                                            <label>{value}</label>
                                            <input type='checkbox'
                                                   checked={this.state.languagesFilter.indexOf(value) !== -1}
                                                   onChange={() => this.clickCheckbox('languagesFilter', value)}
                                            />
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                    </div>
                    <div className='list-group-item'>
                        <label className='col-5'>Countries:</label>
                        <input type='button' className='btn btn-secondary col-7'
                               value={this.state.showCountries ? 'Hide' : 'Show'}
                               onClick={() => this.setState({showCountries: !this.state.showCountries})}
                        />
                        <div className='films-filter-countries'>
                            {
                                this.state.showCountries ?
                                    <div className='films-filter-countries-element'>
                                        <label>All</label>
                                        <input type='checkbox'
                                               checked={this.state.countriesFilter.length === this.state.countries.length}
                                               onChange={() => this.setAll('countries')}
                                        />
                                    </div>
                                    : null
                            }
                            {
                                this.state.showCountries ?
                                    this.state.countries.filter(country => country).map((value) =>
                                        <div className='films-filter-countries-element' key={value}>
                                            <label>{value}</label>
                                            <input type='checkbox'
                                                   checked={this.state.countriesFilter.indexOf(value) !== -1}
                                                   onChange={() => this.clickCheckbox('countriesFilter', value)}
                                            />
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                    </div>
                    <div className='list-group-item'>
                        <label className='col-5'>Genres:</label>
                        <input type='button' className='btn btn-secondary col-7'
                               value={this.state.showGenres ? 'Hide' : 'Show'}
                               onClick={() => this.setState({showGenres: !this.state.showGenres})}
                        />
                        <div className='films-filter-genres'>
                            {
                                this.state.showGenres ?
                                    <div className='films-filter-genres-element'>
                                        <label>All</label>
                                        <input type='checkbox'
                                               checked={this.state.genresFilter.length === this.state.genres.length}
                                               onChange={() => this.setAll('genres')}
                                        />
                                    </div>
                                    : null
                            }
                            {
                                this.state.showGenres ?
                                    this.state.genres.map((genre) =>
                                        <div className='films-filter-genres-element' key={genre.name}>
                                            <label>{genre.name}</label>
                                            <input type='checkbox'
                                                   checked={this.state.genresFilter.indexOf(genre.id) !== -1}
                                                   onChange={() => this.clickCheckbox('genresFilter', genre.id)}
                                            />
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                    </div>
                    <div className='films-filter-search'>
                        <input type='submit' className='btn btn-primary' value='Search'/>
                    </div>
                </div>
            </form>
        );
    }
}

export default FilmFilter;
