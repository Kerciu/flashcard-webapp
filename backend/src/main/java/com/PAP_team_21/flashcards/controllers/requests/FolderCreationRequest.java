package com.PAP_team_21.flashcards.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FolderCreationRequest {
    private String name;
    private int parentId;
}



