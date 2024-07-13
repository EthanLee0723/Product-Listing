import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.css';
import '../../library/fontawesome-free-6.5.2-web/js/all.min.js';
import '../../library/fontawesome-free-6.5.2-web/css/all.min.css';
import '../../library/select2-4.1.0-rc.0/dist/css/select2.min.css';
import '../../library/select2-4.1.0-rc.0/dist/js/select2.min.js';
import AdminSidebar from './adminSidebar.js';

export default function MainNavbar() {
    let mainLayout =  <nav id="navMainNavbar">
                            <a href="/home"><label>Goods To You</label></a>
                            <div id='mainNavbarContent'>
                                <a href="/home">Home</a>
                                <a href="/about">About</a>
                                <a href="/products">Products</a>
                                <a href="/FAQ">FAQ</a>
                                <a href="/contact">Contact Us</a>
                            </div>
                        </nav>
    
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

    if(globalData.isAdmin)
    {
        mainLayout = <>
                        {mainLayout}
                        <AdminSidebar />
                    </>
    }

    return mainLayout;
}



if (document.getElementById('mainNavbar')) {
    ReactDOM.render(<MainNavbar />, document.getElementById('mainNavbar'));
}