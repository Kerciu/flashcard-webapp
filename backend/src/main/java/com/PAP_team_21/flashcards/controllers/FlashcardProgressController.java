package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardProgressCreateRequest;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardProgressUpdateRequest;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardRepository;
import com.PAP_team_21.flashcards.entities.flashcardProgress.FlashcardProgress;
import com.PAP_team_21.flashcards.entities.flashcardProgress.FlashcardProgressRepository;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/flashcardProgress")
@RequiredArgsConstructor
public class FlashcardProgressController {

    private CustomerRepository customerRepository;
    private FlashcardRepository flashcardRepository;
    private FlashcardProgressRepository flashcardProgressRepository;

    @GetMapping("/{id}")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getFlashcardProgress(Authentication authentication, @PathVariable int id) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<FlashcardProgress> flashcardProgressOpt = flashcardProgressRepository.findById(id);
        if (flashcardProgressOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No flashcard progress with id "+ id + " found");
        }

        FlashcardProgress flashcardProgress = flashcardProgressOpt.get();
        Flashcard flashcard = flashcardProgress.getFlashcard();
        Deck deck = flashcard.getDeck();

        AccessLevel al = deck.getAccessLevel(customer);
        if (al == null)
        {
            return ResponseEntity.badRequest().body("You dont have access to this flashcard");
        }

        return ResponseEntity.ok(flashcardProgress);

    }

    @PostMapping("/create")
    public ResponseEntity<?> createFlashcardProgress(Authentication authentication,
                                                     @RequestBody FlashcardProgressCreateRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<Flashcard> flashcardOpt = flashcardRepository.findById(request.getFlashcardId());
        if (flashcardOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No flashcard with this id found");
        }
        Flashcard flashcard = flashcardOpt.get();
        Deck deck = flashcard.getDeck();

        AccessLevel al = deck.getAccessLevel(customer);
        if (al == null)
        {
            return ResponseEntity.badRequest().body("You dont have access to this flashcard");
        }

        FlashcardProgress flashcardProgress = new FlashcardProgress(request.getFlashcardId(),
                                                                    request.getUserId(),
                                                                    request.getNextReview(),
                                                                    request.isValid());
        flashcardProgressRepository.save(flashcardProgress);
        return ResponseEntity.ok(flashcardProgress);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateFlashcardProgress(Authentication authentication,
                                                     @RequestBody FlashcardProgressUpdateRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<FlashcardProgress> flashcardProgressOpt = flashcardProgressRepository.
                                                            findById(request.getFlashcardProgressId());
        if (flashcardProgressOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No flashcardProgress with this id found");
        }

        FlashcardProgress flashcardProgress = flashcardProgressOpt.get();
        Flashcard flashcard = flashcardProgress.getFlashcard();
        Deck deck = flashcard.getDeck();

        AccessLevel al = deck.getAccessLevel(customer);
        if (al == null)
        {
            return ResponseEntity.badRequest().body("You dont have access to this flashcard");
        }

        flashcardProgress.setNext_review(request.getNextReview());
        flashcardProgress.setValid(request.isValid());

        flashcardProgressRepository.save(flashcardProgress);
        return ResponseEntity.ok(flashcardProgress);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFlashCardProgress(Authentication authentication,
                                                     @RequestParam int flashcardProgressId) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<FlashcardProgress> flashcardProgressOpt = flashcardProgressRepository.findById(flashcardProgressId);
        if (flashcardProgressOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No flashcardProgress with this id found");
        }

        FlashcardProgress flashcardProgress = flashcardProgressOpt.get();
        Flashcard flashcard = flashcardProgress.getFlashcard();
        Deck deck = flashcard.getDeck();

        AccessLevel al = deck.getAccessLevel(customer);
        if (al == null)
        {
            return ResponseEntity.badRequest().body("You dont have access to this flashcard");
        }

        flashcardProgressRepository.delete(flashcardProgress);
        return ResponseEntity.ok("FlashcardProgress deleted successfully");
    }
}
