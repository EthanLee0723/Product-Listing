import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import { useState } from 'react';
import { Toast } from './GeneralComponents';


export default function ContactPage() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNo,setPhoneNo] = useState("");
    const [msg,setMsg] = useState("");
    const [toastMsg,setToastMsg] = useState("");
    const [toastMsgType,setToastMsgType] = useState("success");
    const [toastCount,setToastCount] = useState(0);

    function sendEmail()
    {
        $.ajax({
            url: "/contact/sendContactUsMsg",
            type: "post",
            headers: { "X-CSRF-TOKEN": _token },
            data:{
                name: name,
                email: email,
                contactNo: phoneNo,
                msg: msg
            },
            success:()=>{
                setToastMsg("Message successfully sent!")
                setToastMsgType("success");
                setToastCount(toastCount + 1);
            },
            error: ()=>{
                setToastMsg("Oops we've encountered and error, please try again later.")
                setToastMsgType("error");
                setToastCount(toastCount + 1);
            },
            complete: ()=>{
                setName("")
                setEmail("")
                setPhoneNo("")
                setMsg("")
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
            <Toast 
                msg={toastMsg}
                msgType= {toastMsgType}
                showToastCount = {toastCount}
            />
            <MainFooter/>
        </>
    );
}

if (document.getElementById('contactPage')) {
    ReactDOM.render(<ContactPage />, document.getElementById('contactPage'));
}
