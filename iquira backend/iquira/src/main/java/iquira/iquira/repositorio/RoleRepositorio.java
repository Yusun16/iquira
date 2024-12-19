package iquira.iquira.repositorio;

import iquira.iquira.modelo.ERole;
import iquira.iquira.modelo.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepositorio extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(ERole name);
}
