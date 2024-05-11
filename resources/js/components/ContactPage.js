import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';


export default function ContactPage() {
    return (
        <>
            <MainNavbar/>
            <div id="divContactPageContainer" className='pageContainer'>
                <div>
                    <h1 className='orangeTitle'>Contact Us</h1>
                        <label className='normalText'>Fill in this form and we will get back to you  as soon as possible information that you provided here will be held in our database with the utmost discretion and confidentiality</label>
                        <form>
                            <div className='inputPlaceholderContainer'>
                                <input placeholder=' '></input>
                                <label>Name</label>
                            </div>
                            <div className='inputPlaceholderContainer'>
                                <input placeholder=' '></input>
                                <label>Email*</label>
                            </div>
                            <div className='inputPlaceholderContainer'>
                                <input placeholder=' '></input>
                                <label>Phone number</label>
                            </div>
                            <div className='inputPlaceholderContainer'>
                                <input placeholder=' '></input>
                                <label>Message</label>
                            </div>
                            <a className='btnOrange mt-5'>Send</a>
                        </form>

                        <h4 className='normalTitle'>Or contact us directly via</h4>
                        <div children="normalText">Phone: +60 11-2755 9303 (Mr Ong)</div>
                        <div children="normalText">Email: goods2you213@gmail.com</div>
                        <div children="normalText">Operating Hours: Mon - Fri 9am - 6pm</div>
                </div>
            </div>
            <MainFooter/>
        </>
    );
}

if (document.getElementById('contactPage')) {
    ReactDOM.render(<ContactPage />, document.getElementById('contactPage'));
}
