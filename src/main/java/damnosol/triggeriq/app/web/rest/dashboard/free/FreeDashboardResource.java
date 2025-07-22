package damnosol.triggeriq.app.web.rest.dashboard.free;

import damnosol.triggeriq.app.service.dashboard.DashboardService;
import damnosol.triggeriq.app.service.dto.FeedbackEntry;
import damnosol.triggeriq.app.service.dto.SentimentPoint;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class FreeDashboardResource {

    private final DashboardService dashboardService;

    @Autowired
    public FreeDashboardResource(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/sentiment-trend")
    public ResponseEntity<List<SentimentPoint>> getSentimentTrend() {
        List<SentimentPoint> data = dashboardService.getSentimentTrend();
        return ResponseEntity.ok(data);
    }

    //    @GetMapping("/sentiment-trend")
    //    public ResponseEntity<List<SentimentPoint>> getSentimentTrend(Principal principal) {
    //        log.debug("Request by user: {}", principal.getName());
    //        return ResponseEntity.ok(dashboardService.getSentimentTrend());
    //    }

    @GetMapping("/recent-feedback")
    public ResponseEntity<List<FeedbackEntry>> getRecentFeedback() {
        List<FeedbackEntry> data = dashboardService.getRecentFeedback();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/sustainability-keywords")
    public ResponseEntity<Map<String, Long>> getKeywordFrequency() {
        Map<String, Long> data = dashboardService.getSustainabilityKeywordFrequency();
        return ResponseEntity.ok(data);
    }
}
