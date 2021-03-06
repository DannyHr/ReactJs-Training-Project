import React from 'react';
import createReactClass from 'create-react-class';
import Header from './Header.jsx';
import HomePageView from './HomePageView.jsx';
import ItemPreviewContainer from './ItemPreviewContainer.jsx';
import PropTypes from 'prop-types';
import { GLOBALS } from '../common/constants.js';
import { updateAllItems, logoutUser } from '../actions/actionCreators.js';
import { getAllItems } from '../common/requester.js';
import { Item } from '../models/item.js';

var Home = createReactClass({
    contextTypes: {
        store: PropTypes.object,
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
        })
    },
    componentWillMount: function () {
        var self = this;
        var store = self.context.store;
        var userState = store.getState().user;

        if (!userState.userIsLoggedIn) {
            self.context.router.history.push('/login');
        } else {
            getAllItems().then(function (res) {
                var allItems = [];
                res.data.forEach(function (item) {
                    var dateCreated = new Date(item._kmd.ect);
                    var dateModified = new Date(item._kmd.lmt);

                    allItems.push(new Item(item._id, item.name, item.description, item.long_description,
                        item.price, null, dateCreated, dateModified, item.tags));
                });
                store.dispatch(updateAllItems(allItems));
            }).catch(function (err) {
                console.log(err);
                store.dispatch(logoutUser());
                self.context.router.history.push('/');
            });
        }
    },
    componentWillUpdate: function () {
        var store = this.context.store;
        var userState = store.getState().user;

        if (!userState.userIsLoggedIn) {
            this.context.router.history.push('/login');
        }
    },
    render: function () {
        console.log('Home page rendered')
        return (
            <div id="wrapper" className="home-page">
                <Header />
                <HomePageView />
                <ItemPreviewContainer />
            </div>
        );
    }
});

export default Home;