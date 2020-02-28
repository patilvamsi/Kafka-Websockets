package com.example.notification.websocket;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import javax.servlet.http.HttpSession;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.util.MultiValueMap;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

public class Interceptor extends DefaultHandshakeHandler implements HandshakeInterceptor, ChannelInterceptor  {

	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map attributes) throws Exception {
		if (request instanceof ServletServerHttpRequest) {
			ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
			HttpSession session = servletRequest.getServletRequest().getSession();
			attributes.put("sessionId", session.getId());
			System.out.println(session.getId());
		}
		return true;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception exception) {

		if (request instanceof ServletServerHttpRequest) {
			ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
			HttpSession session = servletRequest.getServletRequest().getSession();
			System.out.println(session.getId());
		}
	}

	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		System.out.println("Channel Interceptor");

		MessageHeaders headers = message.getHeaders();
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

		MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS,
				MultiValueMap.class);
		if(null != multiValueMap)
		for (Entry<String, List<String>> head : multiValueMap.entrySet()) {
			System.out.println(head.getKey() + "#" + head.getValue());
		}

		return message;
	}
	
	@Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String,Object> attributes){

        // Some Code that would give me the username set in Stomp Header
        // For now i am randomly generating a username and setting in principal.
        String username = "user"+"-"+ new Random().nextInt(100);
        return username;

    }

}
