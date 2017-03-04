import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Image from 'components/Html/Image';

@connect((store) => ({
    app: store.app
}))
class Main extends Component {

    renderTopBar() {
        const { app } = this.props;
        const logo = <Image className="logo" src="https://www.united.no/wp-content/themes/united/images/logo@2x.png" />

        if (app.offline) {
            return logo;
        }

        return <Link to="/">{logo}</Link>
    }

    render() {

        return (
            <div className="wrap">
                <header className="top-bar">
                    {this.renderTopBar()}
                </header>
                <main>
                    { this.props.children }
                </main>
            </div>
        );
    }
}

export default Main;