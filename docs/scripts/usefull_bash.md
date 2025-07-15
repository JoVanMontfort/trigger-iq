```bash
637 sed -i 's|\.\./webfonts/|/content/webfonts/|g' src/main/webapp/content/fontawesome/all.css
637 kubectl create secret generic pg-secret --from-literal=password=********
637 kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=*** --docker-password=*** --docker-email=***
637 kubectl get sa ebs-csi-controller-sa -n kube-system -o yaml
637 kubectl get pods -n kube-system | grep ebs
637 kubectl get namespace ingress-nginx -o json | jq 'del(.spec.finalizers)' | kubectl replace --raw "/api/v1/namespaces/ingress-nginx/finalize" -f -
637 kubectl debug -it ebs-csi-controller-6fc859c6d7-2lgsd -n kube-system --image=busybox --target=ebs-plugin --share-processes
637 eksctl create addon --name aws-ebs-csi-driver --cluster <CLUSTER_NAME> --region <REGION> --service-account-role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>
637 eksctl create iamserviceaccount --name ebs-csi-controller-sa --namespace kube-system --cluster my-cluster --role-name <ROLE_NAME> --role-only --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --approve
637 eksctl utils associate-iam-oidc-provider --region <REGION> --cluster triggeriq-cluster --approve
637 eksctl create iamserviceaccount --name ebs-csi-controller-sa --namespace kube-system --cluster triggeriq-cluster --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --approve
637 eksctl create iamserviceaccount --name ebs-csi-controller-sa --namespace kube-system --cluster triggeriq-cluster --region <REGION> --role-name <ROLE_NAME> --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --approve
637 eksctl create iamidentitymapping --cluster <CLUSTER_NAME> --region <REGION> --arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME> --username system:node:{{EC2PrivateDNSName}} --group system:bootstrappers,system:nodes
637 eksctl create addon --name aws-ebs-csi-driver --cluster <CLUSTER_NAME> --region <REGION> --service-account-role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME> --pod-identity-associations namespace=kube-system,serviceAccount=ebs-csi-controller-sa --force
637 eksctl create addon --name aws-ebs-csi-driver --cluster triggeriq-cluster --region <REGION> --force
637 aws eks describe-addon --cluster-name triggeriq-cluster --addon-name aws-ebs-csi-driver --region <REGION>
637 aws iam list-attached-role-policies --role-name <ROLE_NAME>
637 aws eks describe-cluster --name triggeriq-cluster --region <REGION> --query "cluster.identity.oidc.issuer" --output text
637 aws eks create-addon --cluster-name triggeriq-cluster --addon-name eks-pod-identity-agent
637 aws eks wait addon-active --cluster-name triggeriq-cluster --addon-name eks-pod-identity-agent
637 aws ec2 describe-instances --instance-ids <INSTANCE_ID> --query "Reservations[0].Instances[0].IamInstanceProfile.Arn" --output text
637 aws iam get-instance-profile --instance-profile-name <INSTANCE_PROFILE_NAME> --query "InstanceProfile.Roles[0].RoleName" --output text
637 aws eks create-pod-identity-association --cluster-name triggeriq-cluster --namespace kube-system --service-account ebs-csi-controller-sa --role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>
637 aws iam update-assume-role-policy --role-name <ROLE_NAME> --policy-document file://trust-policy.json
637 aws eks create-pod-identity-association --cluster-name triggeriq-cluster --namespace kube-system --service-account ebs-csi-controller-sa --role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>
637 aws eks update-cluster-config --name triggeriq-cluster --kubernetes-network-config podIdentityOptions={enabled=true}
637 aws ec2 describe-instances --filters "Name=private-ip-address,Values=<INTERNAL_IP>" --query "Reservations[].Instances[].SubnetId" --region <REGION>
637 aws ec2 describe-route-tables --filters "Name=association.subnet-id,Values=<SUBNET_ID>" --region <REGION>
637 aws eks describe-addon-versions --addon-name aws-ebs-csi-driver --kubernetes-version 1.28 --region <REGION>
637 aws eks create-addon --cluster-name triggeriq-cluster --addon-name aws-ebs-csi-driver --addon-version v1.44.0-eksbuild.1 --service-account-role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME> --resolve-conflicts OVERWRITE --region <REGION>
637 aws eks describe-addon --cluster-name my-cluster --addon-name aws-ebs-csi-driver --region <REGION>
```

