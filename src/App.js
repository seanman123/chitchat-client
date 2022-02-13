import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyPosts from './pages/MyPosts';
import Post from './pages/Post';
import NavBar from './components/NavBar';
import About from './pages/About';
import './App.css';
import jwt_decode from 'jwt-decode';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
    const token = localStorage.getItem('token');
		
    if (token) {
      const user = jwt_decode(token);
      fetch(`${process.env.REACT_APP_SERVER_URL}/userAuth`, {
        headers: {
          "x-auth-token": localStorage.getItem('token')
        }
      }).then((res) => {
        if (!res.ok) {
          localStorage.removeItem('token');
					if (!window.location.toString().includes('/login')
					&& !window.location.toString().includes('/register')) {
						window.location.href = '/login';
					}
        } else {
					setUser(user);
				}
      });
    } else {
			if (!window.location.toString().includes('/login')
			&& !window.location.toString().includes('/register')) {
				window.location.href = '/login';
			}
    }
  }, []);

	return (
		<div>
			<NavBar />
			<BrowserRouter>
				<Routes>
					<Route path="/" exact element={<Navigate replace to="/login" />}/>
					<Route path="/login" exact element={<Login user={user} />} />
					<Route path="/register" exact element={<Register />} />
					<Route path="/dashboard" exact element={<Dashboard user={user} />} />
					<Route path="/my-posts" exact element={<MyPosts user={user} />} />
					<Route path="/post" exact element={<Post user={user} />} />
					<Route path="/about" exact element={<About />}/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
