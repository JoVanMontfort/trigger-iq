package damnosol.triggeriq.app.service;

import static org.junit.jupiter.api.Assertions.*;

import damnosol.triggeriq.app.service.dashboard.DashboardService;
import damnosol.triggeriq.app.service.dto.FeedbackEntry;
import damnosol.triggeriq.app.service.dto.SentimentPoint;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

public class DashboardServiceTest {

    private final DashboardService dashboardService = new DashboardService();

    @Test
    public void testGetSentimentTrend() {
        // Fetch the sentiment trend
        List<SentimentPoint> sentimentTrend = dashboardService.getSentimentTrend();

        // Check that the list is not empty
        assertNotNull(sentimentTrend);
        assertFalse(sentimentTrend.isEmpty());

        // Verify that the list has 30 elements (since you generate 30 points)
        assertEquals(30, sentimentTrend.size());

        // Optionally: Check the first sentiment point has valid date and score
        SentimentPoint firstPoint = sentimentTrend.get(0);
        assertNotNull(firstPoint.date());
        assertTrue(firstPoint.score() >= -1 && firstPoint.score() <= 1); // Assuming sentiment score range is [-1, 1]
    }

    @Test
    public void testGetRecentFeedback() {
        // Fetch recent feedback
        List<FeedbackEntry> feedback = dashboardService.getRecentFeedback();

        // Check that the list is not empty
        assertNotNull(feedback);
        assertFalse(feedback.isEmpty());

        // Check if it contains at least two entries (positive and negative feedback)
        assertEquals(2, feedback.size());

        // Check feedback contents (you can adapt this based on your FeedbackEntry class)
        assertEquals("Love the eco packaging!", feedback.get(0).comment());
        assertEquals("positive", feedback.get(0).sentiment());

        assertEquals("The new design is hard to recycle.", feedback.get(1).comment());
        assertEquals("negative", feedback.get(1).sentiment());
    }

    @Test
    public void testGetSustainabilityKeywordFrequency() {
        // Fetch sustainability keyword frequency
        Map<String, Long> keywordFrequency = dashboardService.getSustainabilityKeywordFrequency();

        // Check that the map is not empty
        assertNotNull(keywordFrequency);
        assertFalse(keywordFrequency.isEmpty());

        // Verify the size of the map (should contain 3 keywords)
        assertEquals(3, keywordFrequency.size());

        // Check for individual keywords and their frequencies
        assertTrue(keywordFrequency.containsKey("eco"));
        assertEquals(12L, keywordFrequency.get("eco").longValue());

        assertTrue(keywordFrequency.containsKey("recyclable"));
        assertEquals(9L, keywordFrequency.get("recyclable").longValue());

        assertTrue(keywordFrequency.containsKey("carbon footprint"));
        assertEquals(4L, keywordFrequency.get("carbon footprint").longValue());
    }
}
