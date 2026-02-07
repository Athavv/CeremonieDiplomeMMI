package mmi.ceremonie.diplome.controller;

import lombok.RequiredArgsConstructor;
import mmi.ceremonie.diplome.model.GalleryImage;
import mmi.ceremonie.diplome.repository.GalleryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryRepository repository;

    @GetMapping
    public List<GalleryImage> getAllImages() {
        return repository.findAll();
    }

    @PostMapping
    public GalleryImage addImage(@RequestBody GalleryImage image) {
        return repository.save(image);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
