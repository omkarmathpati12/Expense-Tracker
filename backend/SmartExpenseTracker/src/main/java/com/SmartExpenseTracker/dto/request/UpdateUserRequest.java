package com.SmartExpenseTracker.dto.request;

import com.SmartExpenseTracker.model.Role;
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
    private Role role;
    private Boolean active;
}
