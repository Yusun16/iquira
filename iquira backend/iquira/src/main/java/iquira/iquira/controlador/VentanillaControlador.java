package iquira.iquira.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import iquira.iquira.modelo.Dto.ApiResponseDto;
import iquira.iquira.modelo.Ventanilla;
import iquira.iquira.servicio.IVentanillaServicio;


import java.util.List;

@RestController
@RequestMapping("/api/ventanilla")
@CrossOrigin(origins = "http://localhost:3000")
public class VentanillaControlador {

    private static final Logger logger = LoggerFactory.getLogger(VentanillaControlador.class);

    @Autowired
    private IVentanillaServicio ventanillaServicio;

    @GetMapping("/siguiente-radicado")
    public ResponseEntity<String> obtenerSiguienteNumeroRadicado() {
        String siguienteRadicado = ventanillaServicio.obtenerSiguienteNumeroRadicado();
        return ResponseEntity.ok(siguienteRadicado);
    }

    @GetMapping("/formularios")
    public List<Ventanilla> obtenerFormularios() {
        var formularios = ventanillaServicio.listarFormularios();
        formularios.forEach((formulario -> logger.info(formulario.toString())));
        return formularios;
    }

    @PostMapping("/formularios")
    public Ventanilla agregarFormulario(@RequestBody Ventanilla formulario) {
        logger.info("Formulario a agregar: " + formulario);
        return ventanillaServicio.guardarFormulario(formulario);
    }

    @GetMapping("/buscarFormulario")
    public List<Ventanilla> buscarFormularioPorNombre(
            @RequestParam(required = false) Integer radicado,
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String apellido
    ) {
        return ventanillaServicio.buscarFormularioPorParametros(radicado, nombre, apellido);
    }

    @PutMapping("/formularios/{id}")
    public ResponseEntity<ApiResponseDto<Ventanilla>> actualizarFormulario(@PathVariable Long id, @RequestBody Ventanilla formulario) {
        try {
            ventanillaServicio.actualizarFormulario(id, formulario);
            return ResponseEntity.ok(new ApiResponseDto<>("Formulario actualizado", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }
}

