package iquira.iquira.modelo.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDto {
    private String name;

    public RoleDto(String name) {
        this.name = name;
    }
}
