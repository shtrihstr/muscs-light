import React, { Component } from 'react';

export default class Author extends Component {

    render() {

        const { user } = this.props;

        if (!user) {
            return (
                <div className="author loader">
                    <div className="author-avatar loader"></div>
                    <strong className="author-name loader">&nbsp;</strong>
                </div>
            );
        }

        const src = user.avatar.replace(/^http:/, 'https:');

        return (
            <div className="author">
                <div className="author-avatar">
                    <img src={src} />
                </div>
                <strong className="author-name">{user.name}</strong>
                <div className="author-role">Journalist</div>
            </div>
        );
    }
}

