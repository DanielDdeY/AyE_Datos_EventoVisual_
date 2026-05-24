package grupo3.example.eventovisual.controller;

import org.springframework.stereotype.Component;

@Component 
public class ManejoProyectos {

    private static class ProyectoM {
        String nombreProyecto;
        ProyectoM izquierdo;
        ProyectoM derecho;

        ProyectoM(String nombre) {
            this.nombreProyecto = nombre;
            this.izquierdo = null;
            this.derecho = null;
        }
    }

    private ProyectoM datog;

    public ManejoProyectos() {
        this.datog = null;
    }

    // operacion: Insercion (Para guardar el proyecto en RAM)
    public void insertar(String nombreProyecto) {
        datog = insertarRecursivo(datog, nombreProyecto);
    }

    private ProyectoM insertarRecursivo(ProyectoM nodo, String nombre) {
        if (nodo == null) {
            return new ProyectoM(nombre);
        }
        
        if (nombre.compareToIgnoreCase(nodo.nombreProyecto) < 0) {
            nodo.izquierdo = insertarRecursivo(nodo.izquierdo, nombre);
        } else if (nombre.compareToIgnoreCase(nodo.nombreProyecto) > 0) {
            nodo.derecho = insertarRecursivo(nodo.derecho, nombre);
        }
        
        return nodo; 
    }
}