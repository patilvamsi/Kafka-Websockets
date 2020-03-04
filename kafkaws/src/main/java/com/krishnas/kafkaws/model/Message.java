package com.krishnas.kafkaws.model;

public class Message {
	private String firstName;
	private String lastName;
	private String topic;
	private String message;

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {

		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "{\"firstName\":\"" + getFirstName() + "\", \"lastName\":\"" + getLastName() + "\", \"topic\":\""
				+ getTopic() + "\", \"message\":\"" + getMessage() + "\"}";
	}
}
