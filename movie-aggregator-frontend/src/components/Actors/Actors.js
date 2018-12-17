import React, { Component } from 'react';
import api from "../../api";
import './Acrors.css';

import ActorDemo from "./ActorDemo/ActorDemo";
import PageLinks from "../PageLinks/PageLinks";
import ActorFilter from "./ActorFilter/ActorFilter";
import Loading from "../Loading/Loading";


class Actors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevPage: undefined,
            nextPage: undefined,
            totalPages: undefined,
            actors: null,

            currentPage: 1,
        };

        this.filterRef = React.createRef();
    }

    async componentWillMount() {
        await this.fetchPage(this.state.currentPage);
    }

     fetchPage = async (page) => {
        const filters = this.filterRef.current ? this.filterRef.current.state : {};
        const res = await api.actors.getAll(page, filters);

        this.setState({
            actors: res.data,
            totalPages: res.total_pages,
            prevPage: res.prev_page,
            nextPage: res.next_page,
            currentPage: page,
        });
    };

    render() {
        if (!this.state.actors) {
            return(<Loading/>);
        }

        return(
            <div className='actors-main'>
                <div className='actors-title'>
                    <h2>Actors</h2>
                </div>
                {
                    this.state.actors.length ? null :
                        <div className='actors-nothing col-9'>
                            <h4>Nothing to show :C</h4>
                        </div>
                }
                <div className='actors-middle'>
                    <div className='col-9'>
                        <div>
                            {this.state.actors.map(actor => <ActorDemo key={actor.id} {...actor}/>)}
                        </div>
                        <div>
                            <PageLinks prevPage={this.state.prevPage}
                                       currentPage={this.state.actors.length ? this.state.currentPage : undefined}
                                       nextPage={this.state.nextPage}
                                       totalPages={this.state.totalPages}
                                       fetchPage={this.fetchPage}
                            />
                        </div>
                    </div>
                    <div className='actors-filter col-3'>
                        <ActorFilter ref={this.filterRef} submit={async () => await this.fetchPage(1)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Actors;
