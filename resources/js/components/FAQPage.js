import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';


export default function FAQPage() {
    return (
        <>
            <MainNavbar/>
            <div id="divFAQPageContainer" className='pageContainer'>
                <h1 className='orangeTitle'>Frequently Asked Questions</h1>
                <div>
                    <h4>Is there minimum order quantity?</h4>
                    <label>
                        We do have a small minimum order quantity, let us know how many units you are looking to produce, 
                        and we can advise a suitable product to tailor to your budget and ideas. The MOQ is subject to product type and 
                        whether they are ready-made or custom-made. 
                    </label>
                </div>
                <div>
                    <h4>Are you only supplying the product on your website?</h4>
                    <label>
                        The products shown in our website are just some samples and examples for illustration purposes so you get an idea of what we are able to produce. 
                        We are able to supply a wide range of customization merchandise, gifts, stationery, bags and many more, so do contact us if you have anything in specific that you'd like to customize, 
                        but did not see in our website.
                    </label>
                </div>
                <div>
                    <h4>If I'm interested to produce something, but I do not have any ideas, can you advise?</h4>
                    <label>
                        Most certainly, we take pride in providing a bespoke full service from product selection to design and delivery. 
                        If you're not sure what's a suitable gift or merchandise to produce, we can help recommend something impact and memorable to your intended audience. 
                        Even if you have an idea of what you want, but design is not your expertise, we can also help you design & customize your brand into the products that you are interested in.
                    </label>
                </div>
                
            </div>
            <MainFooter/>
        </>
    );
}

if (document.getElementById('faqPage')) {
    ReactDOM.render(<FAQPage />, document.getElementById('faqPage'));
}
