package com.PAP_team_21.flashcards.notification;

import com.PAP_team_21.flashcards.friendship.Friendship;
import com.PAP_team_21.flashcards.user.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Notifications")
@Getter
@Setter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_id", insertable = false, updatable = false)
    private int userId;

    @Column(name = "received")
    private boolean received;

    @Column(name = "text")
    private String text;

    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @Column(name = "received_date")
    private LocalDateTime receivedDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Customer customer;

    @ManyToMany(mappedBy = "notifications", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<Friendship> friendships;

    public Notification() {}

    public Notification(int userId, boolean received, String text, LocalDateTime creationDate,
                        LocalDateTime receivedDate) {
        this.userId = userId;
        this.received = received;
        this.text = text;
        this.creationDate = creationDate;
        this.receivedDate = receivedDate;
    }
}
