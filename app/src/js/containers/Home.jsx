import React, { Component, PropTypes } from 'react';

import Feed from './Feed';

class Home extends Component {

    render() {
        return (
            <div className="wrap-feed">
                <div className="top-sub-bar">
                    <div className="width-container">
                        <h1 className="hero">Supporters’ Club, Scandinavia</h1>
                    </div>
                </div>
                <Feed />
            </div>
        );
    }
}

export default Home;