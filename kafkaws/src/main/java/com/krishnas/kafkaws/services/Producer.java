package com.krishnas.kafkaws.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.krishnas.kafkaws.model.Message;

@Service
public class Producer {
	private static final Logger logger = LoggerFactory.getLogger(Producer.class);
	private static final String TOPIC = "users";
	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;

	public void sendMessage(Message message) {
		logger.info(String.format("$$ -> Producing message --> %s", message.toString()));
		this.kafkaTemplate.send(TOPIC, message.toString());
	}

	public void sendMessage(String msg) {

		logger.info(String.format("$$ -> Producing message --> %s", msg));
		this.kafkaTemplate.send(TOPIC, msg);
		
	}
}