package com.learning_springboot.learning_springboot.repository;

import com.learning_springboot.learning_springboot.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
}
