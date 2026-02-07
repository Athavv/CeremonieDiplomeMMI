package mmi.ceremonie.diplome.repository;

import mmi.ceremonie.diplome.model.GalleryImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository extends JpaRepository<GalleryImage, Long> {
}
