package com.PAP_team_21.flashcards.authentication;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.Errors.ResourceNotFoundException;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.deck.DeckRepository;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardRepository;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import jakarta.persistence.Access;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResourceAccessService {
    private final CustomerRepository customerRepository;
    private final DeckRepository deckRepository;
    private final FlashcardRepository flashcardRepository;
    private final FolderJpaRepository folderJpaRepository;

    private Customer getCustomer(Authentication authentication) throws ResourceNotFoundException
    {
        String email = authentication.getName();

        Optional<Customer> customer = customerRepository.findByEmail(email);
        if(customer.isEmpty())
            throw new ResourceNotFoundException("User not found");
        return customer.get();
    }

    public AccessLevel getFolderAccessLevel(Authentication authentication, int folderId) throws ResourceNotFoundException
    {
        Customer customer = getCustomer(authentication);

        Optional<Folder> folder = folderJpaRepository.findById(folderId);
        if(folder.isEmpty())
            throw new ResourceNotFoundException("Folder not found");

        return folder.get().getAccessLevel(customer);
    }

    public AccessLevel getDeckAccessLevel(Authentication authentication, int deckId) throws ResourceNotFoundException
    {
        Customer customer = getCustomer(authentication);

        Optional<Deck> deck =  deckRepository.findById(deckId);
        if(deck.isEmpty())
            throw new ResourceNotFoundException("Deck not found");

        return deck.get().getAccessLevel(customer);
    }

    public AccessLevel getFlashcardAccessLevel(Authentication authentication, int flashcardId)
    {
        Customer customer = getCustomer(authentication);

        Optional<Flashcard> flashcard = flashcardRepository.findById(flashcardId);

        if(flashcard.isEmpty())
            throw new ResourceNotFoundException("Flashcard not found");

        return flashcard.get().getAccessLevel(customer);
    }

}
