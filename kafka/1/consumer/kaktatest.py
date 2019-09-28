from kafka import KafkaConsumer
consumer = KafkaConsumer('myTestTopic', bootstrap_servers='localhost:9092')
for item in consumer:
    print("The Message is :", item)
# https://kafka-1:9092
