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
        this.unsubscribe = store.subscribe(function () {
            self.forceUpdate();
        });
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    render: function () {
        return (
            <div id='home-page-container' className='page-container'>
                <ItemsList />
            </div>
        )
    }
});

export default HomePageView;