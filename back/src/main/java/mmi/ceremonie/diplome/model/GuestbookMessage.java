package mmi.ceremonie.diplome.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GuestbookMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;

    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createdAt;

    @jakarta.persistence.Column(columnDefinition = "LONGTEXT")
    private String image;

    private boolean approved = true;
}
