import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import './Share.css';
import DeckService from "../../../services/DeckService";
import ShareService from "../../../services/ShareService";
import FolderService from "../../../services/FolderService";
import filterRootFolder from "../../../utils/filterRootFolder";

const Share = () => {
    const [selectedExportDeck, setSelectedExportDeck] = useState("");
    const [selectedImportFolder, setSelectedImportFolder] = useState("");
    const [selectedShareFolder, setSelectedShareFolder] = useState("");
    const [importFile, setImportFile] = useState(null);
    const [decksToChoose, setDecksToChoose] = useState([]);
    const [foldersToChoose, setFoldersToChoose] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState("");
    const [friendsList, setFriendsList] = useState([]);

    const handlePdfExport = async () => {
        if (!selectedExportDeck) {
            alert("Please select a deck to export.");
            return;
        }
        alert(`Exporting deck: ${selectedExportDeck} as pdf`);

        try {
            const pdfBlob = await ShareService.generatePdf(selectedExportDeck);
            const blobUrl = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${selectedExportDeck}-deck.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error while generating PDF: ", error);
            alert("Error while generating PDF. Please try again.");
        }
    };

    const handleTxtExport = async () => {
        if (!selectedExportDeck) {
            alert("Please select a deck to export.");
            return;
        }
        alert(`Exporting deck: ${selectedExportDeck} as txt`);

        try {
            const txtBlob = await ShareService.generateTxt(selectedExportDeck);
            const blobUrl = window.URL.createObjectURL(
                new Blob([txtBlob], { type: "text/plain" })
            );

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${selectedExportDeck}-deck.txt`;
            link.click();
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Error while generating PDF: ", error);
            alert("Error while generating TXT. Please try again.");
        }
    };

    const handleImport = async () => {
        if (!selectedImportFolder || !importFile) {
            alert("Please select a folder and a file to import.");
            return;
        }
        alert(`Importing into folder: ${selectedImportFolder}`);

        try {
            await ShareService.loadDeck(importFile, selectedImportFolder);
            alert("Deck imported successfully!");
        } catch (error) {
            console.error("Error while generating PDF: ", error);
        }
    };

    const handleFileChange = (event) => {
        setImportFile(event.target.files[0]);
    };

    const handleShare = async () => {
        if (!selectedImportFolder || !selectedFriend) {
            alert("Please select a folder and a friend to share with.");
            return;
        }
        alert(`Sharing folder: ${selectedImportFolder} with friend: ${selectedFriend}`);

        try {
            await ShareService.shareFolder(selectedImportFolder, selectedFriend);
            alert("Folder shared successfully!");
        } catch (error) {
            console.error("Error while sharing folder: ", error);
            alert("Error while sharing folder. Please try again.");
        }
    };

    useEffect(() => {
        const fetchDecksToChoose = async () => {
            try {
                const fetchedDecks = await DeckService.getAllDecks();
                setDecksToChoose(fetchedDecks || []);
                setSelectedExportDeck(fetchedDecks[0]?.id);
            } catch (error) {
                console.log("Error while fetching decks: ", error);
            }
        };

        const fetchFoldersToChoose = async () => {
            try {
                const fetchedFolders = await FolderService.getAllFolders();
                const foldersWithoutRoot = filterRootFolder(fetchedFolders);
                setFoldersToChoose(foldersWithoutRoot || []);
                setSelectedImportFolder(foldersWithoutRoot[0]?.id);
            } catch (error) {
                console.log("Error while fetching folders: ", error);
            }
        };

        const fetchFriendsList = async () => {
            try {
                const fetchedFriends = await ShareService.getFriendsList();
                setFriendsList(fetchedFriends || []);
                setSelectedFriend(fetchedFriends[0]?.id);
            } catch (error) {
                console.log("Error while fetching friends list: ", error);
            }
        };

        fetchDecksToChoose();
        fetchFoldersToChoose();
        fetchFriendsList();
    }, []);


    return (
        <div className="main-importcontainer">
        <Navbar />
        <div className="import">
            {/* Export Section */}
            <div className="section">
                <h3>Export Deck</h3>
                <div className="field-container">
                    <select
                        className="dropdown"
                        value={selectedExportDeck}
                        onChange={(e) => setSelectedExportDeck(e.target.value)}
                    >
                        <option value="">Select a deck to export</option>
                        {Array.isArray(decksToChoose) ? (
                            decksToChoose.map((deck, index) => (
                                <option key={index} value={deck.id}>
                                    {deck.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No decks available</option>
                        )}
                    </select>
                    <button className="btn" onClick={handlePdfExport}>
                        Export as PDF
                    </button>
                    <button className="btn" onClick={handleTxtExport}>
                        Export as TXT
                    </button>
                </div>
            </div>

            {/* Import Section */}
            <div className="section">
                <h3>Import into Folder</h3>
                <div className="field-container">
                    <select
                        className="dropdown"
                        value={selectedImportFolder}
                        onChange={(e) => setSelectedImportFolder(e.target.value)}
                    >
                        <option value="">Select a folder to import into</option>
                        {Array.isArray(decksToChoose) ? (
                            foldersToChoose.map((folder, index) => (
                                <option key={index} value={folder.id}>
                                    {folder.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No folder available</option>
                        )}
                    </select>
                    <input
                        type="file"
                        className="file-input"
                        onChange={handleFileChange}
                    />
                    <button className="btn" onClick={handleImport}>
                        Import
                    </button>
                </div>
            </div>

            {/* Share Section */}
            <div className="section">
                <h3>Share Folder with Friends</h3>
                <div className="field-container">
                    <select
                        className="dropdown"
                        value={selectedShareFolder}
                        onChange={(e) => setSelectedShareFolder(e.target.value)}
                    >
                        <option value="">Select a folder to share</option>
                        {Array.isArray(foldersToChoose) ? (
                            foldersToChoose.map((folder, index) => (
                                <option key={index} value={folder.id}>
                                    {folder.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No folder available</option>
                        )}
                    </select>
                    <select
                        className="dropdown"
                        value={selectedFriend}
                        onChange={(e) => setSelectedFriend(e.target.value)}
                    >
                        <option value="">Select a friend</option>
                        {Array.isArray(friendsList) ? (
                            friendsList.map((friend, index) => (
                                <option key={index} value={friend.id}>
                                    {friend.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No friends available</option>
                        )}
                    </select>
                    <button className="btn" onClick={handleShare}>
                        Share
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Share;
