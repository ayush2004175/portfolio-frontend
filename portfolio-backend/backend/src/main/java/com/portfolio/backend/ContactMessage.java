package com.portfolio.backend;

import jakarta.persistence.*;

@Entity // Tells Spring this is a Database Table
public class ContactMessage {

    @Id // Tells Spring this is the Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments the ID
    private Long id;

    private String title;
    private String email;

    @Column(columnDefinition = "TEXT") // Allows for longer messages
    private String body;

    // Default Constructor
    public ContactMessage() {}

    // --- GETTERS AND SETTERS ---

    // ID
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // Title
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    // Email (This is the method the compiler was looking for!)
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    // Body
    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
}