```bash
637 kubectl get svc -n ingress-nginx
638 kubectl get nodes -o wide
639 kubectl get pods -n ingress-nginx
642 kubectl get svc -n ingress-nginx
643 kubectl get pods -n ingress-nginx
644 kubectl get pods -l app=nginx
652 kubectl get ingress
677 kubectl get pods
62  kubectl get ingressclass
669 kubectl get pods -l app=my-app
658 kubectl get svc my-app-service
648 kubectl get svc nginx-service
1017 kubectl get pods --all-namespaces
655 kubectl edit svc my-app-service
649 kubectl create deployment my-app --image=nginx
672 kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=*** --docker-password=*** --docker-email=***
650 kubectl expose deployment my-app --port=80 --name=my-app-service
640 kubectl apply -f nginx-ingress.yaml
735 kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml
659 kubectl describe ingress my-app-ingress
671 kubectl describe pod my-web-app-575d4f7f7c-46qvb
678 kubectl delete pod my-app-766c8d6974-hqzqg
716 kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml
717 kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/aws/deploy.yaml
681 kubectl delete all --all -n ingress-nginx
799 kubectl -n kube-system get serviceaccount ebs-csi-controller-sa -o yaml
813 kubectl -n kube-system get pods -l app.kubernetes.io/name=aws-ebs-csi-driver
814 kubectl -n kube-system logs ebs-csi-controller-6fc859c6d7-dbh92 -c ebs-plugin
855 kubectl -n kube-system get pod ebs-csi-controller-764b88c4b6-cjxkk -o jsonpath="{.spec.containers[*].name}"
856 kubectl -n kube-system logs ebs-csi-controller-764b88c4b6-cjxkk -c csi-provisioner
857 kubectl -n kube-system logs ebs-csi-controller-764b88c4b6-cjxkk -c csi-attacher
865 kubectl -n kube-system get pod -l app=ebs-csi-controller -o jsonpath="{.items[0].spec.serviceAccountName}"
1036 kubectl exec -it s3-reader -n kube-system -- /bin/sh
1038 kubectl patch svc kube-dns -n kube-system --type merge -p '{"spec": {"clusterIP": null}}'
770  kubectl patch storageclass gp2-csi -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
1055 kubectl -n kube-system get endpoints kube-dns
1063 kubectl exec -it coredns-f4967c5fb-jdbcq -n kube-system -- cat /etc/resolv.conf
```

```bash
1419 aws eks update-kubeconfig --name triggeriq-cluster --region <REGION>
794  aws iam get-role --role-name <ROLE_NAME>
1205 aws iam create-user --user-name triggeriq-admin
1206 aws iam create-access-key --user-name triggeriq-admin
795  aws iam attach-role-policy --role-name <ROLE_NAME> --policy-arn arn:aws:iam::aws:policy/AmazonEBSCSIDriverPolicy
796  aws iam list-policies --scope AWS --query "Policies[?PolicyName=='AmazonEBSCSIDriverPolicy']"
800  aws iam list-attached-role-policies --role-name <ROLE_NAME>
851  aws eks describe-cluster --name triggeriq-cluster --region <REGION> --query "cluster.identity.oidc.issuer" --output text
879  aws eks create-pod-identity-association --cluster-name triggeriq-cluster --namespace kube-system --service-account ebs-csi-controller-sa --role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>
910  aws ec2 describe-instances --filters "Name=private-ip-address,Values=<INTERNAL_IP>" --query "Reservations[].Instances[].SubnetId" --region <REGION>
911  aws ec2 describe-route-tables --filters "Name=association.subnet-id,Values=<SUBNET_ID>" --region <REGION>
947  aws eks describe-addon-versions --addon-name aws-ebs-csi-driver --kubernetes-version 1.28 --region <REGION>
949  aws eks create-addon --cluster-name triggeriq-cluster --addon-name aws-ebs-csi-driver --addon-version v1.44.0-eksbuild.1 --service-account-name ebs-csi-controller-sa --service-account-role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME> --resolve-conflicts OVERWRITE --region <REGION>
1211 aws s3api create-bucket --bucket triggeriq-tf-state --region <REGION> --create-bucket-configuration LocationConstraint=<REGION>
1218 aws ec2 create-key-pair --key-name eks-key --query 'KeyMaterial' --output text > eks-key.pem
1631 aws iam update-assume-role-policy --role-name <ROLE_NAME> --policy-document file://trust-policy.json
1207 aws iam attach-user-policy --user-name triggeriq-admin --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
1407 eksctl create addon --name aws-ebs-csi-driver --cluster triggeriq-cluster --region <REGION> --service-account-role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>
1472 eksctl create iamserviceaccount --name ebs-csi-controller-sa --namespace kube-system --cluster triggeriq-cluster --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy --approve
1547 eksctl create iamidentitymapping --cluster triggeriq-cluster --region <REGION> --arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME> --username system:node:{{EC2PrivateDNSName}} --group system:bootstrappers,system:nodes
1548 eksctl create addon --name aws-ebs-csi-driver --cluster triggeriq-cluster --region <REGION> --service-account-role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME> --pod-identity-associations namespace=kube-system,serviceAccount=ebs-csi-controller-sa --force
1556 eksctl create addon --name aws-ebs-csi-driver --cluster triggeriq-cluster --region <REGION> --service-account-role-arn arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME> --pod-identity-associations "serviceAccount=ebs-csi-controller-sa,roleArn=arn:..."
```
