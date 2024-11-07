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
    Optional<Ventanilla> findTopByOrderByNumeroRadicadoDesc();

    @Query("SELECT v FROM Ventanilla v WHERE (:numeroRadicado IS NULL OR v.numeroRadicado = :numeroRadicado) " +
            "AND (:nombre IS NULL OR v.nombre = :nombre) " +
            "AND (:apellido IS NULL OR v.apellido = :apellido)")
    List<Ventanilla> findByNumeroRadicadoOrNombreOrApellido(
            @Param("numeroRadicado") Integer numeroRadicado,
            @Param("nombre") String nombre,
            @Param("apellido") String apellido
    );
}
