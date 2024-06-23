import React from "react";
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";

export function Toast({msg = "",msgType = "success",toShow=false})
{
    const [toShowToast,setToShowToast] = useState(false);

    function testing()
    {
        console.log("dhf");
    }
    
    useEffect(()=>{
        if(toShow)
        {
            $(".divToast").addClass("show");
            setTimeout(()=>{
                $(".divToast").removeClass("show");
            },5000);
            setToShowToast(false);
        }
    },[toShow])

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