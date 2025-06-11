# 🧠 Tenant-Driven Data Automation Specification

This document defines the architecture and behavior of a system where each tenant can configure their own data ingestion pipelines through the TriggerIQ platform.

---

## 📌 Overview

Tenants should be able to configure:
- Data sources (APIs, surveys, file uploads, webhooks)
- Automation triggers (polling intervals, event-based uploads)
- Secure access (auth headers, tokens, credentials)
- Target formats (JSON, CSV, etc.)

---

## 🧩 System Components

### 1. Frontend (Angular)
- `ConfigDashboardComponent`
- Subcomponents: `ApiConfigComponent`, `SurveyConfigComponent`, `UploadConfigComponent`, `WebhookConfigComponent`
- Features:
  - Tenant-specific view after login
  - Dynamic form builder per data type
  - Form validation + test data buttons

### 2. Backend (Spring Boot)
- Authentication: JWT-based multi-tenant auth
- REST API:
  - `GET /api/config`
  - `POST /api/config`
  - `PATCH /api/config/{id}`
  - `DELETE /api/config/{id}`
- Services:
  - ConfigService: handles CRUD
  - SchedulerService: polls APIs based on tenant cron jobs
  - WebhookController: handles external push-based data
- Data:
  - `TenantConfig` JPA Entity
  - Postgres table with JSONB or structured columns

---

## 🗃️ Database Schema (PostgreSQL)

```sql
CREATE TABLE tenant_config (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    type VARCHAR(20) CHECK (type IN ('api', 'survey', 'upload', 'webhook')),
    config JSONB NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    schedule_cron VARCHAR,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
```

---

## 🔄 Automation Flow

```mermaid
graph TD
  A[Tenant Logs In] --> B[Dashboard Loads]
  B --> C[Configures API / Survey / Upload / Webhook]
  C --> D[Save Config (POST /api/config)]
  D --> E[Store in DB (tenant_config table)]

  E --> F[Spring Scheduler or NiFi Watches Configs]
  F --> G1[API Polling Triggered]
  F --> G2[Webhook Received]
  F --> G3[MinIO File Upload Detected]

  G1 --> H[Data pushed to NiFi or Processor Queue]
  G2 --> H
  G3 --> H

  H --> I[Parse & Transform]
  I --> J[Route to Storage or Analytics]
```

---

## 🔐 Security

- All config access is scoped by `tenant_id` (from JWT)
- Configs encrypted at rest (e.g., using JCE or Vault)
- Rate limiting and validation on webhook endpoints

---

## 🧰 NiFi Integration

- NiFi pulls config from DB via JDBC or REST
- Listeners:
  - ListS3 / FetchS3 for file uploads
  - InvokeHTTP for API polling
  - HandleHttpRequest for webhooks
- Dynamic routing using tenant_id context variable

---

## 📦 MinIO Storage Layout

```
minio/
└── tenant-id-123/
    ├── surveys/
    ├── apis/
    ├── uploads/
    └── webhook/
```

---

## 🚀 Future Enhancements

- UI for custom field mapping
- Cron job validation
- Retry/backoff strategies per config
- Data quality checks before ingestion
- Slack/email alerts per tenant

---
