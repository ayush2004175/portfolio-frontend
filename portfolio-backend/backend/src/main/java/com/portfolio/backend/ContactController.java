package com.portfolio.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired // This injects our database repository
    private ContactRepository contactRepository;

    @PostMapping("/contact")
    public ResponseEntity<String> receiveMessage(@RequestBody ContactMessage incomingMessage) {

        // Save the message permanently to MySQL
        contactRepository.save(incomingMessage);

        System.out.println("Message saved to Database from: " + incomingMessage.getEmail());

        return ResponseEntity.ok("{\"status\": \"success\", \"message\": \"Message permanently saved to database!\"}");
    }
}