import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.css';
import $ from 'jquery';

export default function MainNavbar() {
    $(()=>{
        const pathName = window.location.pathname;
        $("#mainNavbarContent a[href='"+pathName+"']").addClass("selected");
    })

    $(window).on("scroll",(ev)=>{
        if($(ev.currentTarget).scrollTop() > 0 && !$("nav").hasClass("scrolled"))
        {
            $("nav").addClass("scrolled");
        }
        else if($(ev.currentTarget).scrollTop() === 0)
        {
            $("nav").removeClass("scrolled");
        }
    })

    return(
        <nav id="navMainNavbar">
            <a href="/home"><label>GTY Solutions</label></a>
            <div id='mainNavbarContent'>
                <a href="/home">Home</a>
                <a href="/about">About</a>
                <a href="/FAQ">FAQ</a>
                <a href="/contact">Contact Us</a>
                <a href="/products">Products</a>
            </div>
        </nav>
    )
}

if (document.getElementById('mainNavbar')) {
    ReactDOM.render(<MainNavbar />, document.getElementById('mainNavbar'));
}