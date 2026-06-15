package com.SmartExpenseTracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private BigDecimal amount;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt ;
    @Column(nullable = false)
    private String description;
    private String notes;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
