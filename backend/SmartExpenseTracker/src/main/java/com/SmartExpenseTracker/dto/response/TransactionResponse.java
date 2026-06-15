package com.SmartExpenseTracker.dto.response;

import com.SmartExpenseTracker.model.Transaction;
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
public class TransactionResponse {

    private Long id;
    private String description;
    private BigDecimal amount;
    private String category;
    private String notes;
    private LocalDateTime createdDate;

    public static TransactionResponse from(Transaction transaction1) {
        return TransactionResponse.builder()
                .id(transaction1.getId())
                .description(transaction1.getDescription())
                .amount(transaction1.getAmount())
                .category(transaction1.getCategory())
                .notes(transaction1.getNotes())
                .createdDate(transaction1.getCreatedAt())
                .build();
    }
}
