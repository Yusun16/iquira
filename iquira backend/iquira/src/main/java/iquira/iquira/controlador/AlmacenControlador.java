package iquira.iquira.controlador;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import iquira.iquira.modelo.Ventanilla;
import iquira.iquira.servicio.IVentanillaServicio;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/almacen")
@CrossOrigin(origins = "http://localhost:3000")
public class AlmacenControlador {

    private final IVentanillaServicio ventanillaServicio;

    public AlmacenControlador(IVentanillaServicio ventanillaServicio) {
        this.ventanillaServicio = ventanillaServicio;
    }

    @GetMapping("/formularios")
    public ResponseEntity<List<Ventanilla>> obtenerFormulariosAlmacen() {
        try {
            List<Ventanilla> formularios = ventanillaServicio.obtenerFormulariosPorDependencia("Almacén");
            return ResponseEntity.ok(formularios);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/documento/{nombreArchivo}")
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
