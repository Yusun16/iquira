package iquira.iquira.controlador;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import iquira.iquira.modelo.Ventanilla;
import iquira.iquira.servicio.IVentanillaServicio;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/planeacion")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaneacionControlador {

    private final IVentanillaServicio ventanillaServicio;

    public PlaneacionControlador(IVentanillaServicio ventanillaServicio) {
        this.ventanillaServicio = ventanillaServicio;
    }

    @GetMapping("/formularios")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PLANEACION')")
    public ResponseEntity<List<Ventanilla>> obtenerFormulariosPlaneacion() {
        try {
            List<Ventanilla> formularios = ventanillaServicio.obtenerFormulariosPorDependencia("Planeación");
            return ResponseEntity.ok(formularios);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/documento/{nombreArchivo}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PLANEACION')")
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

    @PostMapping("/documento/{radicado}/subir")
    @PreAuthorize("hasRole('PLANEACION')")
    public ResponseEntity<?> subirDocumento(@PathVariable Long radicado, @RequestParam("archivo") MultipartFile archivo) {
        try {
            String nombreArchivo = archivo.getOriginalFilename();
            Path rutaArchivo = Paths.get("archivos_subidos/" + nombreArchivo);
            Files.write(rutaArchivo, archivo.getBytes());
            return ResponseEntity.ok("Archivo subido exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al subir el archivo.");
        }
    }
}
