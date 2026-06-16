package com.SmartExpenseTracker.dto.request;

import com.SmartExpenseTracker.model.Role;
import com.SmartExpenseTracker.model.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    @Size(min=2, max=20)
    private String name;
    @Email
    private String email;
    private String password;
    private Role role;
    private UserStatus status;
}
