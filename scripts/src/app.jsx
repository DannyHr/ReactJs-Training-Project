ReactDOM.render(
    <ReactRedux.Provider store={appStore}>
        <Main />
    </ReactRedux.Provider>,
    document.getElementById('react-app')
);