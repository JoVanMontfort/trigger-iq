```bash
sed -i 's|\.\./webfonts/|/content/webfonts/|g' src/main/webapp/content/fontawesome/all.css

kubectl create secret generic pg-secret --from-literal=password=triggerIq

kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=YOUR_GITHUB_USERNAME --docker-password=YOUR_PERSONAL_ACCESS_TOKEN --docker-email=your@email.com

kubectl get namespace ingress-nginx -o json | jq 'del(.spec.finalizers)' | kubectl replace --raw "/api/v1/namespaces/ingress-nginx/finalize" -f -

eksctl create addon --name aws-ebs-csi-driver --cluster <your-cluster-name> --region <your-region> --service-account-role-arn arn:aws:iam::<account-id>:role/AmazonEKS_EBS_CSI_DriverRole

eksctl create iamserviceaccount --name ebs-csi-controller-sa --namespace kube-system --cluster my-cluster --role-name AmazonEKS_EBS_CSI_DriverRole --role-only --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --approve

eksctl utils associate-iam-oidc-provider --region eu-west-3 --cluster triggeriq-cluster --approve

eksctl create iamserviceaccount --name ebs-csi-controller-sa --namespace kube-system --cluster triggeriq-cluster --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --approve

eksctl create iamserviceaccount --name ebs-csi-controller-sa --namespace kube-system --cluster triggeriq-cluster --region eu-west-3 --role-name eksctl-triggeriq-cluster-role-ebs-csi-controller-sa --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --approve

aws eks describe-addon --cluster-name triggeriq-cluster --addon-name aws-ebs-csi-driver --region eu-west-3

aws iam list-attached-role-policies --role-name eksctl-triggeriq-cluster-role-ebs-csi-controller-sa

aws eks describe-cluster --name triggeriq-cluster --region eu-west-3 --query "cluster.identity.oidc.issuer" --output text

aws eks create-addon --cluster-name triggeriq-cluster --addon-name eks-pod-identity-agent
aws eks wait addon-active --cluster-name triggeriq-cluster --addon-name eks-pod-identity-agent

aws ec2 describe-instances --instance-ids i-0123456789abcdef0 --query "Reservations[0].Instances[0].IamInstanceProfile.Arn" --output text

aws iam get-instance-profile --instance-profile-name <INSTANCE_PROFILE_NAME_FROM_ABOVE> --query "InstanceProfile.Roles[0].RoleName" --output text

eksctl create iamidentitymapping --cluster your-cluster-name --region eu-west-3 --arn arn:aws:iam::811904917041:role/AmazonEKS_EBS_CSI_DriverPodIdentityRole --username system:node:{{EC2PrivateDNSName}} --group system:bootstrappers,system:nodes

eksctl create addon --name aws-ebs-csi-driver --cluster your-cluster-name --region eu-west-3 --service-account-role-arn arn:aws:iam::811904917041:role/AmazonEKS_EBS_CSI_DriverPodIdentityRole --pod-identity-associations namespace=kube-system,serviceAccount=ebs-csi-controller-sa --force

aws eks create-pod-identity-association --cluster-name triggeriq-cluster --namespace kube-system --service-account ebs-csi-controller-sa --role-arn arn:aws:iam::<your-account>:role/<ebs-iam-role>

aws iam update-assume-role-policy --role-name eksctl-triggeriq-cluster-role-ebs-csi-controller-sa --policy-document file://trust-policy.json

eksctl create addon --name aws-ebs-csi-driver --cluster triggeriq-cluster --region eu-west-3 --force

aws eks create-pod-identity-association --cluster-name triggeriq-cluster --namespace kube-system --service-account ebs-csi-controller-sa --role-arn arn:aws:iam::<account-id>:role/<EBS-CSI-Role>

aws eks update-cluster-config --name triggeriq-cluster --kubernetes-network-config podIdentityOptions={enabled=true}

aws ec2 describe-instances --filters "Name=private-ip-address,Values=<INTERNAL-IP>" --query "Reservations[].Instances[].SubnetId" --region eu-west-3

aws ec2 describe-route-tables --filters "Name=association.subnet-id,Values=<SUBNET-ID>" --region eu-west-3

aws eks describe-addon-versions --addon-name aws-ebs-csi-driver --kubernetes-version 1.28 --region eu-west-3

aws eks create-addon --cluster-name triggeriq-cluster --addon-name aws-ebs-csi-driver --addon-version v1.44.0-eksbuild.1 --service-account-role-arn arn:aws:iam::811904917041:role/AmazonEKS_EBS_CSI_DriverRole --resolve-conflicts OVERWRITE --region eu-west-3

kubectl get sa ebs-csi-controller-sa -n kube-system -o yaml
kubectl get pods -n kube-system | grep ebs
aws eks describe-addon --cluster-name my-cluster --addon-name aws-ebs-csi-driver --region eu-west-3

kubectl debug -it ebs-csi-controller-6fc859c6d7-2lgsd -n kube-system --image=busybox --target=ebs-plugin --share-processes
```
