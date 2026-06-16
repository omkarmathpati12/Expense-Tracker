package com.SmartExpenseTracker.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryResponse {

    private Long userId;
    private BigDecimal totalExpense;
    private Integer totalTransactions;

    public static DashboardSummaryResponse of(Long userId, BigDecimal totalExpense, Integer totalTransactions) {
        return DashboardSummaryResponse.builder()
                .userId(userId)
                .totalExpense(totalExpense)
                .totalTransactions(totalTransactions)
                .build();
    }
}

