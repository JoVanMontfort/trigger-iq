#!/bin/bash

# --- CONFIGURATION ---
REGION="eu-west-3"
POLICY_NAME="AllowAssumeRoleForPodIdentity"

echo "🔍 Finding first node in the cluster..."
INSTANCE_ID=$(kubectl get nodes -o jsonpath="{.items[0].spec.providerID}" | awk -F'/' '{print $NF}')
echo "✅ Node instance ID: $INSTANCE_ID"

echo "🔍 Getting instance profile name..."
INSTANCE_PROFILE_ARN=$(aws ec2 describe-instances \
  --instance-ids "$INSTANCE_ID" \
  --region "$REGION" \
  --query "Reservations[0].Instances[0].IamInstanceProfile.Arn" \
  --output text)

INSTANCE_PROFILE_NAME=$(basename "$INSTANCE_PROFILE_ARN")
echo "✅ Instance profile name: $INSTANCE_PROFILE_NAME"

ROLE_NAME=$(aws iam get-instance-profile \
  --instance-profile-name "$INSTANCE_PROFILE_NAME" \
  --query "InstanceProfile.Roles[0].RoleName" \
  --output text)
echo "✅ Node IAM role: $ROLE_NAME"

echo "🔍 Checking if permission 'eks-auth:AssumeRoleForPodIdentity' exists..."

HAS_PERMISSION=$(aws iam get-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-name "$POLICY_NAME" \
  --query "PolicyDocument.Statement[?Action=='eks-auth:AssumeRoleForPodIdentity']" \
  --output text 2>/dev/null)

if [ -n "$HAS_PERMISSION" ]; then
  echo "✅ The IAM role already has 'eks-auth:AssumeRoleForPodIdentity'. No action needed."
else
  echo "❗ Missing permission. Attaching inline policy..."

  cat <<EOF > /tmp/$POLICY_NAME.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "eks-auth:AssumeRoleForPodIdentity",
      "Resource": "*"
    }
  ]
}
EOF

  aws iam put-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-name "$POLICY_NAME" \
    --policy-document file:///tmp/$POLICY_NAME.json

  echo "✅ Policy '$POLICY_NAME' attached to role '$ROLE_NAME'."
fi
