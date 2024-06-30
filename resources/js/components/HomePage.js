import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import { useState, useEffect } from 'react';
import { Toast } from './GeneralComponents';


export default function HomePage() {
    const [toastMsg,setToastMsg] = useState("");
    const [toastMsgType,setToastMsgType] = useState("success");
    const [toastCount,setToastCount] = useState(0);
    const [newsletterEmail,setNewsletterEmail] = useState("");
    const [latestPrd,setLatestPrd] = useState([]);
    const [latestPrdElement,setLatestPrdElement] = useState();

    useEffect(()=>{
        $.ajax({
            url: "http://192.168.100.66:8080/home/getLatestPrd",
            type: "get",
            success: (data)=>{
                setLatestPrd(data);
            }
        })
    },[]);

    useEffect(()=>{
        setLatestPrdElement(latestPrd.map((val,ind)=>{
            return <div key={ind} onClick={()=> window.location.href = "/products/productDetails/"+val.id} style={{backgroundImage: "url("+window.location.origin+"/images/products/"+val.images[0].imgName+")"}}></div>
        }))
    },[latestPrd])


    function signUpNewsletter()
    {
        $.ajax({
            url: "http://192.168.100.66:8080/home/signUpNewsletter",
            type: "post",
            headers: { 'X-CSRF-TOKEN':  _token},
            data: { newsletterEmail: newsletterEmail },
            success:()=>{
                setToastMsg("You have successfully signed up to our newsletter!")
                setToastMsgType("success");
                setToastCount(toastCount + 1);
            },
            error: ()=>{
                setToastMsg("Oops we've encountered and error, please try again later.")
                setToastMsgType("error");
                setToastCount(toastCount + 1);
            },
            complete: ()=>setNewsletterEmail("")
        })
    }
    
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
                    {latestPrdElement}
                </div>
            </div>
            <div id="divHomePageStayInTouchSec">
                <div>
                    <h2>Stay in touch</h2>
                    <label className='normalText'>Stay informed about our latest product releases and promotions! Sign up for our newsletter to receive exclusive updates directly in your inbox.</label>
                    <div>
                        <div className='inputPlaceholderContainer m-0'>
                            <input onChange={ ev=>setNewsletterEmail(ev.target.value) } value={newsletterEmail} placeholder=" "></input>
                            <label>Email Address</label>
                        </div>
                        <a onClick={ signUpNewsletter } className='btnOrange'>Sign up</a>
                    </div>
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

if (document.getElementById('homePage')) {
    ReactDOM.render(<HomePage />, document.getElementById('homePage'));
}
