# Kubernetes with MicroK8s: Hands-on Lab & Mini Project

## 🧪 Hands-on Lab: "Hello Kubernetes"

### Objective:
Deploy and manage a stateless app (NGINX) with scaling and port exposure.

### Step-by-Step:

#### 1. Create a Deployment
```bash
kubectl create deployment hello-k8s --image=nginx
```

#### 2. Expose the Deployment
```bash
kubectl expose deployment hello-k8s --port=80 --type=NodePort
```

#### 3. Check Status
```bash
kubectl get pods
kubectl get svc
```

#### 4. Access the App
```bash
curl http://localhost:<NODE_PORT>
```

Replace `<NODE_PORT>` with the actual port from `kubectl get svc`.

#### 5. Scale the App
```bash
kubectl scale deployment hello-k8s --replicas=3
kubectl get pods -o wide
```

#### 6. Clean Up
```bash
kubectl delete svc hello-k8s
kubectl delete deployment hello-k8s
```

---

## 🎯 Mini Project: Guestbook App with Persistent Storage

### Objective:
Deploy a guestbook web app (PHP + Redis) with persistent volumes and services.

### Architecture:
- Frontend: PHP
- Backend: Redis
- Persistent Volume for Redis

### 1. Enable Storage Add-on
```bash
microk8s enable storage
```

### 2. Create Redis PVC
Create `redis-pvc.yaml`:
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: redis-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

Apply:
```bash
kubectl apply -f redis-pvc.yaml
```

### 3. Deploy Redis
Create `redis-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis
        ports:
        - containerPort: 6379
        volumeMounts:
        - mountPath: /data
          name: redis-storage
      volumes:
      - name: redis-storage
        persistentVolumeClaim:
          claimName: redis-pvc
```

Apply:
```bash
kubectl apply -f redis-deployment.yaml
```

### 4. Deploy PHP Frontend
Create `guestbook-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: guestbook
spec:
  replicas: 1
  selector:
    matchLabels:
      app: guestbook
  template:
    metadata:
      labels:
        app: guestbook
    spec:
      containers:
      - name: guestbook
        image: gcr.io/google-samples/gb-frontend:v5
        ports:
        - containerPort: 80
```

Apply:
```bash
kubectl apply -f guestbook-deployment.yaml
```

### 5. Expose Services
```bash
kubectl expose deployment redis --port=6379
kubectl expose deployment guestbook --type=NodePort --port=80
```

### 6. Access the App
```bash
kubectl get svc guestbook
```

Open:
```
http://localhost:<NODE_PORT>
```

---

## ✅ Done!
You now have experience with:
- Deployments
- Services
- Persistent Volumes
- Multi-container architecture
