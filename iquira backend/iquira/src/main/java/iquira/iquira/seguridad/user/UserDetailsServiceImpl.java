package iquira.iquira.seguridad.user;

import iquira.iquira.modelo.User;
import iquira.iquira.repositorio.UserRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepositorio userRepositorio;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepositorio.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado en el username:" + username));
        return UserDetailsImpl.build(user);
    }
}
