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

    @GetMapping("/guestbook")
    @PreAuthorize("hasRole('ADMIN')")
    public List<GuestbookMessage> getAllMessagesForAdmin() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/public/guestbook")
    public List<GuestbookMessage> getAllMessages() {
        List<GuestbookMessage> messages = repository.findAllByOrderByCreatedAtDesc();
        // Sanitise: strip base64 images that would cause massive JSON payloads crashing Render's free tier
        messages.forEach(msg -> {
            if (msg.getImage() != null && msg.getImage().startsWith("data:")) {
                msg.setImage(null);
            }
        });
        return messages;
    }

    @PostMapping("/public/guestbook")
    public GuestbookMessage postMessage(@RequestBody GuestbookMessage message) {
        // Refuse les images base64 directes - elles doivent passer par /api/files/upload/gallery
        if (message.getImage() != null && message.getImage().startsWith("data:")) {
            message.setImage(null);
        }
        message.setCreatedAt(LocalDateTime.now());
        return repository.save(message);
    }

    @DeleteMapping("/guestbook/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMessage(@PathVariable Long id) {
        repository.deleteById(id);
    }

    /**
     * Endpoint de nettoyage d'urgence: supprime toutes les images base64 stockees en BD
     * qui causent les erreurs 500 sur Render (payload trop grand).
     * Appeler une seule fois: POST /api/guestbook/cleanup-images
     */
    @PostMapping("/guestbook/cleanup-images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> cleanupBase64Images() {
        List<GuestbookMessage> messages = repository.findAll();
        int cleaned = 0;
        for (GuestbookMessage msg : messages) {
            if (msg.getImage() != null && msg.getImage().startsWith("data:")) {
                msg.setImage(null);
                repository.save(msg);
                cleaned++;
            }
        }
        return ResponseEntity.ok("Nettoyage terminé: " + cleaned + " images base64 supprimées.");
    }
}
