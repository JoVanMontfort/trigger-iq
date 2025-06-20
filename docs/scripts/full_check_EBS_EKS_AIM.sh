#!/bin/bash

# Define your namespace and service account
namespace="kube-system"
service_account="ebs-csi-controller-sa"
role_arn="arn:aws:iam::811904917041:role/eksctl-triggeriq-cluster-role-ebs-csi-controller-sa" # Replace with your actual role ARN

# Check the EBS CSI controller service account annotations
echo "Checking Service Account annotations..."
kubectl get serviceaccount -n $namespace $service_account -o yaml

# Check the trust relationship of the IAM role
echo "Checking trust relationship of IAM Role: $role_arn..."
aws iam get-role --role-name $(basename $role_arn) --query 'Role.AssumeRolePolicyDocument' --output json

# Check the IAM policy attached to the role
echo "Checking policies attached to IAM Role: $role_arn..."
aws iam list-attached-role-policies --role-name $(basename $role_arn) --output table

# Ensure the AmazonEBSCSIDriverPolicy is attached
policy_check=$(aws iam list-attached-role-policies --role-name $(basename $role_arn) --query "AttachedPolicies[?PolicyName=='AmazonEBSCSIDriverPolicy'].PolicyName" --output text)
if [[ "$policy_check" == "AmazonEBSCSIDriverPolicy" ]]; then
  echo "AmazonEBSCSIDriverPolicy is attached to the role."
else
  echo "AmazonEBSCSIDriverPolicy is NOT attached to the role."
fi

# Check the EBS CSI controller pod annotations
echo "Checking the annotations of the EBS CSI controller pod..."
kubectl get pod -n $namespace -l app=ebs-csi-controller -o jsonpath='{.items[*].metadata.annotations}'

# Check if the StorageClass is using ebs.csi.aws.com
echo "Checking the StorageClass for the EBS provisioner..."
kubectl get storageclass -o yaml | grep 'provisioner: ebs.csi.aws.com'

# Check PVCs and pods status in all namespaces (including your custom namespace)
echo "Checking PVCs and pods status in all namespaces..."
kubectl get pvc --all-namespaces
kubectl get pods --all-namespaces -l app=ebs-csi-controller

# Check EBS volumes
echo "Checking EBS volumes in your AWS account..."
aws ec2 describe-volumes --query 'Volumes[*].{ID:VolumeId,State:State,Attachment:Attachments[0].InstanceId}' --output table

# Additional check for the IAM OIDC provider
echo "Checking if IAM OIDC provider exists for the EKS cluster..."
aws iam list-open-id-connect-providers --query 'OpenIDConnectProviderList' --output table
