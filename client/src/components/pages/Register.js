import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [secondTime, setSecondTime] = useState(false);
    const navigate = useNavigate ();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/register", {
                username: username,
                email: email,
                password: password
            }, {
                withCredentials: true
            }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    setSecondTime(true);
                } else {
                    navigate('/');
                }
            });
        } catch (error) {
            console.error(error);
        }
      };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch(`${BASE_URL}auth/register`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ username, email, password }),
    //       })
    //       .then((response) => {
    //         if (response.ok) {
    //           // Handle successful login (e.g., redirect to another page)
    //           window.location.href = '/account';
    //         } else {
    //           // Handle login error (e.g., display an error message)
    //           console.error('Login failed');
    //           window.location.href = '/register';
    //         }
    //       })
    //       .catch((error) => {
    //         console.error('Error occurred:', error);
    //       });
    //   };

    return (
        <div className='centeredPage'>
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1eb093c7-f879-4352-9415-18689886b86d/d5f1ip0-d1c2c67d-a622-4dfe-91de-d34f7c5246ee.jpg/v1/fit/w_617,h_413,q_70,strp/taylor_swift__2__by_taylorthepandabear16_d5f1ip0-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDEzIiwicGF0aCI6IlwvZlwvMWViMDkzYzctZjg3OS00MzUyLTk0MTUtMTg2ODk4ODZiODZkXC9kNWYxaXAwLWQxYzJjNjdkLWE2MjItNGRmZS05MWRlLWQzNGY3YzUyNDZlZS5qcGciLCJ3aWR0aCI6Ijw9NjE3In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.n9Nj7mXeHmeb0VrwlLNqmKan94Qru08S2vZXsliOzJA" className="circle-img"/>
            <h1>Welcome to SwiftHelper!</h1>
            <div className='centeredDiv'>
                <h3>Register with your email below:</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="col-12">
                            <div className="form-group">
                                <input className="textbox-12"
                                placeholder="Enter your full name"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                />
                                <span className="focus-border-12"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="col-12">
                            <div className="form-group">
                                <input className="textbox-12"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                                <span className="focus-border-12"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="col-12">
                            <div className="form-group">
                                <input className="textbox-12"
                                placeholder="Enter password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                                <span className="focus-border-12"></span>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit">Register</button>
                </form>
            </div>
            {secondTime && ( // Conditionally render error message if secondTime is true
                <p style={{ color: 'red' }}>This account already exists!</p>
            )}
            <p>Already have an account?<a href="/login"> Log in! </a></p>
        </div>
    );
}

export default Register;