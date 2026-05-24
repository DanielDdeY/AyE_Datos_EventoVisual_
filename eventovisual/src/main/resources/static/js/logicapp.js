//Logica del ajax
document.addEventListener("DOMContentLoaded", () => {

    const usuarioString = localStorage.getItem("usuarioSesion");
    if (!usuarioString) {

        window.location.href = "login.html";
        return;
    }


    const usuario = JSON.parse(usuarioString);
    document.getElementById("bienvenida-usuario").innerText = `¡Hola, ${usuario.nombre}! (${usuario.perfilInicial})`;


    if (usuario.perfilInicial === "ADMINISTRADOR") {
        configurarPanelAdmin();
    } else {
        configurarPanelUsuario(usuario);
    }
});


// MODULO 1: PANEL DEL ADMINISTRADOR //

function configurarPanelAdmin() {
    document.getElementById("panel-admin").classList.remove("hidden");
    document.getElementById("mensaje-vacio").style.display = "none";

    // 1. Función interna para cargar y mostrar proyectos desde el backend
    async function cargarProyectosAdmin(estado) {
        const contenedor = document.getElementById("contenedor-proyectos-admin");
        contenedor.innerHTML = "<p>Cargando proyectos...</p>"; 
        
        try {
            const response = await fetch(`/api/proyectos?estado=${estado}`);
            if (response.ok) {
                const proyectos = await response.json();
                contenedor.innerHTML = ""; 
                
                if (proyectos.length === 0) {
                    contenedor.innerHTML = `<p style="color: gray;">No hay proyectos en estado ${estado}.</p>`;
                    return;
                }

                // Se recorre el JSON y construye el HTML
                proyectos.forEach(proy => {
                    const tarjeta = document.createElement("div");
                    tarjeta.className = "tarjeta";
                    tarjeta.style.width = "300px";
                    tarjeta.style.borderLeft = "4px solid #4CAF50";
                    
                    tarjeta.innerHTML = `
                        <h4 style="margin: 0 0 10px 0;">${proy.nombre}</h4>
                        <p style="font-size: 13px; color: #666;">${proy.descripcion}</p>
                        <p style="font-size: 12px;"><strong>Estado:</strong> ${proy.estadoProyecto}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 10px 0;">
                        <button onclick="asignarJefeAJAX(${proy.idProyecto})" style="background: #2196F3; color: white; border: none; padding: 5px 10px; cursor: pointer; font-size: 12px; border-radius: 3px;">
                             Asignar Jefe
                        </button>
                        <button onclick="invitarUsuarioAJAX(${proy.idProyecto})" style="background: #ff9800; color: white; border: none; padding: 5px 10px; cursor: pointer; font-size: 12px; border-radius: 3px; margin-top: 5px;">
                              Invitar Miembro
                        </button>
                        <button onclick="cargarTablero(${proy.idProyecto}, JSON.parse(localStorage.getItem('usuarioSesion')))" style="background: #9c27b0; color: white; padding: 5px 10px; cursor: pointer; margin-top: 5px;">
                         Ver Tablero</button>
                         <button onclick="crearTareaAdminAJAX(${proy.idProyecto})" style="background: #e91e63; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-top: 5px; margin-left: 4px;">
                          Crear Tarea</button>
                    `;
                    contenedor.appendChild(tarjeta);
                });
            }
        } catch (error) {
            console.error("Error al cargar proyectos del admin:", error);
            contenedor.innerHTML = "<p style='color:red;'>Error de conexión con el servidor.</p>";
        }
    }

    // 2. Disparador inicial: Carga proyectos activos apenas entre el Admin
    cargarProyectosAdmin("ACTIVO");

    // BTN crear proyecto
    document.getElementById("btn-crear-proyecto").addEventListener("click", async () => {
        const nombre = prompt("Ingresa el nombre del nuevo proyecto:");
        const descripcion = prompt("Ingresa una breve descripción:");
        
        if (nombre && descripcion) {
            try {
                const response = await fetch("/api/proyectos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, descripcion })
                });
                
                if (response.ok) {
                    alert("¡Proyecto creado exitosamente!");
                    cargarProyectosAdmin(document.getElementById("filtro-estado").value);
                }
            } catch (error) {
                console.error("Error al crear proyecto:", error);
            }
        }
    });

    document.getElementById("filtro-estado").addEventListener("change", (e) => {
        cargarProyectosAdmin(e.target.value);
    });
}

