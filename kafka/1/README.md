# Experity kafka

This repository is based off of the examples in [confluentinc/cp-docker-images/examples](https://github.com/confluentinc/cp-docker-images/tree/5.2.1-post/examples)

## local_kafka

This holds the docker compose files for running kafka in docker locally

### kafka-zoo-control

A local kafka instance running a single zookeeper, single kafka, and single control center server

#### usage

from inside of `local_kafka/kafka-zoo-control` run

`docker-compose up`

You will get a kafka control center container listening on localhost:9021

__Zookeeper Tests__

To use a zookeeper client run

`docker-compose exec zookeeper-1 bash`

To get into the zookeeper shell run this command inside of the container

`zookeeper-shell localhost:2181`

test creating values with

`create /mytest thisbeatest`

`ls /mytest`

__Kafka Tests__

Run this command to get into the kafka container

`docker-compose exec kafka-1 bash`

Run this command to create a topic

`kafka-topics --create --zookeeper zookeeper-1:2181 --topic myTestTopic --partitions 1 --replication-factor 1`

Double check your topic got created

`kafka-topics --list --zookeeper zookeeper-1:2181`

Create a console producer

`kafka-console-producer --broker-list kafka-1:9092 --topic myTestTopic`

In another window run `docker-compose exec kafka-1 bash` to get another bash window in the kafka container and then run

`kafka-console-consumer  --bootstrap-server kafka-1:9092 --topic myTestTopic`

And then type a few test messages into your producer window. You should see the messages appear in the consumer window
