package com.SmartExpenseTracker.service;

import com.SmartExpenseTracker.dto.request.TransactionRequest;
import com.SmartExpenseTracker.dto.response.TransactionResponse;

import java.util.List;

public interface TransactionService {

    TransactionResponse createTransaction(TransactionRequest request);
    TransactionResponse updateTransaction(Long id,TransactionRequest request);
    TransactionResponse getTransaction(Long id);
    List<TransactionResponse> getAllTransactions();
    List<TransactionResponse> getTransactionsByUserId(Long id);
    String deleteTransaction(Long id);

}
