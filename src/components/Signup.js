import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { name, email, password, cpassword } = credentials;
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match!", "danger")
        }
        else {
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyM2YzNzYwMjRmNDRhN2M3ZWNkZTM1In0sImlhdCI6MTY4MDA4NDY4M30.K3_5HXaLuY5Umx53XiDG-zT1hSATr-q1I9THernuxrY' 
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            console.log(json);

            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                props.showAlert("Account Created Successfully", "success")
            }
            else {
                props.showAlert(json.error, "danger");
            }
        }
    }

    const onChange = (e) => {
        // console.log(e.target.email);
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-5'>
            <form onSubmit={handleSubmit}>
                <h1>SignUp on iNoteBook!</h1>
                <div className="mb-3 mt-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name="name" onChange={onChange} minLength={1} required />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" minLength={3} required />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup