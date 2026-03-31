package mmi.ceremonie.diplome.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mmi.ceremonie.diplome.repository.GuestbookRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Au démarrage de l'application, nettoie automatiquement les images base64 stockées
 * directement en base de données (elles causent des erreurs 500 sur Render car trop grosses).
 * Depuis cette version, seuls les chemins de fichiers (ex: gallery/fa2e...) sont stockés.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DatabaseCleanupRunner implements ApplicationRunner {

    private final GuestbookRepository guestbookRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        try {
            int cleaned = guestbookRepository.cleanupBase64Images();
            if (cleaned > 0) {
                log.info("🧹 Cleanup: {} messages avec images base64 nettoyés en base de données.", cleaned);
            } else {
                log.info("✅ Base de données propre - aucune image base64 trouvée.");
            }
        } catch (Exception e) {
            log.warn("⚠️ Impossible d'effectuer le nettoyage base64: {}", e.getMessage());
        }
    }
}
