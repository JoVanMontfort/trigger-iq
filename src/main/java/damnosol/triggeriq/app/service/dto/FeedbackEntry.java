package damnosol.triggeriq.app.service.dto;

import java.time.Instant;
import java.util.List;

public record FeedbackEntry(String comment, String sentiment, Instant timestamp, List<String> matchedKeywords) {}
