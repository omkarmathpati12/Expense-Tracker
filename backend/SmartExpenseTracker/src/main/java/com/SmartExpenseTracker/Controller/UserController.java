package com.SmartExpenseTracker.Controller;

import com.SmartExpenseTracker.dto.request.LoginRequest;
import com.SmartExpenseTracker.dto.request.UpdateUserRequest;
import com.SmartExpenseTracker.dto.request.UserRequest;
import com.SmartExpenseTracker.dto.response.UserResponse;
import com.SmartExpenseTracker.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRequest userRequest) {
        UserResponse response=userService.createUser(userRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser( @PathVariable Long id, @Valid @RequestBody UpdateUserRequest req) {
        UserResponse update=userService.updateUser(id,req);
        return ResponseEntity.ok(update);

    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        String delete=userService.deleteUser(id);
        return ResponseEntity.ok(delete);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        UserResponse response=userService.getUserById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users=userService.getAllUsers();
        return ResponseEntity.ok(users);

    }

    @PostMapping("/login")
    public String  login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        if(authentication.isAuthenticated()){
            return "Login sucessfull";
        }
        return "Login failed";
    }
}
