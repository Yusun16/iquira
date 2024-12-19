package iquira.iquira.modelo.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class ListUserDto {
    private String username;
    private String nombre;
    private String apellido;
    private LocalDate fecha;
    private Set<RoleDto> roles;

    public ListUserDto(String username, String nombre, String apellido, LocalDate fecha, Set<RoleDto> roles) {
        this.username = username;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fecha = fecha;
        this.roles = roles;
    }
}
