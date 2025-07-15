# 🚀 Deploying `triggeriq` to AWS EKS with GitHub Container Registry

This guide helps you deploy your `triggeriq` application (packaged using Jib and pushed to GitHub Container Registry) to an AWS EKS cluster using Kubernetes manifests derived from your `podman-compose` configuration.

---

## ✅ 1. Translate `podman-compose` to Kubernetes YAML

Use **Kompose** to convert your `app.yml` (plus any extended YAML files) into Kubernetes manifests.

```bash
kompose convert -f app.yml -o k8s/
```

This generates Kubernetes YAML files in a `k8s/` directory.

---

## ✅ 2. Edit the Generated Manifests

Update your manifests:

- **Set correct image**:

  ```yaml
  image: ghcr.io/YOUR_GITHUB_USERNAME/triggeriq:latest
  ```

- **Inject environment variables**:
  Move sensitive values (e.g. `SPRING_DATASOURCE_URL`, `POSTGRES_PASSWORD`) into Kubernetes `Secrets` and `ConfigMaps`.

- **Volume persistence**:
  Replace Docker volumes like `redis_data`, `pgdata` with Kubernetes `PersistentVolumeClaim` definitions.

---

## ✅ 3. Authenticate with GitHub Container Registry

Create a Kubernetes secret to access your private GitHub image:

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=GITHUB_USERNAME \
  --docker-password=YOUR_PERSONAL_ACCESS_TOKEN \
  --docker-email=you@example.com
```

Patch your `Deployment` YAML:

```yaml
spec:
  template:
    spec:
      imagePullSecrets:
        - name: ghcr-secret
```

---

## ✅ 4. Deploy to AWS EKS

Ensure `kubectl` is connected to your EKS cluster:

```bash
aws eks update-kubeconfig --region <your-region> --name <your-cluster-name>
```

Deploy the app:

```bash
kubectl apply -f k8s/
```

---

## ✅ 5. Verify Everything

Check pod and service status:

```bash
kubectl get pods
kubectl get services
```

Check logs:

```bash
kubectl logs -f deployment/triggeriq
```

Expose your app using:

- `kubectl port-forward`
- or a Kubernetes `Ingress`
- or `type: LoadBalancer` in your `Service`

---

_Generated on 2025-06-18_
