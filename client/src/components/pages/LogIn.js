import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [secondTime, setSecondTime] = useState(false);
    const navigate = useNavigate ();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", {
                username: username,
                email: email,
                password: password
            }, {
                withCredentials: true
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    navigate('/');
                } else {
                    setSecondTime(true);
                }
            });
            // console.log(response.data);
        } catch (error) {
            setSecondTime(true);
            console.error(error);
        }
      };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch(`${BASE_URL}auth/login`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ username, email, password }),
    //       })
    //       .then((response) => {
    //         if (response.ok) {
    //           // Handle successful login (e.g., redirect to another page)
    //           console.log('Login succesfull');
    //           console.log(response);
    //           navigate('/account?username='+username);
    //         } else {
    //           // Handle login error (e.g., display an error message)
    //           console.error('Login failed');
    //           setSecondTime(true)
    //         }
    //       })
    //       .catch((error) => {
    //         console.error('Error occurred:', error);
    //       });
    //   };

    return (
        <div className='centeredPage'>
            <img src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2013%2F09%2Ftaylor-swift-08_612x612.jpg" className="circle-img"/>
            <h1>Hello Swiftie! Glad to see you again!</h1>
            <div className='centeredDiv'>
                <h3>Login with your nickname and password</h3>
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
                    <button type="submit">Log In</button>
                </form>
            </div>
            {secondTime && ( // Conditionally render error message if secondTime is true
                <p style={{ color: 'red' }}>Password or username is incorrect</p>
            )}
            <p>First time here?<a href="/register"> Register! </a></p>
        </div>
    );
}

export default Login;