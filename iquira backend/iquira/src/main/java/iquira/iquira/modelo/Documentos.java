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
public class Documentos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idDocumentos;
    String tipDocumento;
    LocalDate fechaCreacion;
    String estado;

    @OneToOne
    Informes idInformes;

}
