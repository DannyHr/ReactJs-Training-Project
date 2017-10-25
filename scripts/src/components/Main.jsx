import React from 'react';
import createReactClass from 'create-react-class';
import Header from './Header.jsx';
import HomePageView from './HomePageView.jsx';
import ItemPreviewContainer from './ItemPreviewContainer.jsx';


var Main = createReactClass({
    render: function () {
        return (
            <div id="wrapper">
                <Header />
                <HomePageView />
                <ItemPreviewContainer />
            </div>
        );
    }
});

export default Main;