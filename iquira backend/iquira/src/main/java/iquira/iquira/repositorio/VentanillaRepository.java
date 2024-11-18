package iquira.iquira.repositorio;

import iquira.iquira.modelo.Ventanilla;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VentanillaRepository extends JpaRepository<Ventanilla, Long> {

    // Obtener el último número de radicado
    Optional<Ventanilla> findTopByOrderByNumeroRadicadoDesc();

    // Buscar formularios por número de radicado, nombre o apellido
    @Query("SELECT v FROM Ventanilla v WHERE (:numeroRadicado IS NULL OR v.numeroRadicado = :numeroRadicado) " +
            "AND (:nombre IS NULL OR v.nombre = :nombre) " +
            "AND (:apellido IS NULL OR v.apellido = :apellido)")
    List<Ventanilla> findByNumeroRadicadoOrNombreOrApellido(
            @Param("numeroRadicado") Integer numeroRadicado,
            @Param("nombre") String nombre,
            @Param("apellido") String apellido
    );

    // Buscar formularios por dependencia
    List<Ventanilla> findByDependencia(String dependencia);
}
