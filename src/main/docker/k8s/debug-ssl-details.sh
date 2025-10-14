#!/bin/bash

echo "🔐 Detailed SSL Certificate Analysis"

echo "1. Certificate details:"
kubectl get secret triggeriq-tls -n ingress-nginx -o jsonpath='{.data.tls\.crt}' | base64 -d | openssl x509 -text -noout | grep -E "(Subject:|Not Before|Not After|DNS:)"

echo ""
echo "2. Certificate expiry:"
kubectl get secret triggeriq-tls -n ingress-nginx -o jsonpath='{.data.tls\.crt}' | base64 -d | openssl x509 -noout -dates

echo ""
echo "3. Certificate chain:"
kubectl get secret triggeriq-tls -n ingress-nginx -o jsonpath='{.data.tls\.crt}' | base64 -d | openssl x509 -noout -issuer

echo ""
echo "4. Testing from different tools:"
echo "   - curl:" && curl -s -o /dev/null -w "%{http_code}" https://triggeriq.eu/ || echo " failed"
echo "   - wget:" && wget --spider -q --timeout=5 https://triggeriq.eu/ && echo "success" || echo "failed"

echo ""
echo "5. Browser-compatible test:"
curl -vk --max-time 10 https://triggeriq.eu/ 2>&1 | grep -E "failed|error|SSL|certificate"
