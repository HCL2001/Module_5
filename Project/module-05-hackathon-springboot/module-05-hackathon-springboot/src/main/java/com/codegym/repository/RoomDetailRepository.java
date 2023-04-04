package com.codegym.repository;

import com.codegym.entity.RoomDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomDetailRepository extends JpaRepository<RoomDetail,Long> {
}
