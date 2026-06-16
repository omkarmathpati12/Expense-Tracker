package com.SmartExpenseTracker.service;

import com.SmartExpenseTracker.dto.request.UpdateUserRequest;
import com.SmartExpenseTracker.dto.request.UserRequest;
import com.SmartExpenseTracker.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);
    UserResponse updateUser(Long id,UpdateUserRequest request);
    String deleteUser(Long id);
    UserResponse getUserById(Long id);
    List<UserResponse> getAllUsers();
    UserResponse getUserByEmail(String email);

}
