package mmi.ceremonie.diplome.controller;

import lombok.RequiredArgsConstructor;
import mmi.ceremonie.diplome.model.GuestbookMessage;
import mmi.ceremonie.diplome.repository.GuestbookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/guestbook")
@RequiredArgsConstructor
public class AdminGuestbookController {

    private final GuestbookRepository repository;

    @GetMapping("/pending")
    public List<GuestbookMessage> getPendingMessages() {
        return repository.findByApprovedFalseOrderByCreatedAtDesc();
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Void> approveMessage(@PathVariable Long id) {
        GuestbookMessage message = repository.findById(id).orElseThrow();
        message.setApproved(true);
        repository.save(message);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
