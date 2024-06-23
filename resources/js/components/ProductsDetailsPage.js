import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect,useState } from 'react';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function ProductsDetailsPage() {
    const [searchTxt,setSearchTxt] = useState("");
    const prdViewImgElements = prdDetails.images?prdDetails.images.map((val,ind)=>{
        return <div key={ind} className='displayImg' style={{ backgroundImage: 'url("'+window.location.origin+'/images/products/'+val.imgName+'")' }} ></div>
    }):[];

    const prdViewImgSelectionElements = prdDetails.images?prdDetails.images.map((val,ind)=>{
        return <div key={ind} onClick={()=>{ viewSelectedImg(ind) }} className='displayImg' style={{ backgroundImage: 'url("'+window.location.origin+'/images/products/'+val.imgName+'")' }}></div>
    }):[];

    const prdDescriptionElement = prdDetails.product_details?prdDetails.product_details.map((val,ind)=>{
        const arrContents = val.content.split(/(?:\r\n|\r|\n)/g)
        return <div key={ind}>
            <strong>{val.title}</strong>
            <div>
                {arrContents.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index !== arrContents.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    }):[];

    const prdTblDetailsElement = prdDetails.product_table_details?prdDetails.product_table_details.map((val,ind)=>{
        return <div key={ind}>
            <div>{val.title}</div>
            <div>{val.content}</div>
        </div>
    }):[];

    $(window).resize(()=>{
        resizeDisplayImgImgWidth();
    })

    $(()=>{
        resizeDisplayImgImgWidth();
    })

    function resizeDisplayImgImgWidth()
    {
        const imgWidthToSetElements =  $(".divPrdDetailsImgContainer > div:nth-of-type(2) > div > div");
        imgWidthToSetElements.each((ind,val)=>{
            $(val).css("width",getDisplayImgElementWidth()+"px");
        })

        $(".divPrdDetailsImgContainer > div:nth-of-type(2) > div").css("width",imgWidthToSetElements.length * getDisplayImgElementWidth()+"px")
    }

    function viewSelectedImg(imgInd)
    {
        $(".divPrdDetailsImgContainer > div:nth-of-type(2) > div").css("left","-"+getDisplayImgElementWidth() * imgInd +"px");
    }

    function getDisplayImgElementWidth()
    {
        return $(".divPrdDetailsImgContainer > div:nth-of-type(2)").width();
    }

    function getColorVarElements()
    {
        if(prdDetails.color_variation)
        {
            const colorvarElements = prdDetails.color_variation.map((val,ind)=>{
                return <div key={ind} style={{backgroundColor: val.color}}></div>
            })

            return <div className='prdDetailsColorVarSection'>
                <div><label>Color</label><hr></hr></div>
                <div>{colorvarElements}</div>
            </div>
        }
        else 
        {
            return null;
        }
    }

    function whatsAppEnquiry()
    {
        window.location.href = "https://wa.me/+60182160332";
    }

    return (
        <>
            <MainNavbar/>
            <div className='pageContainer'>
                <div className='divPrdDetailsContainer'>
                    <div className='divPrdDetailsImgContainer'>
                        <div className='divSearchBar'>
                            <input className='form-control' onChange={ ev=>setSearchTxt(ev.target.value) } value={searchTxt} placeholder='Search...'></input>
                            <button onClick={ ()=>window.location.href = "/products?searchTxt="+searchTxt } className='btn btnPrimary'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        <div>
                            <div>
                                {prdViewImgElements}
                            </div>
                        </div>
                        <div>
                            {prdViewImgSelectionElements}
                        </div>
                    </div>
                    <div>
                        <div className='divDetailLinks'>
                            <a href='/products'>All products</a>
                            {prdDetails.category_id && (<a href={'/products?categoryId='+prdDetails.category_id}>{prdDetails.category_name}</a>)}
                            {prdDetails.subcategory_id && (<a href={'/products?subcategoryId='+prdDetails.subcategory_id}>{prdDetails.subcategory_name}</a>)}
                            <a>{prdDetails.product_name}</a>
                        </div>
                        <h1>{prdDetails.product_name}</h1>
                        <div>{getColorVarElements()}</div>
                        <div className='divPrdDetails'>
                            <h3>RM {prdDetails.price}</h3>
                            <div>Available: {prdDetails.stock_count} Units</div>
                            <button className='btn' onClick={whatsAppEnquiry}>
                                <FontAwesomeIcon icon={faWhatsapp} style={{color: "#ffffff",}} />
                                More Enquiry
                            </button>
                        </div>
                    </div>
                </div>
                <div className='divPrdDescription'>
                    <div>
                        {prdDescriptionElement}
                    </div>
                </div>
                <div className='divPrdTblDetails'>
                    <div>
                        {prdTblDetailsElement}
                    </div>
                </div>
            </div>
            <MainFooter/>
        </>);
}

if (document.getElementById('productsDetailsPage')) {
    ReactDOM.render(<ProductsDetailsPage />, document.getElementById('productsDetailsPage'));
}