package iquira.iquira.repositorio;

import iquira.iquira.modelo.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepositorio extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?2 where u.username = ?1")
    void updatePassword(String username, String password);
}
