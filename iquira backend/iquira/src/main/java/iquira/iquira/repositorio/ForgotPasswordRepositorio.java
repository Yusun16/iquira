package iquira.iquira.repositorio;

import iquira.iquira.modelo.ForgotPassword;
import iquira.iquira.modelo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ForgotPasswordRepositorio extends JpaRepository<ForgotPassword, Integer> {

    @Query("select id from ForgotPassword id where id.otp = ?1 and id.user = ?2")
    Optional<ForgotPassword> findByOtpAndUsername(Integer otp, User user);

    Optional<ForgotPassword> findByUser(User user);
}
