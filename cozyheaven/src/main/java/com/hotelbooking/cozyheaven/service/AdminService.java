package com.hotelbooking.cozyheaven.service;

import java.util.Optional;
import com.hotelbooking.cozyheaven.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.exception.InvalidUsernameException;
import com.hotelbooking.cozyheaven.model.Admin;
import com.hotelbooking.cozyheaven.model.User;
import com.hotelbooking.cozyheaven.repository.AdminRepository;

@Service
public class AdminService {

    private final ReportRepository reportRepository;

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private AuthService authService;

    AdminService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    // Add a new Admin
    public Admin addAdmin(Admin admin) throws InvalidIDException, InvalidUsernameException {
    	User user = admin.getUser();
    	authService.signUp(user);
        return adminRepository.save(admin);
    }

    // Get Admin by ID
    public Admin getAdminByID(int adminid) throws InvalidIDException {
    	Optional<Admin> optional = adminRepository.findById(adminid);
    	if(optional.isEmpty())
    		throw new InvalidIDException("Admin Id Is Invalid and Not Available ");
        return optional.get();
        
              
    }

    // Update Admin details
    public Admin updateAdmin(Admin existingAdmin) {
		return adminRepository.save(existingAdmin);
	}

	public Admin getByUsername(String username) {
		return adminRepository.findByUserUsername(username);
	}

	
}
