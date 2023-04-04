package com.codegym.service;

import com.codegym.entity.Room;
import com.codegym.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public void save (Room room){
        roomRepository.save(room);
    }

    public List<Room> getListRoom(){
        return roomRepository.findAll();
    }
}
