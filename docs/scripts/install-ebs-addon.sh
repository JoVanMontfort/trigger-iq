#!/bin/bash

# Variables
CLUSTER_NAME="triggeriq-cluster"
REGION="eu-west-3"
SERVICE_ACCOUNT_NAMESPACE="kube-system"
SERVICE_ACCOUNT_NAME="ebs-csi-controller-sa"
ROLE_ARN="arn:aws:iam::811904917041:role/eksctl-triggeriq-cluster-role-ebs-csi-controller-sa"

# Recreate EBS CSI addon with Pod Identity
eksctl create addon \
  --name aws-ebs-csi-driver \
  --cluster "$CLUSTER_NAME" \
  --region "$REGION" \
  --service-account-role-arn "$ROLE_ARN" \
  --pod-identity-associations namespace="$SERVICE_ACCOUNT_NAMESPACE",serviceAccount="$SERVICE_ACCOUNT_NAME" \
  --force
