package grupo3.example.eventovisual.structures;

import java.util.Comparator;

public class ListaDobleEnlazada<T> {

    private static class NodoDoble<T> {
        T data;
        NodoDoble<T> siguiente;
        NodoDoble<T> anterior;

        NodoDoble(T data) {
            this.data = data;
            this.siguiente = null;
            this.anterior = null;
        }
    }

    private NodoDoble<T> cabeza;
    private NodoDoble<T> cola;
    private int tamano;

    public ListaDobleEnlazada() {
        this.cabeza = null;
        this.cola = null;
        this.tamano = 0;
    }

    // 1. operacion: insercion (Al final - O(1) gracias al puntero cola)
    public void insertar(T elemento) {
        NodoDoble<T> nuevoNodo = new NodoDoble<>(elemento);
        if (cabeza == null) {
            cabeza = nuevoNodo;
            cola = nuevoNodo;
        } else {
            cola.siguiente = nuevoNodo;
            nuevoNodo.anterior = cola;
            cola = nuevoNodo;
        }
        tamano++;
    }

    // 2. operacion: eliminacion (Busca y destruye un nodo rompiendo enlaces bidireccionales)
    public boolean eliminarElemento(T elemento) {
        NodoDoble<T> actual = cabeza;
        while (actual != null) {
            if (actual.data.equals(elemento)) {
                if (actual == cabeza) {
                    cabeza = cabeza.siguiente;
                    if (cabeza != null) cabeza.anterior = null;
                    else cola = null;
                } else if (actual == cola) {
                    cola = cola.anterior;
                    cola.siguiente = null;
                } else {
                    actual.anterior.siguiente = actual.siguiente;
                    actual.siguiente.anterior = actual.anterior;
                }
                tamano--;
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    // 3. operacion: busqueda indexada
    public T obtener(int indice) {
        if (indice < 0 || indice >= tamano) return null;
        NodoDoble<T> actual = cabeza;
        for (int i = 0; i < indice; i++) {
            actual = actual.siguiente;
        }
        return actual.data;
    }

    // 4. operacion: recorrer
    public int getTamano() {
        return this.tamano;
    }

    // 5. operacion: ordenar (Algoritmo de Inserción Directa para los estados de tarea)
    public void ordenar(Comparator<T> comparador) {
        if (cabeza == null || cabeza.siguiente == null) return;

        NodoDoble<T> actual = cabeza.siguiente;
        while (actual != null) {
            T clave = actual.data;
            NodoDoble<T> p = actual.anterior;

            while (p != null && comparador.compare(p.data, clave) > 0) {
                p.siguiente.data = p.data;
                p = p.anterior;
            }
            if (p == null) {
                cabeza.data = clave;
            } else {
                p.siguiente.data = clave;
            }
            actual = actual.siguiente;
        }
    }
}