// Funcion: Asignar Jefe (Llamada desde la tarjeta anterior HTML)
window.asignarJefeAJAX = async function(idProyecto) {
    const emailJefe = prompt("Ingresa el correo del usuario registrado que será el Jefe de Grupo:");
    if (emailJefe) {
        try {
            const response = await fetch(`/api/proyectos/${idProyecto}/jefe?email=${emailJefe}`, {
                method: "PUT"
            });
            const mensaje = await response.text();
            
            if (response.ok) {
                alert("Ok" + mensaje);
            } else {
                alert("Error: " + mensaje);
            }
        } catch (error) {
            console.error("Error al asignar jefe:", error);
        }
    }
};

// MODULO 2: panel del usuario y del jefe
function configurarPanelUsuario(usuario) {
    document.getElementById("panel-usuario").classList.remove("hidden");
    document.getElementById("btn-notificaciones").classList.remove("hidden");
    
    const selectProyectos = document.getElementById("lista-proyectos");
    
    // solo trae los proyectos asignados
    async function cargarProyectosAsignados() {
        try {
            const response = await fetch(`/api/proyectos/mis-proyectos?idUsuario=${usuario.idUsuario}`);
            if (response.ok) {
                const proyectos = await response.json();
                
                if(proyectos.length > 0) {
                    proyectos.forEach(proy => {
                        const option = document.createElement("option");
                        option.value = proy.idProyecto;
                        option.text = proy.nombre;
                        selectProyectos.appendChild(option);
                    });
                    document.getElementById("mensaje-vacio").innerText = "Selecciona un proyecto de la lista para empezar a trabajar.";
                } else {
                    document.getElementById("mensaje-vacio").innerText = "Aún no perteneces a ningún proyecto activo. Revisa tu buzón si tienes invitaciones.";
                }
            }
        } catch (error) {
            console.error("Error obteniendo proyectos del usuario:", error);
        }
    }

    cargarProyectosAsignados();
    
    selectProyectos.addEventListener("change", (e) => {
        const idProyecto = e.target.value;
        if (idProyecto) {
            cargarTablero(idProyecto, usuario);
        }
    });

    // Evento: Abrir buzon de notificaciones
    document.getElementById("btn-notificaciones").addEventListener("click", async () => {
        try {
            const response = await fetch(`/api/notificaciones/pendientes?email=${usuario.email}`);
            if (response.ok) {
                const notificaciones = await response.json();
                if (notificaciones.length === 0) {
                    alert("Tu buzón está vacío. No tienes invitaciones pendientes.");
                    return;
                }

                const notif = notificaciones[0]; 
                const aceptar = confirm(`Tienes una invitación al proyecto: ${notif.nombreProyecto}\n¿Deseas aceptar?`);
                
                if (aceptar) {
                    const resAceptar = await fetch(`/api/notificaciones/${notif.idNotificacion}/aceptar?idUsuario=${usuario.idUsuario}`, { method: "POST" });
                    if (resAceptar.ok) {
                        alert("¡Invitación aceptada! Actualizando tu lista de proyectos...");
                        location.reload(); 
                    }
                }
            }
        } catch (error) {
            console.error("Error al abrir buzón:", error);
        }
    });
    // Evente: Crear Tarea
    document.getElementById("btn-crear-tarea").addEventListener("click", async () => {
        const idProyecto = document.getElementById("lista-proyectos").value;
        const titulo = prompt("Título de la Tarea:");
        const descripcion = prompt("Descripción:");
        
        if (titulo && descripcion) {
            const data = {
                idProyecto: parseInt(idProyecto),
                titulo: titulo,
                descripcion: descripcion,
                prioridad: "MEDIA", 
                idUsuarioAsignado: null 
            };

            try {
                const response = await fetch("/api/tareas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
                
                const msj = await response.text();
                if (response.ok) {
                    alert(" " + msj);
                    cargarTablero(idProyecto, JSON.parse(localStorage.getItem("usuarioSesion"))); 
                } else {
                    alert(" " + msj); 
                }
            } catch (error) {
                console.error("Error al crear tarea:", error);
            }
        }
    });
}

// MODULO 3: Tablero kanban dinamico
window.proyectoActivoTablero = null;
async function cargarTablero(idProyecto, usuarioSesion) {
    window.proyectoActivoTablero = idProyecto;
    const contenedorTablero = document.getElementById("tablero-kanban");
    const msjVacio = document.getElementById("mensaje-vacio");

    try {
        // Tiene que ejecutar la petición AJAX a la API del Tablero 
        const response = await fetch(`/api/tablero/${idProyecto}`);
        
        if (response.status === 403) {
            const errorText = await response.text();
            contenedorTablero.classList.add("hidden");
            msjVacio.innerText = `ACCESO DENEGADO: ${errorText}`;
            msjVacio.style.color = "red";
            document.getElementById("btn-crear-tarea").addEventListener("click", async () => {
                const idProyecto = window.proyectoActivoTablero; 
        
                if (!idProyecto) {
                alert("Error: No se ha seleccionado un proyecto activo.");
                return;
                }

                const titulo = prompt("Título de la Tarea:");
                const descripcion = prompt("Descripción:");
        
                let idAsignado = prompt("ID del usuario responsable (Escribe el número de ID, o déjalo vacío para que la tarea nazca 'Sin Asignar'):");
        
                if (titulo && descripcion) {
                const data = {
                    idProyecto: parseInt(idProyecto),
                    titulo: titulo,
                    descripcion: descripcion,
                    prioridad: "MEDIA", 
                    idUsuarioAsignado: idAsignado ? parseInt(idAsignado) : null 
                };

                try {
                const response = await fetch("/api/tareas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
                
                const msj = await response.text();
                if (response.ok) {
                    alert(" " + msj);
                    cargarTablero(idProyecto, JSON.parse(localStorage.getItem("usuarioSesion"))); 
                } else {
                    alert(" " + msj); 
                }
                } catch (error) {
                console.error("Error al crear tarea:", error);
                    }
                }
            });
        }

        if (response.ok) {
            const matrizHelper = await response.json();
            
            // Si API responde con éxito, se muestra el tablero
            contenedorTablero.classList.remove("hidden");
            msjVacio.style.display = "none";
            document.getElementById("btn-crear-tarea").classList.remove("hidden");

            // Aca se usa Matriz
            const tareasToDo = matrizHelper.matrizTablero[0][0];
            const tareasInProg = matrizHelper.matrizTablero[1][0];
            const tareasInRev = matrizHelper.matrizTablero[2][0];
            const tareasDone = matrizHelper.matrizTablero[3][0];

            // Inyectamos (asi como chensen xd) el HTML dinámicamente
            renderizarColumna("col-todo", tareasToDo, "TO_DO", usuarioSesion);
            renderizarColumna("col-inprogress", tareasInProg, "EN_PROGRESO", usuarioSesion);
            renderizarColumna("col-inreview", tareasInRev, "EN_REVISION", usuarioSesion);
            renderizarColumna("col-done", tareasDone, "TERMINADA", usuarioSesion);
        }
    } catch (error) {
        console.error("Error al cargar el tablero:", error);
    }
}

function renderizarColumna(idColumnaHTML, listaTareas, estadoActual, usuario) {
    const container = document.querySelector(`#${idColumnaHTML} .tarjetas-container`);
    container.innerHTML = ""; 

    listaTareas.forEach(tarea => {
        // Se construye el HTML de la tarjeta basado en el TareaResponseDTO
        const div = document.createElement("div");
        div.className = "tarjeta";
        
        let htmlTarjeta = `
            <strong>${tarea.titulo}</strong>
            <p style="font-size: 12px; color: #555;">${tarea.descripcion}</p>
            <p style="font-size: 12px;"> ${tarea.nombreUsuarioAsignado} | Prioridad: ${tarea.prioridad}</p>
        `;

        // Botones para cambiar de estado
        if (estadoActual === "TO_DO") {
            htmlTarjeta += `<button onclick="avanzarTarea(${tarea.idTarea}, 'EN_PROGRESO')"> Iniciar</button>`;
        } 
        else if (estadoActual === "EN_PROGRESO") {
            htmlTarjeta += `<button onclick="avanzarTarea(${tarea.idTarea}, 'EN_REVISION')"> Enviar a Revisión</button>`;
        } 
        else if (estadoActual === "EN_REVISION") {
            // aceptar o rechazar tareas (solo para jefeesss)
            if (usuario.perfilInicial === "ADMINISTRADOR") { 
                htmlTarjeta += `
                    <button style="background: green; color: white;" onclick="avanzarTarea(${tarea.idTarea}, 'TERMINADA')"> Finalizar</button>
                    <button style="background: red; color: white; margin-top:5px;" onclick="rechazarTarea(${tarea.idTarea})"> Rechazar</button>
                `;
            } else {
                htmlTarjeta += `<p style="font-size: 11px; color: orange;"> Esperando validación de QA/Jefe</p>`;
            }
        }

        div.innerHTML = htmlTarjeta;
        container.appendChild(div);
    });
}

// MODULO 4: funciones de accion (AJAX)
async function avanzarTarea(idTarea, nuevoEstado) {

    const usuarioSesion = JSON.parse(localStorage.getItem("usuarioSesion"));
    const idUsuario = usuarioSesion.idUsuario;

    try {
        console.log(`Llamada AJAX enviada: Moviendo tarea ${idTarea}`);
        
        const response = await fetch(`/api/tareas/${idTarea}/avanzar?idUsuario=${idUsuario}`, {
            method: 'PUT'
        });

        const msj = await response.text();
        
        if (response.ok) {
            alert(" " + msj);
            
            if (window.proyectoActivoTablero) {
                cargarTablero(window.proyectoActivoTablero, usuarioSesion);
            }
        } else {
            alert(" Error: " + msj);
        }
    } catch (error) {
        console.error("Error al avanzar la tarea:", error);
    }
}

async function rechazarTarea(idTarea) {
    const motivo = prompt("Describe el motivo del rechazo para notificar al desarrollador:");
    if (motivo) {
        // Petición AJAX al backend para crear la Notificación de Rechazo y devolverla a En Progreso
        console.log(`Enviando rechazo de tarea ${idTarea}. Motivo: ${motivo}`);
        alert("Tarea rechazada. Notificación insertada en el buzón del usuario.");
    }
}

window.invitarUsuarioAJAX = async function(idProyecto) {
    const email = prompt("Ingresa el correo del desarrollador a invitar:");
    if (email) {
        try {
            const response = await fetch(`/api/notificaciones/invitar?idProyecto=${idProyecto}&email=${email}`, { method: "POST" });
            const mensaje = await response.text();
            alert(response.ok ? " " + mensaje : " " + mensaje);
        } catch (error) {
            console.error("Error al invitar:", error);
        }
    }
};
window.crearTareaAdminAJAX = async function(idProyecto) {
    const titulo = prompt("Título de la Tarea:");
    const descripcion = prompt("Descripción:");
    let idAsignado = prompt("ID del usuario responsable (Escribe el número de ID, o déjalo vacío para 'Sin Asignar'):");

    if (titulo && descripcion) {
        const data = {
            idProyecto: parseInt(idProyecto),
            titulo: titulo,
            descripcion: descripcion,
            prioridad: "MEDIA",
            idUsuarioAsignado: idAsignado ? parseInt(idAsignado) : null
        };

        try {
            const response = await fetch("/api/tareas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            
            const msj = await response.text();
            if (response.ok) {
                alert(" " + msj);
                
                if (window.proyectoActivoTablero === idProyecto) {
                    cargarTablero(idProyecto, JSON.parse(localStorage.getItem("usuarioSesion"))); 
                }
            } else {
                alert(" " + msj); //Si faltan miembros se bloquea (asi como mi cerebro)
            }
        } catch (error) {
            console.error("Error al crear tarea desde admin:", error);
        }
    }
};