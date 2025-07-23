package damnosol.triggeriq.app.service.dashboard;

import damnosol.triggeriq.app.service.dto.FeedbackEntry;
import damnosol.triggeriq.app.service.dto.SentimentPoint;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    public static final List<String> SUSTAINABILITY_KEYWORDS = List.of(
        "eco",
        "recycle",
        "green",
        "sustainable",
        "carbon",
        "refill",
        "biodegradable",
        "packaging",
        "footprint",
        "recyclable",
        "plastic"
    );
    public static final int DAY = 86400;

    private final List<FeedbackEntry> feedbackEntries = List.of(
        // Today
        createFeedback("Love the eco packaging!", "positive", Instant.now().minusSeconds(3600)),
        // 1 Day Ago
        createFeedback("Great move on offering recyclable containers!", "positive", Instant.now().minusSeconds(DAY)),
        // 2 Days Ago
        createFeedback("I noticed your boxes are now recyclable. Big win!", "positive", Instant.now().minusSeconds(2 * DAY)),
        createFeedback("Eco materials are good, but durability is a concern.", "neutral", Instant.now().minusSeconds(2 * DAY)),
        createFeedback("Not sure if the new packaging is really sustainable.", "neutral", Instant.now().minusSeconds(2 * DAY)),
        createFeedback("There’s still too much plastic wrap around each item.", "negative", Instant.now().minusSeconds(2 * DAY)),
        createFeedback("Absolutely love the new biodegradable wrappers!", "positive", Instant.now().minusSeconds(2 * DAY)),
        // 3 Days Ago
        createFeedback("Loving the new carbon-conscious branding!", "positive", Instant.now().minusSeconds(3 * DAY)),
        createFeedback("Can’t recycle the inner foil packaging. Disappointed.", "negative", Instant.now().minusSeconds(3 * DAY)),
        createFeedback("Eco-friendly design feels much better now.", "positive", Instant.now().minusSeconds(3 * DAY)),
        createFeedback("The new design is hard to recycle.", "negative", Instant.now().minusSeconds(3 * DAY)),
        // 4 Days Ago
        createFeedback("Green initiative sounds nice, but execution is lacking.", "neutral", Instant.now().minusSeconds(4 * DAY)),
        createFeedback("The carbon offset calculator on the site is brilliant!", "positive", Instant.now().minusSeconds(4 * DAY)),
        createFeedback("You should use more recycled paper for invoices.", "neutral", Instant.now().minusSeconds(4 * DAY)),
        createFeedback("Love that you now use green dyes for labels.", "positive", Instant.now().minusSeconds(4 * DAY)),
        // 5 Days Ago
        createFeedback("Eco bags tore easily. Please improve material quality.", "negative", Instant.now().minusSeconds(5 * DAY)),
        createFeedback("Packaging felt more minimal this time, good job!", "positive", Instant.now().minusSeconds(5 * DAY)),
        createFeedback("Still unclear how to properly recycle the inner tray.", "neutral", Instant.now().minusSeconds(5 * DAY)),
        createFeedback("Please reduce the plastic in your shipping materials.", "negative", Instant.now().minusSeconds(5 * DAY)),
        // 6 Days Ago
        createFeedback("Love the use of recycled materials in the new shipment!", "positive", Instant.now().minusSeconds(6 * DAY)),
        createFeedback("Eco labeling was confusing on my last order.", "neutral", Instant.now().minusSeconds(6 * DAY)),
        createFeedback("The refill option is super convenient and eco-friendly.", "positive", Instant.now().minusSeconds(6 * DAY)),
        // 7 Days Ago
        createFeedback("Carbon footprint reduction is clear—kudos!", "positive", Instant.now().minusSeconds(7 * DAY)),
        createFeedback("The green color palette feels more natural.", "positive", Instant.now().minusSeconds(7 * DAY)),
        createFeedback("Still unsure about the recyclable claims.", "neutral", Instant.now().minusSeconds(7 * DAY)),
        createFeedback("I expected more clarity on your recycling guidelines.", "neutral", Instant.now().minusSeconds(7 * DAY)),
        // 8 to 15 Days Ago
        createFeedback("Why so much cardboard for such a small item?", "negative", Instant.now().minusSeconds(8 * DAY)),
        createFeedback("Appreciate your efforts to reduce carbon footprint!", "positive", Instant.now().minusSeconds(9 * DAY)),
        createFeedback("Your carbon-neutral delivery really makes a difference.", "positive", Instant.now().minusSeconds(10 * DAY)),
        createFeedback(
            "Would love to see a breakdown of your carbon footprint per order.",
            "neutral",
            Instant.now().minusSeconds(11 * DAY)
        ),
        createFeedback("The new product line feels much more eco-conscious.", "positive", Instant.now().minusSeconds(12 * DAY)),
        createFeedback("Too much non-recyclable material in the recent shipment.", "negative", Instant.now().minusSeconds(13 * DAY)),
        createFeedback("Still waiting on a sustainable delivery option in my region.", "neutral", Instant.now().minusSeconds(14 * DAY)),
        createFeedback("Your packaging doesn't feel very eco-friendly.", "negative", Instant.now().minusSeconds(15 * DAY))
    );

    public List<FeedbackEntry> getRecentFeedback() {
        return feedbackEntries;
    }

    public List<SentimentPoint> getSentimentTrend() {
        // Simulate sentiment scores based on feedbackEntries
        Map<LocalDate, List<Double>> groupedScores = feedbackEntries
            .stream()
            .collect(
                Collectors.groupingBy(
                    entry -> entry.timestamp().atZone(java.time.ZoneId.systemDefault()).toLocalDate(),
                    Collectors.mapping(
                        entry ->
                            switch (entry.sentiment().toLowerCase()) {
                                case "positive" -> 0.6 + Math.random() * 0.4; // 0.6 to 1.0
                                case "negative" -> -1.0 + Math.random() * 0.4; // -1.0 to -0.6
                                case "neutral" -> -0.2 + Math.random() * 0.4; // -0.2 to +0.2
                                default -> 0.0;
                            },
                        Collectors.toList()
                    )
                )
            );

        return groupedScores
            .entrySet()
            .stream()
            .sorted(Map.Entry.<LocalDate, List<Double>>comparingByKey().reversed())
            .map(entry ->
                new SentimentPoint(entry.getKey(), entry.getValue().stream().mapToDouble(Double::doubleValue).average().orElse(0.0))
            )
            .limit(30)
            .collect(Collectors.toList());
    }

    public Map<String, Long> getSustainabilityKeywordFrequency() {
        return feedbackEntries
            .stream()
            .flatMap(entry -> entry.matchedKeywords().stream())
            .collect(Collectors.groupingBy(k -> k, Collectors.counting()));
    }

    private FeedbackEntry createFeedback(String comment, String sentiment, Instant timestamp) {
        List<String> matchedKeywords = SUSTAINABILITY_KEYWORDS.stream().filter(kw -> comment.toLowerCase().contains(kw)).toList();

        return new FeedbackEntry(comment, sentiment, timestamp, matchedKeywords);
    }
}
