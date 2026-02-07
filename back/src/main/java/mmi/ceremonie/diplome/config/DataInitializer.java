package mmi.ceremonie.diplome.config;

import lombok.RequiredArgsConstructor;
import mmi.ceremonie.diplome.model.Role;
import mmi.ceremonie.diplome.model.User;
import mmi.ceremonie.diplome.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (repository.findByEmail("admin@diplome.mmi").isEmpty()) {
            var admin = User.builder()
                    .email("admin@diplome.mmi")
                    .password(passwordEncoder.encode("admin"))
                    .role(Role.ADMIN)
                    .firstLogin(false) // Admin doesn't need to change pw immediately for dev
                    .build();
            repository.save(admin);
            System.out.println("Default admin user created: email=admin@diplome.mmi, password=admin");
        }
    }
}
