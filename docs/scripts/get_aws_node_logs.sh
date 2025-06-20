#!/bin/bash

# Get logs from all aws-node pods in the kube-system namespace
for pod in $(kubectl -n kube-system get pods -l k8s-app=aws-node -o jsonpath='{.items[*].metadata.name}'); do
  echo "----- Logs from pod: $pod -----"
  kubectl logs -n kube-system "$pod" --tail=100
  echo "----------------------------"
done
