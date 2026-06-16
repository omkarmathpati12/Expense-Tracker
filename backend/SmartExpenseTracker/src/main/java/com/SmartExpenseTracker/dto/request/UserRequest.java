package com.SmartExpenseTracker.dto.request;

import com.SmartExpenseTracker.model.Role;
import com.SmartExpenseTracker.model.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    @NotNull(message = "Name is required")
    private String name;
    @Email
    @NotNull(message = "Email is required")
    private String email;
    @NotNull(message = "Password is required")
    private String password;
    private Role role;
    private UserStatus status;
}
