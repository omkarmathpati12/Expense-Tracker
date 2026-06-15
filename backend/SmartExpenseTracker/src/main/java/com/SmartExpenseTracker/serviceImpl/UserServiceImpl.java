package com.SmartExpenseTracker.serviceImpl;

import com.SmartExpenseTracker.dto.request.UpdateUserRequest;
import com.SmartExpenseTracker.dto.request.UserRequest;
import com.SmartExpenseTracker.dto.response.UserResponse;
import com.SmartExpenseTracker.exceptions.DuplicateEmailException;
import com.SmartExpenseTracker.exceptions.ResourceNotFoundException;
import com.SmartExpenseTracker.model.Role;
import com.SmartExpenseTracker.model.Transaction;
import com.SmartExpenseTracker.model.User;
import com.SmartExpenseTracker.repository.UserRepo;
import com.SmartExpenseTracker.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {
        if(userRepo.existsByEmail(request.getEmail())) {
            log.error("User with email {} already exists", request.getEmail());
            throw new DuplicateEmailException("Email already exists " + request.getEmail());
        }
        User user=User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .isActive(true)
                .build();

        return UserResponse.from(userRepo.save(user));
    }

    @Override
    public UserResponse updateUser(Long id,UpdateUserRequest req) {
        User user=userRepo.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));
        if(req.getName() !=null) user.setName(req.getName());
        if (req.getRole() !=null) user.setRole(req.getRole());
        if(req.getActive() !=null)  user.setIsActive(req.getActive());
        log.info("User with id {} updated", id);
        return UserResponse.from(userRepo.save(user));
    }

    @Override
    public String deleteUser(Long id) {
        com.SmartExpenseTracker.model.User user =userRepo.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));
        userRepo.delete(user);
        log.info("User with id:{} has been deleted", id);
        return "User with id:{} has been deleted";

    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user=userRepo.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));
        log.info("User with id:{} has been get", id);
        return UserResponse.from(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        log.info("Getting all users");
        return userRepo.findAll().stream()
                .map(user -> UserResponse.builder()
                        .id(user.getUserId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .createdAt(user.getCreatedAt())
                        .isActive(user.getIsActive())
                        .build())
                .toList();
    }

}
