# Deploying TriggerIQ with EKS, NGINX Ingress, and Spring Boot on AWS

## 🚀 Step-by-Step AWS Setup

### 1. Create an EKS Cluster

You can use eksctl (CLI) or the AWS Console.

Install `eksctl`:

```bash
brew tap weaveworks/tap
brew install weaveworks/tap/eksctl
```

Create the cluster:

```bash
eksctl create cluster \
  --name triggeriq-cluster \
  --region us-east-1 \
  --nodes 3 \
  --node-type t3.medium \
  --with-oidc \
  --ssh-access \
  --ssh-public-key my-keypair \
  --managed
```

💡 Credits Tip: Use Spot Instances or Fargate to stretch your budget.

---

### 2. Install NGINX Ingress on EKS

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install nginx-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
```

---

### 3. Dockerize and Push Your Spring Boot App

Dockerfile:

```Dockerfile
FROM eclipse-temurin:17
COPY target/triggeriq.jar /app/triggeriq.jar
ENTRYPOINT ["java", "-jar", "/app/triggeriq.jar"]
```

Build and push:

```bash
docker build -t <your-dockerhub-username>/triggeriq .
docker push <your-dockerhub-username>/triggeriq
```

💡 Optional: Use Amazon ECR instead of Docker Hub to host your image (free within AWS credit).

---

### 4. Deploy to Kubernetes

#### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: triggeriq
spec:
  replicas: 3
  selector:
    matchLabels:
      app: triggeriq
  template:
    metadata:
      labels:
        app: triggeriq
    spec:
      containers:
        - name: triggeriq
          image: <your-dockerhub-username>/triggeriq
          ports:
            - containerPort: 8080
```

#### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: triggeriq-service
spec:
  type: ClusterIP
  selector:
    app: triggeriq
  ports:
    - port: 8080
      targetPort: 8080
```

#### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: triggeriq-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: triggeriq.eu
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: triggeriq-service
                port:
                  number: 8080
```

Apply manifests:

```bash
kubectl apply -f triggeriq-deployment.yaml
kubectl apply -f triggeriq-service.yaml
kubectl apply -f triggeriq-ingress.yaml
```

---

### 5. Get Load Balancer Info

```bash
kubectl get svc -n ingress-nginx
```

Copy the EXTERNAL-IP or ELB DNS name.

---

### 6. [Optional] Setup HTTPS using cert-manager or AWS ACM

---

### 7. Optional Enhancements

- RDS for PostgreSQL/MySQL – use part of your credits for persistent backend DB.
- CloudWatch Logs – monitor logs centrally.
- ACM + Route 53 – free SSL for your custom domain.
- Horizontal Pod Autoscaling – scale your app with demand.

---

### 🔍 Bonus: Cost Control Tips

- Use budgets and alerts in AWS Billing Console.
- Turn off unused EC2 nodes or EKS clusters when not in use.
- Enable Savings Plans if running long-term.
