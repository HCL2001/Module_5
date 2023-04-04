package com.codegym.entity;

import javax.persistence.*;

@Entity
@Table(name = "room_detail")
public class RoomDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "room_id")
    private Long roomID;

    public RoomDetail() {
    }

    public RoomDetail(Long id, Long userId, Long roomID) {
        this.id = id;
        this.userId = userId;
        this.roomID = roomID;
    }
}
