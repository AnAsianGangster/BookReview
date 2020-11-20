#!/bin/sh
sudo apt-get remove docker docker-engine docker.io containerd runc &

wait $!

sudo apt-get -y install docker-ce docker-ce-cli containerd.io &

wait

sudo apt -y install docker.io &

wait

sudo apt -y install docker-compose & 

wait

sudo docker-compose up &

wait

echo "# DONE!" >> finishFlag.md
