package com.codegym.repository;

import com.codegym.entity.Message;
import com.codegym.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface MessageRepository extends JpaRepository<Message,Long> {

    @Query("SELECT u FROM Message u WHERE u.room_name = ?1")
    List<Message> findAllByRoomName(String roomName);


}
