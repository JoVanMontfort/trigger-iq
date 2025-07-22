package damnosol.triggeriq.app.service.dashboard;

import damnosol.triggeriq.app.service.dto.FeedbackEntry;
import damnosol.triggeriq.app.service.dto.SentimentPoint;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    public List<SentimentPoint> getSentimentTrend() {
        return IntStream.range(0, 30)
            .mapToObj(i -> new SentimentPoint(LocalDate.now().minusDays(i), Math.random() * 2 - 1))
            .collect(Collectors.toList());
    }

    public List<FeedbackEntry> getRecentFeedback() {
        return List.of(
            new FeedbackEntry("Love the eco packaging!", "positive"),
            new FeedbackEntry("The new design is hard to recycle.", "negative")
        );
    }

    public Map<String, Long> getSustainabilityKeywordFrequency() {
        return Map.of("eco", 12L, "recyclable", 9L, "carbon footprint", 4L);
    }
}
