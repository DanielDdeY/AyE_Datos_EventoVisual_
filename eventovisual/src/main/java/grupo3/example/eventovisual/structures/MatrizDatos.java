package grupo3.example.eventovisual.structures;

import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class MatrizDatos<T> {

    // A. aplicacion del arreglo uni (1D) - Estático e Indexado //
    private final String[] columnasNames = {"TO_DO", "EN_PROGRESO", "EN_REVISION", "TERMINADA"};

    // B. aplicacion del arreglo bi (2D / MATRIZ) //
    private List<T>[][] matrizTablero;

    @SuppressWarnings("unchecked")
    public MatrizDatos() {
        matrizTablero = new List[4][1];
        for (int i = 0; i < 4; i++) {
            matrizTablero[i][0] = new ArrayList<>();
        }
    }

    public String obtenerNombreColumna(int indice) {
        if (indice >= 0 && indice < columnasNames.length) {
            return columnasNames[indice];
        }
        return "DESCONOCIDO";
    }

    // operacion: insercion matriz (Carga los datos dinámicamente en la celda de la columna) //
    public void registrarEnTablero(int filaEstado, T elemento) {
        if (filaEstado >= 0 && filaEstado < 4) {
            matrizTablero[filaEstado][0].add(elemento);
        }
    }

    // operacion: recorrer la matriz //
    public List<T> obtenerElementosPorFila(int filaEstado) {
        if (filaEstado >= 0 && filaEstado < 4) {
            return matrizTablero[filaEstado][0];
        }
        return new ArrayList<>();
    }
    
    // operacion: convertir enum a numeros para su uso en doble
    public int mapearEstadoAFila(String estadoActual) {
        switch (estadoActual) {
            case "TO_DO": return 0;
            case "EN_PROGRESO": return 1;
            case "EN_REVISION": return 2;
            case "TERMINADA": return 3;
            default: return -1;
        }
    }
}
