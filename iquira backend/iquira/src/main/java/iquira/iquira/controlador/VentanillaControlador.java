package iquira.iquira.controlador;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import iquira.iquira.modelo.Ventanilla;
import iquira.iquira.servicio.IVentanillaServicio;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/ventanilla")
@CrossOrigin(origins = "http://localhost:3000")
public class VentanillaControlador {

    private static final String DIRECTORIO = "archivos_subidos/";
    private final IVentanillaServicio ventanillaServicio;

    public VentanillaControlador(IVentanillaServicio ventanillaServicio) {
        this.ventanillaServicio = ventanillaServicio;
    }

    // Obtener el siguiente número de radicado
    @GetMapping("/siguiente-radicado")
    public ResponseEntity<String> obtenerSiguienteNumeroRadicado() {
        String siguienteRadicado = ventanillaServicio.obtenerSiguienteNumeroRadicado();
        return ResponseEntity.ok(siguienteRadicado);
    }

    // Listar todos los formularios
    @GetMapping("/formularios")
    public List<Ventanilla> obtenerFormularios() {
        return ventanillaServicio.listarFormularios();
    }

    // Crear un nuevo formulario
    @PostMapping("/formularios")
    public ResponseEntity<Ventanilla> agregarFormulario(@RequestBody Ventanilla formulario) {
        try {
            formulario.setNumeroRadicado(
                    Integer.parseInt(ventanillaServicio.obtenerSiguienteNumeroRadicado())
            );
            Ventanilla nuevoFormulario = ventanillaServicio.guardarFormulario(formulario);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoFormulario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Buscar formularios por parámetros (radicado, nombre, apellido)
    @GetMapping("/buscarFormulario")
    public ResponseEntity<List<Ventanilla>> buscarFormularioPorParametros(
            @RequestParam(required = false) Integer radicado,
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String apellido
    ) {
        try {
            List<Ventanilla> resultados = ventanillaServicio.buscarFormularioPorParametros(radicado, nombre, apellido);
            return ResponseEntity.ok(resultados);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Actualizar un formulario existente
    @PutMapping("/formularios/{id}")
    public ResponseEntity<String> actualizarFormulario(
            @PathVariable Long id,
            @RequestBody Ventanilla formulario
    ) {
        try {
            ventanillaServicio.actualizarFormulario(id, formulario);
            return ResponseEntity.ok("Formulario actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Subir un documento asociado a un formulario
    @PostMapping("/formularios/{id}/documento")
    public ResponseEntity<String> subirDocumento(
            @PathVariable Long id,
            @RequestParam("archivo") MultipartFile archivo) {
        try {
            Ventanilla formulario = ventanillaServicio.buscarFormularioPorId(id);
            if (formulario == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Formulario no encontrado");
            }

            // Validar tipo de archivo permitido
            String nombreArchivo = archivo.getOriginalFilename();
            if (nombreArchivo == null || !nombreArchivo.matches(".*\\.(pdf|docx|doc|xls|xlsx)$")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de archivo no permitido");
            }

            // Subir el archivo
            Path rutaArchivo = Paths.get(DIRECTORIO + nombreArchivo);
            Files.createDirectories(rutaArchivo.getParent());
            Files.write(rutaArchivo, archivo.getBytes());

            // Guardar la URL del archivo en el formulario
            String urlArchivo = "http://localhost:8080/api/archivos/" + nombreArchivo;
            formulario.setDocumento(urlArchivo);
            ventanillaServicio.guardarFormulario(formulario);

            return ResponseEntity.ok(urlArchivo);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo: " + e.getMessage());
        }
    }

    // Descarga de documentos subidos
    @GetMapping("/documentos/{nombreArchivo}")
    public ResponseEntity<byte[]> descargarArchivo(@PathVariable String nombreArchivo) {
        try {
            Path rutaArchivo = Paths.get(DIRECTORIO + nombreArchivo);
            byte[] archivo = Files.readAllBytes(rutaArchivo);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"")
                    .body(archivo);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
