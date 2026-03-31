package mmi.ceremonie.diplome.repository;

import mmi.ceremonie.diplome.model.GuestbookMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface GuestbookRepository extends JpaRepository<GuestbookMessage, Long> {
    List<GuestbookMessage> findAllByOrderByCreatedAtDesc();

    /**
     * Efface les images base64 stockées directement en BD (sans les charger en mémoire).
     * Utilisé au démarrage pour nettoyer les données corrompues qui causent le crash Render.
     */
    @Modifying
    @Query(value = "UPDATE guestbook_message SET image = NULL WHERE image LIKE 'data:%'", nativeQuery = true)
    int cleanupBase64Images();
}
