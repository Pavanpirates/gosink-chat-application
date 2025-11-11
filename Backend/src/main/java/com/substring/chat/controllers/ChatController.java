package com.substring.chat.controllers;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.substring.chat.entities.Message;
import com.substring.chat.entities.Room;
import com.substring.chat.payload.MessageRequest;
import com.substring.chat.repositories.RoomRepository;

@Controller
@CrossOrigin("https://gosink-chat-application.vercel.app/")
public class ChatController {

    private final RoomRepository roomRepository;

    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @MessageMapping("/sendMessage/{roomId}") // /app/sendMessage/{roomId}
    @SendTo("/topic/room/{roomId}")          // frontend subscribes to /topic/room/{roomId}
    public Message sendMessage(
            @DestinationVariable String roomId,
            MessageRequest request
    ) {
        System.out.println("📩 Received from roomId: " + roomId);
        System.out.println("👤 Sender: " + request.getSender());
        System.out.println("💬 Content: " + request.getContent());

        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) {
            throw new RuntimeException("Room not found!");
        }

        // Create and attach message
        Message message = new Message();
        message.setSender(request.getSender());
        message.setContent(request.getContent());
        message.setTimeStamp(LocalDateTime.now());
        message.setRoomId(roomId);

        room.getMessages().add(message);
        roomRepository.save(room);

        System.out.println("✅ Message saved and sent to all subscribers.");
        return message; // This is automatically sent to /topic/room/{roomId}
    }
}
