package mmi.ceremonie.diplome.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.uploads.directory:uploads}")
    private String uploadDirectory;

    private Path getUploadPath(String subdirectory) {
        Path path = Paths.get(uploadDirectory, subdirectory).toAbsolutePath().normalize();
        try {
            Files.createDirectories(path);
        } catch (IOException ex) {
            throw new RuntimeException("Impossible de créer le répertoire de stockage: " + subdirectory, ex);
        }
        return path;
    }

    public String storeFile(MultipartFile file, String subdirectory) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            if (originalFilename.contains("..")) {
                throw new RuntimeException("Nom de fichier invalide: " + originalFilename);
            }

            String fileExtension = originalFilename.contains(".") 
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : "";

            String filename = UUID.randomUUID().toString() + fileExtension;
            Path targetLocation = getUploadPath(subdirectory).resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return subdirectory + "/" + filename;
        } catch (IOException ex) {
            throw new RuntimeException("Impossible de stocker le fichier", ex);
        }
    }

    public Resource loadFileAsResource(String filePath) {
        try {
            Path file = Paths.get(uploadDirectory).resolve(filePath).normalize();
            Resource resource = new UrlResource(file.toUri());
            if (!resource.exists()) {
                throw new RuntimeException("Fichier introuvable: " + filePath);
            }
            return resource;
        } catch (Exception ex) {
            throw new RuntimeException("Fichier introuvable: " + filePath, ex);
        }
    }

    public void deleteFile(String filePath) {
        if (filePath == null || filePath.isEmpty()) {
            return;
        }
        try {
            Path file = Paths.get(uploadDirectory).resolve(filePath).normalize();
            Files.deleteIfExists(file);
        } catch (IOException ex) {
            throw new RuntimeException("Impossible de supprimer le fichier: " + filePath, ex);
        }
    }

    public String getFileUrl(String filePath) {
        if (filePath == null || filePath.isEmpty()) {
            return null;
        }
        return "/api/files/" + filePath;
    }
}
