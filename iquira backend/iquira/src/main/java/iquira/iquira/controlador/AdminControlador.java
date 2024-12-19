package iquira.iquira.controlador;

import iquira.iquira.modelo.Dto.ListUserDto;
import iquira.iquira.modelo.Dto.RoleDto;
import iquira.iquira.modelo.ERole;
import iquira.iquira.modelo.Role;
import iquira.iquira.modelo.User;
import iquira.iquira.repositorio.RoleRepositorio;
import iquira.iquira.repositorio.UserRepositorio;
import iquira.iquira.request.SignupRequest;
import iquira.iquira.response.MessageResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/iquira/admin")
public class AdminControlador {

    @Autowired
    UserRepositorio userRepositorio;

    @Autowired
    RoleRepositorio roleRepositorio;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/register-user")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registeruser(@Valid @RequestBody SignupRequest signupRequest) {
        if (userRepositorio.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Este usuario ya existe"));
        }

        User user = new User(signupRequest.getUsername(),
                passwordEncoder.encode(signupRequest.getPassword()));

        user.setNombre(signupRequest.getNombre());

        user.setApellido(signupRequest.getApellido());

        user.setFecha(signupRequest.getFecha());

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if(strRoles == null) {
            Role userRole = roleRepositorio.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: El rol no existe"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepositorio.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(adminRole);
                        break;
                    case "almacen":
                        Role almacenRole = roleRepositorio.findByName(ERole.ROLE_ALMACEN)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(almacenRole);
                        break;
                    case "comisaria":
                        Role comisariaRole = roleRepositorio.findByName(ERole.ROLE_COMISARIA)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(comisariaRole);
                        break;
                    case "despacho":
                        Role despachoRole = roleRepositorio.findByName(ERole.ROLE_DESPACHO)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(despachoRole);
                        break;
                    case "gobierno":
                        Role gobiernoRole = roleRepositorio.findByName(ERole.ROLE_GOBIERNO)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(gobiernoRole);
                        break;
                    case "planeacion":
                        Role planeacionRole = roleRepositorio.findByName(ERole.ROLE_PLANEACION)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(planeacionRole);
                        break;
                    case "salud":
                        Role saludRole = roleRepositorio.findByName(ERole.ROLE_SALUD)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(saludRole);
                        break;
                    case "tesoreria":
                        Role tesoreriaRole = roleRepositorio.findByName(ERole.ROLE_TESORERIA)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(tesoreriaRole);
                        break;
                    case "ventanilla":
                        Role ventanillaRole = roleRepositorio.findByName(ERole.ROLE_VENTANILLA)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(ventanillaRole);
                        break;
                    default:
                        Role userRole = roleRepositorio.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        user.setRoles(roles);
        userRepositorio.save(user);

        return ResponseEntity.ok().body(new MessageResponse("¡Usuario registrado con exito!"));
    }

    @GetMapping("/listar-usuarios")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ListUserDto> listarTodosUsuarios() {
        List<User> users = userRepositorio.findAll();
        return users.stream().map(user -> new ListUserDto(
                user.getUsername(),
                user.getNombre(),
                user.getApellido(),
                user.getFecha(),
                user.getRoles().stream().map(role -> new RoleDto(role.getName().name())).collect(Collectors.toSet())
        )).collect(Collectors.toList());
    }

    @GetMapping("/usuario/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ListUserDto> getUserById(@PathVariable("id") int id) {
        Optional<User> user = userRepositorio.findById(id);
        if (user.isPresent()) {
            ListUserDto userDTO = new ListUserDto(
                    user.get().getUsername(),
                    user.get().getNombre(),
                    user.get().getApellido(),
                    user.get().getFecha(),
                    user.get().getRoles().stream().map(role -> new RoleDto(role.getName().name())).collect(Collectors.toSet())
            );
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
