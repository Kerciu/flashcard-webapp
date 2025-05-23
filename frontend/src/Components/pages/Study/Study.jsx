import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../Navbar/Navbar";
import "./Study.css";
import ReviewService from "../../../services/ReviewService";
import FlashcardService from "../../../services/FlashcardService";
import Overlay from "../../Overlay/Overlay";
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import DeckService from "../../../services/DeckService";

const INTERVALS = {
  FORGOT: 0,
  HARD: 1,
  MID: 2,
  EASY: 3,
};

const Study = () => {
  const { deckId } = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [showBack, setShowBack] = useState(false);

  const [deckInfo, setDeckInfo] = useState(null);
  const [flashcardCount, setFlashcardCount] = useState(0);

  const [currentCardFront, setCurrentCardFront] = useState("");
  const [currentCardBack, setCurrentCardBack] = useState("");

  const [editedCardFront, setEditedCardFront] = useState("");
  const [editedCardBack, setEditedCardBack] = useState("");

  const {isOverlayOpen, toggleOverlay, closeOverlay} = useOverlay();

  useEffect(() => {
    const requestReview = async () => {
      try {
        const response = await ReviewService.requestReview(deckId, 10);
        console.log("Review response: ", response);
        setCards(response || []);
      } catch (error) {
        console.error("Error while requesting review: ", error);
      }
    };

    const fetchDeckInfo = async () => {
      try {
        const response = await DeckService.getDeck(deckId);
        console.log("Deck info: ", response);
        setDeckInfo(response);
      } catch (error) {
        console.error("Error while fetching detch: ", error);
      }
    }

    requestReview();
    fetchDeckInfo();
  }, [deckId]);

  useEffect(() => {
    setFlashcardCount(cards.length);
    if (cards && cards.length > 0 && currentCardIndex >= 0) {
      const currentCard = cards[currentCardIndex];
      setCurrentCardFront(currentCard.front);
      setCurrentCardBack(currentCard.back);
    }
  }, [cards, currentCardIndex]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        setShowBack((prev) => !prev);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleProgressUpdate = async (interval) => {
    if (!cards[currentCardIndex]) return;

    const currentCard = cards[currentCardIndex];

    try {
      console.log("Sending results for card: ", currentCard.id);
      await ReviewService.sendBackResults(currentCard.id, interval);
      console.log("Results sent successfully!");

      const remainingCards =
        interval === INTERVALS.EASY
          ? cards.filter((card) => card.id !== currentCard.id)
          : cards;

      setCards(remainingCards);
      console.log("Remaining cards: ", remainingCards);

      setCurrentCardIndex(Math.floor(Math.random() * remainingCards.length));
      console.log("Current card index: ", currentCardIndex);

      setShowBack(false);
    } catch (error) {
      console.error("Error while sending results: ", error);
    }
  };

  if (!deckInfo) {
    return <div>
        <Navbar />
        <div>
          Loading deck...
        </div>
      </div>;
  }

  if (cards.length === 0) {
    return <div>
        <Navbar />
        <div>
          No cards available...
        </div>
      </div>;
  }

  const handleEditFlashcard = async () => {
    try {
      if (editedCardBack.length === 0 || editedCardFront.length === 0) {
        alert("Front or back should not be empty!");
        return;
      }
      if (currentCard) {
        const response = await FlashcardService.updateFlashcard(currentCard.id, editedCardFront, editedCardBack);
        console.log("Flashcard updated:", response);
        alert("Flashcard updated successfully!");

        const updatedCard = {
          ...currentCard,
          front: editedCardFront,
          back: editedCardBack,
        };

        const updatedCards = cards.map((card, index) =>
          index === currentCardIndex ? updatedCard : card
        );
        setCards(updatedCards);

        setCurrentCardFront(editedCardFront);
        setCurrentCardBack(editedCardBack);

      } else {
        alert("Flashcard doesn't exist!");
      }

    } catch (error) {
      alert("Error occured while editing flashcard..");
      console.error("Error while editing flashcard: ", error);
    } finally {
      closeOverlay();
    }
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="study">
      <Navbar />
      <div className="study-container">

        <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
          <div className="plus-button-create-deck">
              <h3>Edit Flashcard</h3>

              <input
                  type="text"
                  placeholder="Front.."
                  value={editedCardFront}
                  onChange={(e) => setEditedCardFront(e.target.value)}
                  required
              />

              <input
                  type="text"
                  placeholder="Back.."
                  value={editedCardBack}
                  onChange={(e) => setEditedCardBack(e.target.value)}
                  required
              />

              <button type="button" onClick={handleEditFlashcard}>Save</button>
          </div>
        </Overlay>

        <p>You're studying deck: {deckInfo.name || "N/A"}</p>
        <p>Flashcards remaining: {flashcardCount}</p>
        <p>Press SPACE to flip flashcard</p>
        {currentCard && currentCard.front && currentCard.back ? (
          <>
            <div className="card">
              {showBack ? (
                <div className="back">{currentCardBack}</div>
              ) : (
                <div className="front">{currentCardFront}</div>
              )}
            </div>
            <div className="progress-buttons">
              <button onClick={() => handleProgressUpdate(INTERVALS.FORGOT)}>Repeat</button>
              <button onClick={() => handleProgressUpdate(INTERVALS.HARD)}>Hard</button>
              <button onClick={() => handleProgressUpdate(INTERVALS.MID)}>Mid</button>
              <button onClick={() => handleProgressUpdate(INTERVALS.EASY)}>Easy</button>
            </div>
            <button className="edit-button" onClick={toggleOverlay}>Edit</button>
          </>
        ) : (
          <p>No flashcards to study!</p>
        )}
      </div>
    </div>
  );
};

export default Study;
