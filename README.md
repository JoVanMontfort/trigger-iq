# 🚀 TriggerIQ

**TriggerIQ** is a scalable, multi-tenant data automation platform designed to streamline the ingestion, transformation, and routing of structured and unstructured data (e.g., surveys, APIs, uploads). It provides tenant-configurable pipelines, full backend automation, and a clean Angular-based UI.

---

## 🗂 Repository Structure

This monorepo contains **both the frontend and backend codebases**, organized by **separate Git branches** for modular development and deployment.

| Branch        | Description                        |
|---------------|------------------------------------|
| `main`        | Stable releases and version tags   |
| `frontend`    | Angular 17 app (TriggerIQ UI)      |
| `backend`     | Spring Boot 3.x REST API backend   |
| `dev-*`       | Feature branches (WIP, hotfixes)   |

---

## ✨ Features

- 🔐 **Multi-tenant configuration system**
- ⚙️ **Dynamic API/survey/webhook ingestion**
- 📤 **MinIO (S3-compatible) storage backend**
- 📈 **NiFi integration for pipeline logic**
- 🌐 **Kubernetes-ready deployment**
- 🧩 **Microservice separation via branches**

---

## 🧑‍💻 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | Angular 17, TypeScript, Tailwind |
| Backend     | Spring Boot 3, PostgreSQL, JWT    |
| Storage     | MinIO (S3), Optional HDFS         |
| Data Flow   | Apache NiFi                      |
| DevOps      | Docker, Kubernetes, Helm          |

---

## 🧪 Getting Started

### Clone and checkout a specific branch:

```bash
# Clone the repo
git clone https://github.com/your-org/triggeriq.git
cd triggeriq

# Checkout frontend or backend branch
git checkout frontend     # for Angular UI
git checkout backend      # for Spring Boot API
```

### For full-stack deployment with Docker Compose or K8s, use the `main` branch.

---

## 📁 Directory Structure (Per Branch)

### 🔹 Frontend Branch (`frontend`)
```
src/
 ├── app/
 ├── assets/
 └── environments/
```

### 🔹 Backend Branch (`backend`)
```
src/
 └── main/
     ├── java/com/triggeriq/
     └── resources/
         ├── application.yml
         └── db/migration/
```

---

## 🏗 Deployment Options

- Local development (with Vite and Spring DevTools)
- Docker Compose (frontend, backend, DB, MinIO)
- Kubernetes (Helm charts available)

---

## 📜 License

MIT © [Your Organization]

---

## 🤝 Contributing

Want to contribute or deploy this for your org?  
Fork the repo, create a branch, and open a pull request.
