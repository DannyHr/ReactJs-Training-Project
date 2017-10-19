import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import ItemsList from './ItemsList.jsx';

var HomePageView = createReactClass({
    contextTypes: {
        store: PropTypes.object
    },
    componentDidMount: function () {
        var store = this.context.store;
        var self = this;
        store.subscribe(function () {
            self.forceUpdate();
        });
    },
    render: function () {
        return (
            <div id='home-page'>
                <ItemsList />
            </div>
        )
    }
});

export default HomePageView;