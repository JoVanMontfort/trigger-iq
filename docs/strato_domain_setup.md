# Connecting Strato Domain (triggeriq.eu) to AWS EKS NGINX Ingress

## 🛠️ Step-by-Step Setup

### 🔹1. Get Your AWS Load Balancer Address

```bash
kubectl get svc -n ingress-nginx
```

Copy the external IP or DNS (e.g., `a1b2c3d4e5f6.elb.amazonaws.com`).\
Look for a service like:

```bash
nginx-ingress-ingress-nginx-controller   LoadBalancer   x.x.x.x   a1b2c3d4e5f6.elb.amazonaws.com
```

✍️ Copy the \*.elb.amazonaws.com address — this is your public AWS entry point.

---

### 🔹2. Update DNS at Strato

Login to Strato DNS settings for `triggeriq.eu`.

#### A. If your LoadBalancer provides an IP address:

Create an A record:

```
Name: @
Type: A
Value: <Your LoadBalancer IP>
TTL: 300
```

#### B. If your LoadBalancer provides a DNS name:

Create a CNAME record:

```
Name: @
Type: CNAME
Value: a1b2c3d4e5f6.elb.amazonaws.com.
TTL: 300
```

⚠️ DNS changes may take up to 30 minutes to propagate, depending on your TTL and registrar.

---

### 🔹3. Update Kubernetes Ingress

Edit your Ingress manifest:

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

Apply it:

```bash
kubectl apply -f triggeriq-ingress.yaml
```

---

### 🔹4. Wait for DNS Propagation

Can take 10–30 minutes. Use `dig triggeriq.eu` to check.

---

### 5. [Optional] Enable HTTPS

You can use:

- **Let’s Encrypt via cert-manager** (free, automated)
- **AWS ACM** (use with Route 53 if migrating DNS)

### 🔒 6. (Optional): Add HTTPS via AWS + Let’s Encrypt

You have two main options for SSL:\
**Option A: Use AWS ACM (with a LoadBalancer that supports HTTPS)**

1. Use Route 53 for easier ACM validation (if you transfer DNS).
2. Request a cert in ACM for triggeriq.eu.
3. Attach it to your ALB via annotations on the Ingress.

**Option B: Use Cert-Manager + Let's Encrypt**

This is popular for K8s and free forever.\
Install cert-manager:

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml
```

Then define a ClusterIssuer and a TLS Ingress for triggeriq.eu.

---

### ✅ Final Result

Once the DNS has propagated and the ingress is set:

- You visit http://triggeriq.eu
- It routes to your AWS Load Balancer
- Which forwards to NGINX Ingress
- Which routes to your Spring Boot app pods
