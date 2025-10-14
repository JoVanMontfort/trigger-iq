#!/bin/bash

DOMAIN="triggeriq.eu"
NAMESPACE="ingress-nginx"

echo "🔍 Debugging website: $DOMAIN"

echo "1. Checking DNS resolution:"
nslookup $DOMAIN || dig $DOMAIN

echo ""
echo "2. Checking ingress resources:"
kubectl get ingress -n $NAMESPACE

echo ""
echo "3. Checking ingress details:"
kubectl describe ingress -n $NAMESPACE

echo ""
echo "4. Checking ingress controller logs:"
kubectl logs -n $NAMESPACE -l app.kubernetes.io/component=controller --tail=10

echo ""
echo "5. Checking triggeriq service:"
kubectl get svc triggeriq -n $NAMESPACE -o wide

echo ""
echo "6. Checking triggeriq pods:"
kubectl get pods -n $NAMESPACE -l app=triggeriq

echo ""
echo "7. Testing service internally:"
kubectl run -it --rm --restart=Never debug-$RANDOM --image=curlimages/curl -n $NAMESPACE -- curl -v http://triggeriq:8081/ || echo "Internal test failed"

echo "🔍 Debugging HTTPS for: $DOMAIN"

echo "1. Testing HTTPS connection:"
curl -vk https://$DOMAIN/ 2>&1 | grep -E "(SSL|certificate|HTTP)"

echo ""
echo "2. Checking SSL certificate:"
openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | grep -E "(Verify|certificate)"

echo ""
echo "3. Checking ingress TLS configuration:"
kubectl get ingress -n $NAMESPACE -o yaml | grep -A 10 -B 5 tls

echo ""
echo "4. Checking TLS secrets:"
kubectl get secrets -n $NAMESPACE | grep tls

echo ""
echo "5. Checking ingress controller logs for SSL errors:"
kubectl logs -n $NAMESPACE -l app.kubernetes.io/component=controller --tail=20 | grep -i tls

echo ""
echo "6. Browser simulation (checking redirects):"
curl -L -v http://$DOMAIN/ 2>&1 | grep -E "(Location|HTTP)"
