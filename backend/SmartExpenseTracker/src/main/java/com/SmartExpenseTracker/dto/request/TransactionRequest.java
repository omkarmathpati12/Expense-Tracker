package com.SmartExpenseTracker.dto.request;

import com.SmartExpenseTracker.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
    @NotBlank(message = "Description is required")
    private String description;
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private BigDecimal amount;
    @NotBlank(message = "Category is required")
    private String category;
    private String notes;
    private LocalDateTime createdAt;
    private User user;
}
