package com.portfolio.backend;

import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository<EntityClass, PrimaryKeyType>
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
    // That's it! Spring automatically writes the SQL code behind the scenes.
}
