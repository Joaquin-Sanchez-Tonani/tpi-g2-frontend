import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PageNotFound from "../layout/PageNotFound";

export default function Administration() {
  const [isAdmin, setIsAdmin] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/auth/isAdmin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response administracion:", data);
        setIsAdmin(data.ok); 
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsAdmin(false); 
      });
  }, []);

  if (isAdmin === null) {
    return <h2>Loading...</h2>; 
  }

  if (!isAdmin) {
    return <PageNotFound/>; // aca hay q usar un <Forbidden /> 
  }

  return <h1>Bienvenido y permisos</h1>;
}
