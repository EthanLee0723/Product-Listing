import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';


export default function ProductsPage() {
    return (
        <>
            <MainNavbar/>
            <div className='pageContainer'>
            </div>
            <MainFooter/>
        </>
    );
}

if (document.getElementById('productsPage')) {
    ReactDOM.render(<ProductsPage />, document.getElementById('productsPage'));
}
