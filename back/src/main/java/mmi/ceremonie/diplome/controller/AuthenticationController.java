package mmi.ceremonie.diplome.controller;

import lombok.RequiredArgsConstructor;
import mmi.ceremonie.diplome.dto.AuthenticationRequest;
import mmi.ceremonie.diplome.dto.AuthenticationResponse;
import mmi.ceremonie.diplome.dto.ChangePasswordRequest;
import mmi.ceremonie.diplome.dto.RegisterRequest;
import mmi.ceremonie.diplome.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication
    ) {
        service.changePassword(authentication.getName(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }
}
