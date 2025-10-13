export async function isLogin() {

    const token = localStorage.getItem("token"); 
    const res = await fetch("http://localhost:3000/appointment/isLogin", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();
    return data;
}


