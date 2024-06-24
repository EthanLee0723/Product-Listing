import React from "react";
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";

export function Toast({msg = "",msgType = "success",showToastCount})
{
    const [showToast,setToShowToast] = useState(0);

    if(showToastCount !== showToast)
    {
        setToShowToast(showToastCount);
    }
    
    useEffect(()=>{
        if(showToast !== 0)
        {
            console.log()
            $(".divToast").addClass("show");
            setTimeout(()=>{
                $(".divToast").removeClass("show");
            },5000);
        }
    },[showToastCount])

    $(()=>{
        adjustToastPos();
    })

    $(window).on('resize',()=>{
        adjustToastPos();
    })

    function adjustToastPos()
    {
        $('.divToast').css("left",$(window).width() / 2 - $('.divToast')[0].getBoundingClientRect().width / 2 +"px")
    }

    return (<div className={"divToast "+msgType}>
        {msg}
    </div>)
}