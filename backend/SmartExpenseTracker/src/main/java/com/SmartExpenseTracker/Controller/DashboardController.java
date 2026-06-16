package com.SmartExpenseTracker.Controller;

import com.SmartExpenseTracker.dto.response.DashboardSummaryResponse;
import com.SmartExpenseTracker.serviceImpl.DashboardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardServiceImpl dashboardService;

    @GetMapping("/summary/{userId}")
    public ResponseEntity<DashboardSummaryResponse> getDashboardSummary(@PathVariable Long userId) {
        return ResponseEntity.ok(dashboardService.getSummary(userId));
    }
}

