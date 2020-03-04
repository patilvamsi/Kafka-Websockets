package com.example.notification.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class Listener {

	@Autowired
	private SimpMessagingTemplate template;

	@StreamListener(target = "users")
	public void processMessage(Message pushMessage) throws Exception {
		if(null != pushMessage && null != pushMessage.getTopic())
			this.template.convertAndSend("/topic/"+pushMessage.getTopic(), pushMessage.getMessage());
		else {
			this.template.convertAndSend("/topic/pushNotification", "got Exception");
			throw new Exception("Message recieved from Kafka: "+pushMessage.toString());
		}
	}
}
