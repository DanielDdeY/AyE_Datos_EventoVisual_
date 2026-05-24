package grupo3.example.eventovisual.structures;

import java.util.Comparator;

public class ListaSimpleEnlazada<T> {

    // Clase Nodo interna que representa el TAD encapsulado
    private static class Nodo<T> {
        T data;
        Nodo<T> siguiente;

        Nodo(T data) {
            this.data = data;
            this.siguiente = null;
        }
    }

    private Nodo<T> cabeza;
    private int tamano;

    public ListaSimpleEnlazada() {
        this.cabeza = null;
        this.tamano = 0;
    }

    // operacion: insercion (Al final de la lista)
    public void insertar(T elemento) {
        Nodo<T> nuevoNodo = new Nodo<>(elemento);
        if (cabeza == null) {
            cabeza = nuevoNodo;
        } else {
            Nodo<T> actual = cabeza;
            while (actual.siguiente != null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
        tamano++;
    }

    // 2. operacion: eliminacion (lo que hizo ella de su vida contigo)
    public boolean eliminar(int indice) {
        if (indice < 0 || indice >= tamano || cabeza == null) return false;

        if (indice == 0) {
            cabeza = cabeza.siguiente;
        } else {
            Nodo<T> actual = cabeza;
            for (int i = 0; i < indice - 1; i++) {
                actual = actual.siguiente;
            }
            actual.siguiente = actual.siguiente.siguiente;
        }
        tamano--;
        return true;
    }

    // 3. operacion: buscando a nemo (Devuelve el elemento si cumple con un criterio)
    public T obtener(int indice) {
        if (indice < 0 || indice >= tamano) return null;
        Nodo<T> actual = cabeza;
        for (int i = 0; i < indice; i++) {
            actual = actual.siguiente;
        }
        return actual.data;
    }

    // 4. operacion: recorrer (Devuelve el tamaño actual para iteraciones externas)
    public int getTamano() {
        return this.tamano;
    }

    public boolean estaVacia() {
        return cabeza == null;
    }

    // 5. OPERACIÓN: ordenar (Algoritmo Bubble Sort para las notificaciones)
    public void ordenar(Comparator<T> comparador) {
        if (tamano > 1) {
            boolean cambiado;
            do {
                cambiado = false;
                Nodo<T> actual = cabeza;
                Nodo<T> siguiente = cabeza.siguiente;
                while (siguiente != null) {
                    if (comparador.compare(actual.data, siguiente.data) > 0) {
                        // Intercambio de la información interna del nodo
                        T temporal = actual.data;
                        actual.data = siguiente.data;
                        siguiente.data = temporal;
                        cambiado = true;
                    }
                    actual = siguiente;
                    siguiente = siguiente.siguiente;
                }
            } while (cambiado);
        }
    }
}
