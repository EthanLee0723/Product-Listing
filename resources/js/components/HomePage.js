import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';



export default function HomePage() {

    return (
        <>
            <MainNavbar/>
            <div id="divSimpleQuote">
                <div>
                    <h1>
                        Delivering quality
                        <br></br>
                        goods to you.
                    </h1>
                    <a href="/products" className='btnOrange'>View Products</a>
                </div>
            </div>
            <div id="divHomePageLatestProductsContainer">
                <h2 className='orangeTitle'>Latest products</h2>
                <div id="divProductsContainer">
                    <div>
                        <a></a>
                        <a></a>
                        <a></a>
                    </div>
                    <div>
                        <a></a>
                        <a></a>
                        <a></a>
                    </div>
                    <div>
                        <a></a>
                        <a></a>
                        <a></a>
                    </div>
                </div>
            </div>
            <div id="divHomePageStayInTouchSec">
                <div>
                    <h2>Stay in touch</h2>
                    <label className='normalText'>Stay informed about our latest product releases and promotions! Sign up for our newsletter to receive exclusive updates directly in your inbox.</label>
                    <div>
                        <div className='inputPlaceholderContainer m-0'>
                            <input placeholder=" "></input>
                            <label>Email Address</label>
                        </div>
                        <a className='btnOrange'>Sign up</a>
                    </div>
                </div>
            </div>
            <MainFooter/>
        </>
    );
}

if (document.getElementById('homePage')) {
    ReactDOM.render(<HomePage />, document.getElementById('homePage'));
}
