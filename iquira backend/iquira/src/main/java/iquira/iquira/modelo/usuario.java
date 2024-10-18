package iquira.iquira.modelo;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@ToString
public class usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idUsuario;
    String nombre;
    String apellido;
    String correo;
    String contrasena;
    LocalDate fecha;

    @ManyToOne
    Roles idRoles;

    @ManyToOne
    Informes idInformes;

}
