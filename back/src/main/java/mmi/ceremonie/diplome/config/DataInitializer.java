package mmi.ceremonie.diplome.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mmi.ceremonie.diplome.model.Role;
import mmi.ceremonie.diplome.model.User;
import mmi.ceremonie.diplome.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        try {
            if (repository.findByUsername("admin.system").isEmpty()) {
                User admin = User.builder()
                        .firstname("Admin")
                        .lastname("System")
                        .username("admin.system")
                        .email("admin@diplome.mmi")
                        .password(passwordEncoder.encode("admin"))
                        .role(Role.ADMIN)
                        .firstLogin(false)
                        .build();
                repository.save(admin);
                log.info("Admin user created successfully");
            }
        } catch (Exception e) {
            log.warn("DataInitializer: Could not initialize admin user. This is normal on first startup.", e);
        }
    }
}
