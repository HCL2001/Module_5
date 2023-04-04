package com.codegym.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "message")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "content")
    private String content;

    @Column(name = "username")
    private String username;
    @Column(name = "room_name")
    private String room_name;
    @Column(name = "date")
    private String date;

    @Column(name = "image")
    private String image;

    public Message(Long id, String content, String username, String room_name, String date, String image) {
        this.id = id;
        this.content = content;
        this.username = username;
        this.room_name = room_name;
        this.date = date;
        this.image = image;
    }

    public Message() {
    }

    public Message(String content, String username, String room_name, String date, String image) {
        this.content = content;
        this.username = username;
        this.room_name = room_name;
        this.date = date;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoom_name() {
        return room_name;
    }

    public void setRoom_name(String room_name) {
        this.room_name = room_name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
