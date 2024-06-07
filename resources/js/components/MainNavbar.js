import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.css';
import '../../library/fontawesome-free-6.5.2-web/js/all.min.js';
import '../../library/fontawesome-free-6.5.2-web/css/all.min.css';
import '../../library/select2-4.1.0-rc.0/dist/css/select2.min.css';
import '../../library/select2-4.1.0-rc.0/dist/js/select2.min.js';
import CategoriesModal from './CategoriesModal.js';
import ProductsModal from './ProductsModal.js';
// import $ from 'jquery';

export default function MainNavbar() {
    let mainLayout =  <nav id="navMainNavbar">
                            <a href="/home"><label>GTY Solutions</label></a>
                            <div id='mainNavbarContent'>
                                <a href="/home">Home</a>
                                <a href="/about">About</a>
                                <a href="/FAQ">FAQ</a>
                                <a href="/contact">Contact Us</a>
                                <a href="/products">Products</a>
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
                        <div id="divAdminSidebar" className='collapsed'>
                            <div onClick={()=>{window.location.href = "/manageProducts"}}>Products</div>
                            <div onClick={()=>{window.location.href = "/manageCategories"}}>Categories</div>
                        </div>
                        <button id="btnAdminSidebar" className='collapsed'>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                        {/* <CategoriesModal/>
                        <ProductsModal/> */}
                    </>
    }

    return mainLayout;
}

$(document).on("click","#btnAdminSidebar",(ev)=>{
    $(ev.currentTarget).find("svg").toggleClass("fa-chevron-right fa-chevron-left");
    $(ev.currentTarget).toggleClass("collapsed expanded");
    $("#divAdminSidebar").toggleClass("collapsed expanded")
})

$(document).on("mousemove",(ev)=>{

    if(globalData.isAdmin)
    {
        if($("#btnAdminSidebar").css("display") === "none" && ev.clientX <= 21.3)
            {
                $("#btnAdminSidebar").css("display","block");
            }
            else if($("#btnAdminSidebar").css("display") === "block" && ev.clientX > 21.3 && $("#divAdminSidebar").hasClass("collapsed"))
            {
                $("#btnAdminSidebar").css("display","none");
            }
    }
})



if (document.getElementById('mainNavbar')) {
    ReactDOM.render(<MainNavbar />, document.getElementById('mainNavbar'));
}