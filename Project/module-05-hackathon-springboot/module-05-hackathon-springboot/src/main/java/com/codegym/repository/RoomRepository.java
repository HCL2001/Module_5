package com.codegym.repository;

import com.codegym.entity.Room;
import com.codegym.entity.RoomDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {
}
