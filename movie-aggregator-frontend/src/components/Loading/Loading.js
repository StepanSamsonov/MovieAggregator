import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import './Loading.css';


class Loading extends Component {
    render() {
        return(
            <div className='loading'>
                <ClipLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={true}
                />
            </div>
        );
    }
}

export default Loading;
