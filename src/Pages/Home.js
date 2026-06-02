import React, { useEffect, useState } from 'react';

import {
  GetCurrentUser,
  LogoutUser
} from '../Services/AccountApi';

import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const checkUser = async () => {

      try {

        const response =
          await GetCurrentUser();

        setUser(response);

      } catch {

        navigate("/login");
      }
    };

    checkUser();

  }, [navigate]);

  const logout = async () => {

    await LogoutUser();

    navigate("/login");
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Home Page</h1>

      <h3>
        Welcome {user?.email}
      </h3>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}