import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Header from './Header.jsx'
import HomePageView from './HomePageView.jsx'

var Main = createReactClass({
    render: function () {
        return (
            <div id="wrapper">
                <Header />
                <HomePageView />
            </div>
        );
    }
});

export default Main;