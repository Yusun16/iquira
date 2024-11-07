package iquira.iquira.servicio;

import iquira.iquira.modelo.Ventanilla;
import iquira.iquira.repositorio.VentanillaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

@Service
public class VentanillaServicio implements IVentanillaServicio {

    @Autowired
    private VentanillaRepository ventanillaRepository;

    @Override
    public List<Ventanilla> listarFormularios() {
        return ventanillaRepository.findAll();
    }

    @Override
    public Ventanilla buscarFormularioPorId(Long id) {
        return ventanillaRepository.findById(id).orElse(null);
    }

    @Override
    public Ventanilla guardarFormulario(Ventanilla formulario) {
        return ventanillaRepository.save(formulario);
    }

    @Override
    public void eliminarFormulario(Ventanilla formulario) {
        ventanillaRepository.delete(formulario);
    }

    @Override
    public List<Ventanilla> buscarFormularioPorParametros(Integer numeroRadicado, String nombre, String apellido) {
        return ventanillaRepository.findByNumeroRadicadoOrNombreOrApellido(numeroRadicado, nombre, apellido);
    }

    @Override
    public void actualizarFormulario(Long id, Ventanilla formulario) throws Exception {
        Optional<Ventanilla> optionalFormulario = ventanillaRepository.findById(id);

        if (optionalFormulario.isEmpty()) {
            throw new Exception("No se encontró el formulario");
        }

        Ventanilla formularioToUpdate = optionalFormulario.get();
        updateNonNullProperties(formulario, formularioToUpdate);
        ventanillaRepository.save(formularioToUpdate);
    }

    @Override
    public String obtenerSiguienteNumeroRadicado() {
        Optional<Ventanilla> ultimoFormulario = ventanillaRepository.findTopByOrderByNumeroRadicadoDesc();
        int siguienteRadicado = ultimoFormulario.map(f -> f.getNumeroRadicado() + 1).orElse(1);

        // Formatear el radicado como un número de cuatro dígitos (ej. 0001)
        return String.format("%04d", siguienteRadicado);
    }


    private void updateNonNullProperties(Ventanilla source, Ventanilla target) {
        Field[] fields = Ventanilla.class.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                Object value = field.get(source);
                if (value != null) {
                    field.set(target, value);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
