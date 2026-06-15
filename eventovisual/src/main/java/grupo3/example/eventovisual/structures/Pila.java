package grupo3.example.eventovisual.structures;

public class Pila<T> {

    private static class Nodo<T> {
        T data;
        Nodo<T> siguiente;

        Nodo(T data) {
            this.data = data;
            this.siguiente = null;
        }
    }

    private Nodo<T> cima;
    private int tamano;

    public Pila() {
        this.cima = null;
        this.tamano = 0;
    }

    // OPERACION 1: Apilar (Push - Insertar arriba)
    public void apilar(T elemento) {
        Nodo<T> nuevoNodo = new Nodo<>(elemento);
        nuevoNodo.siguiente = cima;
        cima = nuevoNodo;
        tamano++;
    }

    // OPERACION 2: Desapilar (Pop - Eliminar y devolver el de arriba)
    public T desapilar() {
        if (estaVacia()) return null;
        T dato = cima.data;
        cima = cima.siguiente;
        tamano--;
        return dato;
    }

    // OPERACION 3: Ver la cima sin eliminarla (Peek)
    public T cima() {
        return estaVacia() ? null : cima.data;
    }

    public boolean estaVacia() {
        return cima == null;
    }

    public int getTamano() {
        return tamano;
    }
}
