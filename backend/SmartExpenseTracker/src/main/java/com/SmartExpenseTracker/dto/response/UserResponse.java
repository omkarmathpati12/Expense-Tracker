package com.SmartExpenseTracker.dto.response;

import com.SmartExpenseTracker.model.Role;
import com.SmartExpenseTracker.model.Transaction;
import com.SmartExpenseTracker.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
    private boolean isActive;


    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .isActive(user.getIsActive())
                .build();
    }
}
