package iquira.iquira.controlador;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import iquira.iquira.modelo.Ventanilla;
import iquira.iquira.servicio.IVentanillaServicio;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/despacho")
@CrossOrigin(origins = "http://localhost:3000")
public class DespachoControlador {

    private final IVentanillaServicio ventanillaServicio;

    public DespachoControlador(IVentanillaServicio ventanillaServicio) {
        this.ventanillaServicio = ventanillaServicio;
    }

    @GetMapping("/formularios")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DESPACHO')")
    public ResponseEntity<List<Ventanilla>> obtenerFormulariosDespacho() {
        try {
            List<Ventanilla> formularios = ventanillaServicio.obtenerFormulariosPorDependencia("Despacho");
            return ResponseEntity.ok(formularios);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/documento/{nombreArchivo}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DESPACHO')")
    public ResponseEntity<byte[]> descargarDocumento(@PathVariable String nombreArchivo) {
        try {
            Path rutaArchivo = Paths.get("archivos_subidos/" + nombreArchivo);
            byte[] archivo = Files.readAllBytes(rutaArchivo);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"")
                    .body(archivo);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
