import React, { useState } from "react";
import './Folder.css';
import { useNavigate } from "react-router-dom";

const Folder = ({ id, title, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/folder/${id}`);
    }

    return (
        <div className="folder">
            <div className="folder-header">
                <div className="folder-title">{title}</div>
            </div>

            <div className="folder-actions">
                <button className="folder-page-btn folder-page-study-btn" onClick={handleClick}>Open</button>
                <button className="folder-page-btn folder-page-edit-btn" onClick={() => onEdit(id, title)}>Edit</button>
                <button className="folder-page-btn folder-page-delete-btn" onClick={() => onDelete(id, title)}>Delete</button>
            </div>
        </div>
    );
}

export default Folder;
