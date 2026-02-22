package mmi.ceremonie.diplome.service;

import lombok.RequiredArgsConstructor;
import mmi.ceremonie.diplome.security.JwtService;
import mmi.ceremonie.diplome.dto.AuthenticationRequest;
import mmi.ceremonie.diplome.dto.AuthenticationResponse;
import mmi.ceremonie.diplome.dto.RegisterRequest;
import mmi.ceremonie.diplome.model.Role;
import mmi.ceremonie.diplome.model.User;
import mmi.ceremonie.diplome.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static String buildUsername(String firstname, String lastname) {
        if (firstname == null) firstname = "";
        if (lastname == null) lastname = "";
        return (firstname.trim().toLowerCase(Locale.ROOT) + "." + lastname.trim().toLowerCase(Locale.ROOT));
    }
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        String base = buildUsername(request.getFirstname(), request.getLastname());
        String username = base;
        int suffix = 1;
        while (repository.findByUsername(username).isPresent()) {
            username = base + "." + suffix++;
        }
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .username(username)
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .firstLogin(true)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .firstLogin(user.isFirstLogin())
                .role(user.getRole().name())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .firstLogin(user.isFirstLogin())
                .role(user.getRole().name())
                .build();
    }

    public void changePassword(String username, String newPassword) {
        var user = repository.findByUsername(username).orElseThrow();
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setFirstLogin(false);
        repository.save(user);
    }
}
