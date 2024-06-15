import React from 'react';
import ReactDOM from 'react-dom';

export default function ProductsDetailsPage() {
    return (<h1>Testing</h1>);
}

if (document.getElementById('productsDetailsPage')) {
    ReactDOM.render(<ProductsDetailsPage />, document.getElementById('productsDetailsPage'));
}