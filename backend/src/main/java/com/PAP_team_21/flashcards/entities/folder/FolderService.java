package com.PAP_team_21.flashcards.entities.folder;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FolderService {
    private final FolderJpaRepository folderRepository;

    public boolean hasFolder(Folder folder)
    {
        return hasFolder(folder.getId());
    }

    public boolean hasFolder(int id)
    {
        Optional<Folder> found = folderRepository.findById(id);
        return found.isPresent();
    }

    public Optional<Folder> findById(int id) {
        return folderRepository.findById(id);

    }
    public void delete(int folderId)
    {
        folderRepository.deleteById(folderId);
    }

    public Folder save(Folder folder) {
        return folderRepository.save(folder);
    }

    @Transactional
    public List<Folder> findAllUserFolders(int userId) {
        return folderRepository.findAllUserFolders(userId);
    }

    public List<Folder> findAllUserFolders(int userId, Pageable pageable) {
        return folderRepository.findAllUserFolders(userId, pageable);
    }
}

