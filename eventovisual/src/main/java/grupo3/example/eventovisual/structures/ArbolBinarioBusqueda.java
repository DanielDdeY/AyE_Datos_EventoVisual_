package grupo3.example.eventovisual.structures;

import java.util.ArrayList;
import java.util.List;

// El genérico <T extends Comparable<T>> asegura que los datos se puedan comparar 
public class ArbolBinarioBusqueda<T extends Comparable<T>> {

    private static class Nodo<T> {
        T data;
        Nodo<T> izquierdo;
        Nodo<T> derecho;

        Nodo(T data) {
            this.data = data;
            this.izquierdo = null;
            this.derecho = null;
        }
    }

    private Nodo<T> raiz;

    public ArbolBinarioBusqueda() {
        this.raiz = null;
    }

    // OPERACION 1: Insercion (O(log n))
    public void insertar(T elemento) {
        raiz = insertarRecursivo(raiz, elemento);
    }

    private Nodo<T> insertarRecursivo(Nodo<T> nodo, T elemento) {
        if (nodo == null) {
            return new Nodo<>(elemento);
        }
        if (elemento.compareTo(nodo.data) < 0) {
            nodo.izquierdo = insertarRecursivo(nodo.izquierdo, elemento);
        } else if (elemento.compareTo(nodo.data) > 0) {
            nodo.derecho = insertarRecursivo(nodo.derecho, elemento);
        }
        return nodo; // Si es igual, no se inserta (evita duplicados)
    }

    // OPERACION 2: Busqueda con Autocompletado 
    public List<T> buscarPorPrefijo(String prefijo) {
        List<T> resultados = new ArrayList<>();
        buscarPrefijoRecursivo(raiz, prefijo.toLowerCase(), resultados);
        return resultados;
    }

    private void buscarPrefijoRecursivo(Nodo<T> nodo, String prefijo, List<T> resultados) {
        if (nodo == null) return;

        String textoNodo = nodo.data.toString().toLowerCase();

        // Si coincide con el prefijo, lo agrega a la lista de sugerencias
        if (textoNodo.startsWith(prefijo)) {
            resultados.add(nodo.data);
        }

        // Navegación inteligente por las ramas
        if (prefijo.compareTo(textoNodo) <= 0) {
            buscarPrefijoRecursivo(nodo.izquierdo, prefijo, resultados);
        }
        if (prefijo.compareTo(textoNodo) >= 0 || textoNodo.startsWith(prefijo)) {
            buscarPrefijoRecursivo(nodo.derecho, prefijo, resultados);
        }
    }
}
