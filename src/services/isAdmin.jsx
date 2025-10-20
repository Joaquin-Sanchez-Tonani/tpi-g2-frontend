export async function isAdmin() {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch("http://localhost:3000/appointment/isAdmin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        return data; 

    } catch (err) {
        console.error("Error en isAdmin:", err);
    }
}


