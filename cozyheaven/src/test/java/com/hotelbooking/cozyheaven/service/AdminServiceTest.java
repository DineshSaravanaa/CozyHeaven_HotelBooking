package com.hotelbooking.cozyheaven.service;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.exception.InvalidUsernameException;
import com.hotelbooking.cozyheaven.model.Admin;
import com.hotelbooking.cozyheaven.repository.AdminRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @InjectMocks
    private AdminService adminService;

    @Mock
    private AdminRepository adminRepository;

    Admin admin1;
    Admin admin2;

    @BeforeEach
    public void init() {
        admin1 = new Admin();
        admin1.setId(1);
        admin1.setName("Admin One");
        admin1.setEmail("admin1@example.com");
        admin1.setContact(9876543210L);
        admin1.setLast_Log(LocalDateTime.now());

        admin2 = new Admin();
        admin2.setId(2);
        admin2.setName("Admin Two");
        admin2.setEmail("admin2@example.com");
        admin2.setContact(9999999999L);
        admin2.setLast_Log(LocalDateTime.now().minusDays(2));
    }

    @Test
    public void testAddAdmin() throws InvalidIDException, InvalidUsernameException {
        when(adminRepository.save(admin1)).thenReturn(admin1);
        Admin saved = adminService.addAdmin(admin1);
        assertEquals("Admin One", saved.getName());
    }

    @Test
    public void testGetAdminById_Valid() throws InvalidIDException {
        when(adminRepository.findById(1)).thenReturn(Optional.of(admin1));
        Admin found = adminService.getAdminByID(1);
        assertEquals("admin1@example.com", found.getEmail());
    }

    @Test
    public void testGetAdminById_Invalid() {
        when(adminRepository.findById(5)).thenReturn(Optional.empty());
        assertThrows(InvalidIDException.class, () -> adminService.getAdminByID(5));
    }

    @Test
    public void testUpdateAdmin() {
        when(adminRepository.save(admin2)).thenReturn(admin2);
        Admin updated = adminService.updateAdmin(admin2);
        assertEquals("Admin Two", updated.getName());
    }
}
