import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import ProductPageView from './ProductPageView.jsx';
import { GLOBALS } from '../common/constants.js';
import { updateAllItems, logoutUser } from '../actions/actionCreators.js';
import { Item } from '../models/item.js';
import { getItem } from '../common/requester.js';

var Product = createReactClass({
    contextTypes: {
        store: PropTypes.object,
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
        })
    },
    getInitialState: function () {
        return {
            currentItem: null
        };
    },
    componentWillMount: function () {
        var self = this;
        var store = self.context.store;
        var userState = store.getState().user;

        if (!userState.userIsLoggedIn) {
            self.context.router.history.push('/login');
        }

        var id = self.props.match.params.id;
        getItem(id)
            .then(function (res) {
                console.log(res);
                var item = res.data[0]
                self.setState({ currentItem: new Item(item._id, item.name, item.description, item.price) });
            })
            .catch(function (err) {
                console.log(err);
            });
    },
    render: function () {
        console.log('Product page rendered')
        return (
            <div id="wrapper" className="product-page">
                <Header />
                <ProductPageView item={this.state.currentItem} />
            </div>
        );
    }
});

export default Product;