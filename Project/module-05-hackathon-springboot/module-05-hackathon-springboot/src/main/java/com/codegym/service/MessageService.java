package com.codegym.service;


import com.codegym.entity.Message;
import com.codegym.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;

    public void save(Message message){
        messageRepository.save(message);
    }

    public List<Message> getAllMessageByRoomName(String roomName){
        return messageRepository.findAllByRoomName(roomName);
    }
}
