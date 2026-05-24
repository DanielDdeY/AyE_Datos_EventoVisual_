document.addEventListener("DOMContentLoaded", function() {

    // --- REGISTRO --- //
    const registroForm = document.getElementById("registroForm");
    if (registroForm) {
        registroForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            const data = {
                nombre: document.getElementById("nombre").value,
                email: document.getElementById("email").value,
                contrasena: document.getElementById("contrasena").value,
                perfilInicial: document.getElementById("perfilInicial").value
            };

            // Petición AJAX al backend
            fetch("/api/auth/registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => {
                const msgEl = document.getElementById("registro-msg");
                msgEl.style.display = "block";
                if (response.ok) {
                    msgEl.style.color = "green";
                    msgEl.innerText = "¡Registro exitoso! Redirigiendo al login...";
                    setTimeout(() => window.location.href = "login.html", 2000);
                } else {
                    msgEl.style.color = "red";
                    msgEl.innerText = "Error: El email ya está en uso.";
                }
            })
            .catch(error => console.error("Error en AJAX:", error));
        });
    }

    // --- LOGIN --- //
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const data = {
                email: document.getElementById("email").value,
                contrasena: document.getElementById("contrasena").value
            };

            fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); 
                } else {
                    throw new Error("Credenciales incorrectas");
                }
            })
            .then(usuarioDTO => {

                localStorage.setItem("usuarioSesion", JSON.stringify(usuarioDTO));
                
                window.location.href = "dashboard.html";
            })
            .catch(error => {
                document.getElementById("error-msg").style.display = "block";
            });
        });
    }
});