import React from 'react';
import ReactDOM from 'react-dom';

export default function AdminSidebar() {
    return (<>
                <div id="divAdminSidebar" className='collapsed'>
                    <div onClick={()=>{window.location.href = "/manageProducts"}}>Products</div>
                    <div onClick={()=>{window.location.href = "/manageCategories"}}>Categories</div>
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