package com.SmartExpenseTracker.Controller;

import com.SmartExpenseTracker.dto.request.TransactionRequest;
import com.SmartExpenseTracker.dto.response.TransactionResponse;
import com.SmartExpenseTracker.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/transaction")
@CrossOrigin(origins = "*" )
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/create")
    public ResponseEntity<TransactionResponse> createTransaction(@Valid @RequestBody TransactionRequest transactionRequest){
        TransactionResponse response=transactionService.createTransaction(transactionRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("transactions")
    public ResponseEntity<List<TransactionResponse>> getAllTransactions(){
        List<TransactionResponse> response=transactionService.getAllTransactions();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionResponse> updateTransaction(@PathVariable Long id, @Valid @RequestBody TransactionRequest transactionRequest){
        TransactionResponse response=transactionService.updateTransaction(id, transactionRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponse> getTransaction(@PathVariable Long id){
        TransactionResponse response=transactionService.getTransaction(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<TransactionResponse>> getAllTransactionsByUser(@PathVariable Long id){
        List<TransactionResponse> response=transactionService.getTransactionsByUserId(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id){
        String response=transactionService.deleteTransaction(id);
        return ResponseEntity.ok(response);
    }
}
