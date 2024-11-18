package iquira.iquira.controlador;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/archivos")
@CrossOrigin(origins = "http://localhost:3000")
public class ArchivoControlador {

    private static final String DIRECTORIO = "archivos_subidos/";

    @PostMapping("/subir")
    public ResponseEntity<String> subirArchivo(@RequestParam("archivo") MultipartFile archivo) {
        try {
            if (archivo.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El archivo está vacío");
            }

            // Guarda el archivo en el servidor
            Path rutaArchivo = Paths.get(DIRECTORIO + archivo.getOriginalFilename());
            Files.createDirectories(rutaArchivo.getParent());
            Files.write(rutaArchivo, archivo.getBytes());

            // Devuelve la URL del archivo
            String urlArchivo = "http://localhost:8080/api/archivos/" + archivo.getOriginalFilename();
            return ResponseEntity.ok(urlArchivo);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo: " + e.getMessage());
        }
    }

    @GetMapping("/{nombreArchivo}")
    public ResponseEntity<byte[]> descargarArchivo(@PathVariable String nombreArchivo) {
        try {
            Path rutaArchivo = Paths.get(DIRECTORIO + nombreArchivo);
            byte[] archivo = Files.readAllBytes(rutaArchivo);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"")
                    .body(archivo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
