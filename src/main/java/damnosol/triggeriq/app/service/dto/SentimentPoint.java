package damnosol.triggeriq.app.service.dto;

import java.time.LocalDate;

public record SentimentPoint(LocalDate date, double score) {}
