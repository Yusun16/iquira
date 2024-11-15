package iquira.iquira.servicio;

import iquira.iquira.modelo.Ventanilla;
import java.util.List;

public interface IVentanillaServicio {

    List<Ventanilla> listarFormularios();

    Ventanilla buscarFormularioPorId(Long id);

    Ventanilla guardarFormulario(Ventanilla formulario);

    void eliminarFormulario(Ventanilla formulario);

    List<Ventanilla> buscarFormularioPorParametros(Integer numeroRadicado, String nombre, String apellido);

    void actualizarFormulario(Long id, Ventanilla formulario) throws Exception;

    String obtenerSiguienteNumeroRadicado();
}
