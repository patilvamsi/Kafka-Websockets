package com.krishnas.kafkaws.model;

public class Message {

    private String firstName;
    private String lastName;

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

	@Override
	public String toString() {
		return "{\"firstName\":\"" + getFirstName() + "\", \"lastName\":\"" + getLastName() + "\"}";
	}
	
	

}
