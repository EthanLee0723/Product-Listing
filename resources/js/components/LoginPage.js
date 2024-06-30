import React from 'react';
import ReactDOM from 'react-dom';


export default function LoginPage() {
    return (
        <div id="divLoginPageContainer">
            <div>
                <h1>Login</h1>
                <div className='w-100'>
                    <div className='inputPlaceholderContainer w-100'>
                        <input id="inLoginEmail" className='form-control' placeholder=' '></input>
                        <label>Email</label>
                    </div>
                    <div className='inputPlaceholderContainer w-100'>
                        <input type='password' id="inLoginPwd" className='form-control' placeholder=' '></input>
                        <label>Password</label>
                    </div>
                </div>
                <button onClick={login} className='btn btnPrimary form-control'>Login</button>
            </div>
        </div> 
    );
}

function login()
{
    $.ajax({
        url: "/login",
        type: "post",
        headers: { 
            'X-CSRF-TOKEN': _token
        },
        data: {
            email: $("#inLoginEmail").val(),
            pwd: $("#inLoginPwd").val()
        },
        success:(response)=>{
            window.location.href = "/products";
        }
    })
}

if (document.getElementById('loginPage')) {
    ReactDOM.render(<LoginPage />, document.getElementById('loginPage'));
}
