package mmi.ceremonie.diplome.repository;

import mmi.ceremonie.diplome.model.GuestbookMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GuestbookRepository extends JpaRepository<GuestbookMessage, Long> {
    List<GuestbookMessage> findByApprovedTrueOrderByCreatedAtDesc();
    List<GuestbookMessage> findByApprovedFalseOrderByCreatedAtDesc();
}
