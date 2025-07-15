#!/bin/bash

set -e

echo "Fetching IAM Role ARN..."
ROLE_ARN=$(aws iam get-role \
  --role-name eksctl-triggeriq-cluster-role-ebs-csi-controller-sa \
  --query 'Role.Arn' --output text)

echo "Creating EBS CSI Driver add-on..."
aws eks create-addon \
  --cluster-name triggeriq-cluster \
  --addon-name aws-ebs-csi-driver \
  --service-account-role-arn "$ROLE_ARN" \
  --region eu-west-3

echo "Waiting for EBS CSI add-on to become active..."
aws eks wait addon-active \
  --cluster-name triggeriq-cluster \
  --addon-name aws-ebs-csi-driver \
  --region eu-west-3

echo "✅ EBS CSI add-on installed successfully."
