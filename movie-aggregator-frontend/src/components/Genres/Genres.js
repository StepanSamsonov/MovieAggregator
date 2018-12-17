import React, { Component } from 'react';
import './Genres.css';
import PageLinks from "../PageLinks/PageLinks";
import api from "../../api";
import GenreDemo from "./GenreDemo/GenreDemo";
import GenreFilter from "./GenreFilter/GenreFilter";
import Loading from "../Loading/Loading";


class Genres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevPage: undefined,
            nextPage: undefined,
            totalPages: undefined,
            genres: null,

            currentPage: 1,
        };

        this.filterRef = React.createRef();
    }

    async componentWillMount() {
        await this.fetchPage(this.state.currentPage);
    }

    fetchPage = async (page) => {
        const filters = this.filterRef.current ? this.filterRef.current.state : {};
        const res = await api.genres.getAll(page, filters);

        this.setState({
            genres: res.data,
            totalPages: res.total_pages,
            prevPage: res.prev_page,
            nextPage: res.next_page,
            currentPage: page,
        });
    };

    render() {
        if (!this.state.genres) {
            return(<Loading/>);
        }

        return(
            <div className='genres-main'>
                <div className='genres-title'>
                    <h2>Genres</h2>
                </div>
                {
                    this.state.genres.length ? null :
                        <div className='genres-nothing col-9'>
                            <h4>Nothing to show :C</h4>
                        </div>
                }
                <div className='genres-middle'>
                    <div className='col-9'>
                        <div>
                            {this.state.genres.map(genre => <GenreDemo key={genre.id} {...genre}/>)}
                        </div>
                        <div>
                            <PageLinks fetchPage={this.fetchPage}
                                       nextPage={this.state.nextPage}
                                       currentPage={this.state.genres.length ? this.state.currentPage : undefined}
                                       prevPage={this.state.prevPage}
                                       totalPages={this.state.totalPages}
                            />
                        </div>
                    </div>
                    <div className='genres-filter col-3'>
                        <GenreFilter ref={this.filterRef} submit={async () => await this.fetchPage(1)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Genres;
