package com.SmartExpenseTracker.serviceImpl;

import com.SmartExpenseTracker.dto.response.DashboardSummaryResponse;
import com.SmartExpenseTracker.exceptions.ResourceNotFoundException;
import com.SmartExpenseTracker.repository.TransactionRepo;
import com.SmartExpenseTracker.repository.UserRepo;
import com.SmartExpenseTracker.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardServiceImpl {

    private final UserRepo userRepo;
    private final TransactionRepo transactionRepo;

    public DashboardSummaryResponse getSummary(Long userId) {
        log.info("Fetching dashboard summary for userId: {}", userId);
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        var transactions = transactionRepo.findByUser(user);

        BigDecimal totalExpense = transactions.stream()
                .map(t -> t.getAmount() == null ? BigDecimal.ZERO : t.getAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return DashboardSummaryResponse.of(
                userId,
                totalExpense,
                transactions.size()
        );
    }
}

