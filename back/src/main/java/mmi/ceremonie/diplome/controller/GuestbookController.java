package mmi.ceremonie.diplome.controller;

import lombok.RequiredArgsConstructor;
import mmi.ceremonie.diplome.model.GuestbookMessage;
import mmi.ceremonie.diplome.repository.GuestbookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GuestbookController {

    private final GuestbookRepository repository;

    @GetMapping("/public/guestbook")
    public List<GuestbookMessage> getAllApprovedMessages() {
        return repository.findByApprovedTrueOrderByCreatedAtDesc();
    }

    @PostMapping("/guestbook")
    public GuestbookMessage postMessage(@RequestBody GuestbookMessage message) {
        message.setCreatedAt(LocalDateTime.now());
        message.setApproved(false); // Moderation required
        return repository.save(message);
    }
}
