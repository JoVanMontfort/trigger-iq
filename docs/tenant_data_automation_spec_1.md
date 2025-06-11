## ✅ Why Separate Frontend and Backend?

| Aspect          | Frontend (Angular)                           | Backend (Spring Boot)                                    |
| --------------- | -------------------------------------------- | -------------------------------------------------------- |
| Role            | UI, user interactions, API calls             | Business logic, API endpoints, DB, external integrations |
| Build Artifact  | Static files (`index.html`, `main.js`, etc.) | JAR/WAR or Docker image                                  |
| Deployment      | Served via NGINX/Node Docker container       | Run as a Java container (e.g., OpenJDK)                  |
| Scaling         | Scales on UI traffic                         | Scales on API/data processing load                       |
| Versioning      | Can be versioned/deployed independently      | Backend can evolve APIs without frontend changes         |
| DevOps Friendly | Static, cacheable assets, CDN-compatible     | REST/GraphQL service exposed to frontend + NiFi etc.     |

---

## 🛠 Typical Setup in Kubernetes

You run two Deployments in K8s:
### 🧩 triggeriq-frontend

    Angular app served via NGINX or Node.js

    Static files only

    Talks to /api endpoints on the backend

### 🧩 triggeriq-backend

    Spring Boot REST APIs

    Connected to database, MinIO, NiFi, etc.

    Handles tenant config, auth, jobs, etc.