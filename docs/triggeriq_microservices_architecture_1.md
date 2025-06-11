# 🧩 TriggerIQ Microservice Architecture

This document describes the separation of frontend and backend as microservices in the TriggerIQ platform.

---

## ✅ Microservice Overview

| Service            | Tech Stack        | Role                                        |
|--------------------|-------------------|---------------------------------------------|
| triggeriq-frontend | Angular + NGINX   | Serves UI, calls backend APIs               |
| triggeriq-backend  | Spring Boot (Java)| Business logic, API layer, data handling    |

---

## 🧱 Why Microservices?

- **Decoupling**: Each service can be developed, tested, and deployed independently.
- **Scalability**: Scale UI and API workloads separately.
- **Resilience**: A crash in one does not bring down the entire app.
- **CI/CD Friendly**: Independent versioning and deployment.

---

## ⚙️ Kubernetes Setup

### Frontend
- Angular built with `ng build`
- Served via NGINX Docker image
- Deployed using a `Deployment` + `Service`

### Backend
- Spring Boot as REST API server
- Exposes endpoints under `/api/*`
- Connected to PostgreSQL, MinIO, NiFi
- Also deployed as `Deployment` + `Service`

---

## 🌐 Ingress Routing

| URL Path | Routes To             |
|----------|------------------------|
| `/`      | Frontend NGINX pod     |
| `/api/*` | Backend Spring Boot pod|

---

## 🔄 Frontend-Backend Communication

- Frontend uses `HttpClient` to call `/api/...`
- Spring Boot must allow CORS in development
- Production handled via same-origin Ingress routing

---

## 🚀 Future Microservices

- `triggeriq-analytics`
- `triggeriq-auth`
- `triggeriq-admin-ui`

---
