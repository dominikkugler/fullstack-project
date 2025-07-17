package com.learning_springboot.learning_springboot.service;

import com.learning_springboot.learning_springboot.dto.CategoryDto;
import com.learning_springboot.learning_springboot.entity.Category;
import com.learning_springboot.learning_springboot.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public CategoryDto create(String name) {
        System.out.println("Received name: " + name);
        if (repo.findByName(name).isPresent()) {
            throw new IllegalArgumentException("Category name already exists");
        }
        Category cat = new Category();
        cat.setName(name);
        cat = repo.save(cat);
        return mapToDto(cat);
    }

    public List<CategoryDto> getAll() {
        return repo.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    public CategoryDto getById(Long id) {
        Category cat  = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        return mapToDto(cat);
    }

    public CategoryDto update(Long id, CategoryDto dto) {
        Category cat = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        cat.setName(dto.getName());
        cat = repo.save(cat);
        return mapToDto(cat);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Category not found");
        }
        repo.deleteById(id);
    }

    private CategoryDto mapToDto(Category cat ) {
        CategoryDto dto = new CategoryDto();
        dto.setId(cat.getId());
        dto.setName(cat.getName());
        return dto;
    }
}
