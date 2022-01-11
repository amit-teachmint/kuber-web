#!/bin/sh

echo -e "\n**** Service start ****"
set -m

## Set SERVER env to host (container) IP address
export SERVER=`hostname -i`


        ## Add kafka host START
echo -e "Adding kafka hosts to /etc/hosts"
cat hosts >> /etc/hosts
if [[ $? -eq 0 ]]
then
 echo -e "Kafka hosts addedd"
fi
        ## Add kafka host END


        ## Service start START
echo -e "Starting Application"
pm2 start yarn --name kuber_web --interpreter /bin/sh -- start & 
if [[ $? -eq 0 ]]
then
 echo -e "\nApplication started"
 sleep 20
 echo -e "Registering with nginx"
 REGISTER_STATUS=`curl -s -i  http://$NGINX_IP:$NGINX_PORT/add_server/$SERVER:8000/$APPLICATION | head -1 | awk '{print $2}'`

        ## Registration check START
 if [[ REGISTER_STATUS -eq "200" ]]
 then
  echo "Registered with nginx."
 else
  echo "Registeration failed  ! EXIT"
  exit 1
 fi
        ## Registration check END

else
 echo -e "Service failed to start"
 exit 1
fi
        ## Service start END

## Bringing backgroud process (gunicorn) in forground
fg %1
