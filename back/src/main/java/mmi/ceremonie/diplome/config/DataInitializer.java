package mmi.ceremonie.diplome.config;

import lombok.RequiredArgsConstructor;
import mmi.ceremonie.diplome.model.Role;
import mmi.ceremonie.diplome.model.User;
import mmi.ceremonie.diplome.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (repository.findByEmail("admin@diplome.mmi").isEmpty()) {
            var admin = User.builder()
                    .firstname("Admin")
                    .lastname("System")
                    .email("admin@diplome.mmi")
                    .password(passwordEncoder.encode("admin"))
                    .role(Role.ADMIN)
                    .firstLogin(false)
                    .build();
            repository.save(admin);
            logger.info("Default admin user created: email=admin@diplome.mmi, password=admin");
        }
    }
}
