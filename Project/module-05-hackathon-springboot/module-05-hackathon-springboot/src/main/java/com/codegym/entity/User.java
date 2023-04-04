package com.codegym.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;
    @Column(name = "phone")
    private String phone;
    @Column(name = "online")
    private String online;


    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "image")
    private String image;

    public User(String image) {
        this.image = image;
    }

    public User(String username, String image) {
        this.username = username;
        this.image = image;
    }

    public User(String username, String phone, String online, String email, String password) {
        this.username = username;
        this.phone = phone;
        this.online = online;
        this.email = email;
        this.password = password;
    }

    public User(String username, String phone, String email, String password) {
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }


    //    public User(String username) {
//        this.username = username;
//    }
}