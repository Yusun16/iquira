package iquira.iquira.controlador;

import iquira.iquira.modelo.Dto.ChangePassword;
import iquira.iquira.modelo.Dto.MailBody;
import iquira.iquira.modelo.ERole;
import iquira.iquira.modelo.ForgotPassword;
import iquira.iquira.modelo.Role;
import iquira.iquira.modelo.User;
import iquira.iquira.repositorio.ForgotPasswordRepositorio;
import iquira.iquira.repositorio.RoleRepositorio;
import iquira.iquira.repositorio.UserRepositorio;
import iquira.iquira.request.LoginRequest;
import iquira.iquira.request.SignupRequest;
import iquira.iquira.response.JwtResponse;
import iquira.iquira.response.MessageResponse;
import iquira.iquira.seguridad.jwt.JwtUtils;
import iquira.iquira.seguridad.user.UserDetailsImpl;
import iquira.iquira.servicio.email.EmailServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/iquira/iquiraccess")
public class AccessControlador {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepositorio userRepositorio;

    @Autowired
    RoleRepositorio roleRepositorio;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailServicio emailServicio;

    @Autowired
    ForgotPasswordRepositorio forgotPasswordRepositorio;

    @GetMapping("/welcome")
    public ResponseEntity<?> Welcome() {
        return new ResponseEntity<>("Hola, Bienvenido a la plataforma de la alcaldia de Iquira", HttpStatus.OK);
    }

    @PostMapping("/register-user")
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
                    case "planeacion":
                        Role planeacionRole = roleRepositorio.findByName(ERole.ROLE_PLANEACION)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(planeacionRole);
                    case "salud":
                        Role saludRole = roleRepositorio.findByName(ERole.ROLE_SALUD)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(saludRole);
                    case "tesoreria":
                        Role tesoreriaRole = roleRepositorio.findByName(ERole.ROLE_TESORERIA)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(tesoreriaRole);
                    case "ventanilla":
                        Role ventanillaRole = roleRepositorio.findByName(ERole.ROLE_VENTANILLA)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(ventanillaRole);
                    default:
                        Role userRole = roleRepositorio.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: El rol no se encuentra"));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepositorio.save(user);

        return ResponseEntity.ok().body(new MessageResponse("¡Usuario registrado con exito!"));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> autenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getId(), roles));
    }

    @PostMapping("/verify-correo")
    public ResponseEntity<String> verifyEmail(@RequestParam String username) {
        User user = userRepositorio.findByUsername(username).orElseThrow(() -> new RuntimeException("Error: Por favor, digita un username valido"));

        Optional<ForgotPassword> existingOtp = forgotPasswordRepositorio.findByUser(user);
        if (existingOtp.isPresent()) {
            ForgotPassword ftpd = existingOtp.get();

            if (!ftpd.getTiempoEspera().before(Date.from(Instant.now()))) {
                long timeDiferente = System.currentTimeMillis() - ftpd.getTiempoEspera().getTime();

                if (timeDiferente < 20 * 1000) {
                    return ResponseEntity.ok("Por favor, espera al menos 20 segundos para solicitar un nuevo codigo");
                }
            } else {
                return ResponseEntity.ok("Codigo se ha expirado...");
            }
        }

        int otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
                .to(username)
                .text("Cordial Saludo! Usa este codigo para confirmar el correo, para que puedas resetear tu contrasena. El codigo OTP es: " + otp)
                .subject("Verificar el correo")
                .build();

        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .tiempoEspera(new Date(System.currentTimeMillis() + 5 * 60 * 1000))
                .user(user)
                .build();

        emailServicio.sendSimpleMessage(mailBody);

        forgotPasswordRepositorio.save(fp);

        return ResponseEntity.ok("Codigo enviado correctamente");
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<String> verifyOtp(@RequestParam String otp, @RequestParam String username) {
        Integer otpInteger = Integer.valueOf(otp);

        User user = userRepositorio.findByUsername(username).orElseThrow(() -> new RuntimeException("Error: Por favor, digita un username valido"));

        ForgotPassword fp = forgotPasswordRepositorio.findByOtpAndUsername(otpInteger, user).orElseThrow(() -> new RuntimeException("Error: Código invalido para el username:" + username));

        if (fp.getTiempoEspera().before(Date.from(Instant.now()))) {
            forgotPasswordRepositorio.deleteById(fp.getId());
            return new ResponseEntity<>("Codigo ha expirado", HttpStatus.EXPECTATION_FAILED);
        }

        return ResponseEntity.ok("Codigo aceptado con exito");
    }

    @PostMapping("/changedPassword/{otp}/{username}")
    public ResponseEntity<?> forgotPasswordHandler(@RequestBody ChangePassword changePassword, @PathVariable String otp, @PathVariable String username) {
        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            return new ResponseEntity<>("Por favor, digita nuevamente la contraseña, nuevamente", HttpStatus.EXPECTATION_FAILED);
        }

        Integer otpInteger = Integer.valueOf(otp);

        User user = userRepositorio.findByUsername(username).orElseThrow(() -> new RuntimeException("Error: Por favor, digita un username valido"));

        ForgotPassword fp = forgotPasswordRepositorio.findByOtpAndUsername(otpInteger, user).orElseThrow(() -> new RuntimeException("Error: Código invalido para el username:" + username));

        if (fp.getTiempoEspera().before(Date.from(Instant.now()))) {
            forgotPasswordRepositorio.deleteById(fp.getId());
            return new ResponseEntity<>("Codigo ha expirado", HttpStatus.EXPECTATION_FAILED);
        }

        String encodedPassword = passwordEncoder.encode(changePassword.password());

        userRepositorio.updatePassword(username, encodedPassword);

        return ResponseEntity.ok("La contrasena ha sido cambiada");
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}
