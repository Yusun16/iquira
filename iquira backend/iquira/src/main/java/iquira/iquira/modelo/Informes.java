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
public class Informes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idInformes;
    String titulo;
    String tipInforme;
    LocalDate Fecha;

}
