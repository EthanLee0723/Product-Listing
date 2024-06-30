import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';


export default function AboutPage() {
    return (
        <>
            <MainNavbar/>
            <div id="divAboutPageContentContainer" className='pageContainer'>
                <div>
                    <div>
                        <h1 className='orangeTitle'>About Us</h1>
                        <label>
                            Goods To You Solution is a one-stop center on Corporate & Premium Gifts. We are here to fulfil customer needs in providing a creative, 
                            innovative and inspiring ideas using our services and products that we carry. We have a large variety of products ranging from bags, pens, 
                            household items, dairies & calendars, Eco products, umbrellas, desktop items, lanyards, bottles & mugs. etc. Throughout our years in the business, 
                            we have our own specialties & standby-ready products at our warehouse waiting to deliver at any time. 
                            <br></br>
                            <br></br>
                            Choose Goods To You Solution for personalized premium corporate gifts supplier that reflect your brand's values and image. 
                            Let us help you create lasting impressions that matter.
                        </label>
                    </div>
                </div>
                <div id="divAboutPageImg">

                </div>
            </div>
            <MainFooter/>
        </>
    );
}

if (document.getElementById('aboutPage')) {
    ReactDOM.render(<AboutPage />, document.getElementById('aboutPage'));
}
