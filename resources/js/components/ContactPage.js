import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import { useState } from 'react';


export default function ContactPage() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNo,setPhoneNo] = useState("");
    const [msg,setMsg] = useState("");

    function sendEmail()
    {
        $.ajax({
            url: "/contact/sendEmail",
            type: "post",
            headers: { "X-CSRF-TOKEN": _token },
            success: ()=>{
                
            }
        })
    }

    return (
        <>
            <MainNavbar/>
            <div id="divContactPageContainer" className='pageContainer'>
                <div>
                    <h1 className='orangeTitle'>Contact Us</h1>
                        <label className='normalText'>Fill in this form and we will get back to you  as soon as possible information that you provided here will be held in our database with the utmost discretion and confidentiality</label>
                        <form>
                            <div className='inputPlaceholderContainer'>
                                <input value={name} onChange={ev=>setName(ev.target.value)} placeholder=' '></input>
                                <label>Name</label>
                            </div>
                            <div className='inputPlaceholderContainer'>
                                <input value={email} onChange={ev=>setEmail(ev.target.value)} placeholder=' '></input>
                                <label>Email*</label>
                            </div>
                            <div className='inputPlaceholderContainer'>
                                <input value={phoneNo} onChange={ev=>setPhoneNo(ev.target.value)} placeholder=' '></input>
                                <label>Phone number</label>
                            </div>
                            <div className='inputPlaceholderContainer'>
                                <input value={msg} onChange={ev=>setMsg(ev.target.value)} placeholder=' '></input>
                                <label>Message</label>
                            </div>
                            <a onClick={sendEmail} className='btnOrange mt-5'>Send</a>
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
