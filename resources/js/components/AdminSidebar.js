import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function AdminSidebar() {
    return (<>
                <div id="divAdminSidebar" className='collapsed'>
                    <div className='divAdminSidebarTitle'>Admin Dashboard</div>
                    <div onClick={()=>{window.location.href = "/"}}>
                        <FontAwesomeIcon icon={faHouse} />
                        Home
                    </div>
                    <div onClick={()=>{window.location.href = "/manageProducts"}}>
                        <i className="fa-solid fa-box"></i>
                        Products
                    </div>
                    <div onClick={()=>{window.location.href = "/manageCategories"}}>
                        <i className="fa-solid fa-list"></i>
                        Categories
                    </div>
                    <div onClick={()=>{window.location.href = "/logout"}}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                    </div>
                </div>
                <button id="btnAdminSidebar" className='collapsed'>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </>);
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

if (document.getElementById('adminSidebar')) {
    ReactDOM.render(<AdminSidebar />, document.getElementById('adminSidebar'));
}