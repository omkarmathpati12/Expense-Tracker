package com.SmartExpenseTracker.serviceImpl;

import com.SmartExpenseTracker.dto.request.TransactionRequest;
import com.SmartExpenseTracker.dto.response.TransactionResponse;
import com.SmartExpenseTracker.exceptions.ResourceNotFoundException;
import com.SmartExpenseTracker.model.Transaction;
import com.SmartExpenseTracker.model.User;
import com.SmartExpenseTracker.repository.TransactionRepo;
import com.SmartExpenseTracker.repository.UserRepo;
import com.SmartExpenseTracker.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionImpl implements TransactionService {

    private final TransactionRepo transactionRepo;
    private final UserRepo userRepo;

    @Override
    public TransactionResponse createTransaction(TransactionRequest request) {
        log.info("Creating Transaction");
        User user=userRepo.findById(request.getUser().getUserId())
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));
        Transaction transaction =Transaction.builder()
                .amount(request.getAmount())
                .description(request.getDescription())
                .category(request.getCategory())
                .notes(request.getNotes())
                .createdAt(request.getCreatedAt())
                .user(user)
                .build();

        Transaction transaction1=transactionRepo.save(transaction);
        log.info("Transaction created with id {}", transaction.getId());
        return TransactionResponse.from(transaction1);
    }

    @Override
    public TransactionResponse updateTransaction(Long id, TransactionRequest request) {

        log.info("Updating Transaction");
        User user=userRepo.findById(request.getUser().getUserId())
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));
        Transaction transaction =Transaction.builder()
                .amount(request.getAmount())
                .description(request.getDescription())
                .category(request.getCategory())
                .notes(request.getNotes())
                .createdAt(request.getCreatedAt())
                .user(user)
                .build();

        Transaction transaction1=transactionRepo.save(transaction);
        log.info("Transaction updated with id {}", transaction.getId());
        return TransactionResponse.from(transaction1);
    }

    @Override
    public TransactionResponse getTransaction(Long id) {
        Transaction transaction=transactionRepo.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Transaction not found"));
        return TransactionResponse.from(transaction);
    }

    @Override
    public List<TransactionResponse> getAllTransactions() {
        log.info("Getting Transactions");
        return transactionRepo.findAll().stream()
                .map(transaction -> TransactionResponse.builder()
                        .id(transaction.getId())
                        .description(transaction.getDescription())
                .amount(transaction.getAmount())
                .category(transaction.getCategory())
                .notes(transaction.getNotes())
                .createdDate(transaction.getCreatedAt())
                .build()).toList();
    }

    @Override
    public List<TransactionResponse> getTransactionsByUserId(Long id) {
        User user=userRepo.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));
        return transactionRepo.findByUser(user).stream()
                .map(transaction -> TransactionResponse.builder()
                        .id(transaction.getId())
                        .description(transaction.getDescription())
                        .amount(transaction.getAmount())
                        .category(transaction.getCategory())
                        .notes(transaction.getNotes())
                        .createdDate(transaction.getCreatedAt())
                        .build()).toList();
    }

    @Override
    public String deleteTransaction(Long id) {
        Transaction transaction=transactionRepo.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Transaction not found"));
        transactionRepo.delete(transaction);
        log.info("Transaction deleted with id {}", transaction.getId());
        return "Transaction has been deleted";
    }
}
