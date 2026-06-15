package grupo3.example.eventovisual.structures;

public class Cola<T> {
    
    private static class Nodo<T> {
        T data;
        Nodo<T> siguiente;

        Nodo(T data) {
            this.data = data;
            this.siguiente = null;
        }
    }

    private Nodo<T> frente;
    private Nodo<T> fin;
    private int tamano;

    public Cola() {
        this.frente = null;
        this.fin = null;
        this.tamano = 0;
    }

    // OPERACIÓN 1: Encolar (Insertar al final)
    public void encolar(T elemento) {
        Nodo<T> nuevoNodo = new Nodo<>(elemento);
        if (estaVacia()) {
            frente = fin = nuevoNodo;
        } else {
            fin.siguiente = nuevoNodo;
            fin = nuevoNodo;
        }
        tamano++;
    }

    // OPERACIÓN 2: Desencolar (Eliminar y devolver el primero)
    public T desencolar() {
        if (estaVacia()) return null;
        T dato = frente.data;
        frente = frente.siguiente;
        if (frente == null) {
            fin = null; 
        }
        tamano--;
        return dato;
    }

    // OPERACIÓN 3: Ver el frente sin eliminarlo
    public T frente() {
        return estaVacia() ? null : frente.data;
    }

    public boolean estaVacia() {
        return frente == null;
    }

    public int getTamano() {
        return tamano;
    }
}