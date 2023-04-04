package com.codegym.controller;

import com.codegym.entity.Message;
import com.codegym.entity.Room;
import com.codegym.entity.User;
import com.codegym.service.MessageService;
import com.codegym.service.RoomService;
import com.codegym.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private MessageService messageService;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody User user){
        String username = user.getUsername();
        String password = user.getPassword();

        User repUser = userService.getUserByUsernameAndPassword(username,password);
        if (repUser != null){
            repUser.setOnline("true");
            userService.saveUser(repUser);
            User resUser = userService.getUserByUsernameAndPassword(username,password);
            return new ResponseEntity<>(resUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-users-if-online")
    public ResponseEntity<List<User>> getOnlineUsers() {
        List<User> userList = userService.getAllUserIfOnline();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("/get-users")
    public ResponseEntity<?> getUserList() {
        List<User> userList = userService.getAllUser();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user.setOnline("true");
        userService.saveUser(user);
        System.out.println(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserById(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/update/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @RequestBody User user) {
        User searchUser = userService.getUserByUsername(username);
        if (searchUser != null) {
            user.setId(searchUser.getId());
            user.setUsername(searchUser.getUsername());
            userService.saveUser(user);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/add-image/{username}")
    public ResponseEntity<?> addImage(@PathVariable String username, @RequestBody User user) {
        User searchUser = userService.getUserByUsername(username);
        if (searchUser != null) {
            searchUser.setImage(user.getImage());
            userService.saveUser(searchUser);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get-image/{username}")
    public ResponseEntity<User> getImage(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/update-email/{username}")
    public ResponseEntity<User> updateEmail(@PathVariable String username, @RequestBody User user) {
        User searchUser = userService.getUserByUsername(username);
        if (searchUser != null) {
            if (user.getEmail() != null) {
                searchUser.setEmail(user.getEmail());
            }
            userService.saveUser(searchUser);
            return new ResponseEntity<>(searchUser, HttpStatus.OK);
        }
        return null;
    }

    @PostMapping("/update-phone/{username}")
    public ResponseEntity<User> updatePhone(@PathVariable String username, @RequestBody User user) {
        User searchUser = userService.getUserByUsername(username);
        if (searchUser != null) {
            if (user.getPhone() != null) {
                searchUser.setPhone(user.getPhone());
            }
            userService.saveUser(searchUser);
            return new ResponseEntity<>(searchUser, HttpStatus.OK);
        }
        return null;
    }

    @PostMapping("/update-password/{username}")
    public ResponseEntity<User> updatePassword(@PathVariable String username, @RequestBody User user) {
        User searchUser = userService.getUserByUsername(username);
        if (searchUser != null) {
            if (user.getPassword() != null) {
                searchUser.setPassword(user.getPassword());
            }
            userService.saveUser(searchUser);
            return new ResponseEntity<>(searchUser, HttpStatus.OK);
        }
        return null;
    }

    // Search User
    @GetMapping("/get-online-user-by-username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("searchUser") String username) {
        User searchUser = userService.getUserByUsername(username);
        if (searchUser != null) {
            if (searchUser.getOnline().equals("true")) {
                return new ResponseEntity<>(searchUser, HttpStatus.OK);
            }
        }
        return null;
    }

    @DeleteMapping("/delete/{data}")
    public ResponseEntity<?> deleteUserByName(@PathVariable("data") String name){
        userService.delete(name);
        return new ResponseEntity<>("Da Xoa Thanh Cong", HttpStatus.OK);
    }








   //Code Hai

    @GetMapping("/roomList")
    public ResponseEntity<?> getListRoom(){
        List<Room> rooms = roomService.getListRoom();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PostMapping("/room/{data}")
    public ResponseEntity<?> addRoom(@PathVariable(value = "data") String room){
        Room room1 = new Room();
        room1.setName(room);
        roomService.save(room1);
        return new ResponseEntity<>("Room add successfully", HttpStatus.OK);
    }

    @PostMapping("/logout/{data}")
    public ResponseEntity<?> logout(@PathVariable("data") String username){
        User user = userService.getUserByUsername(username);
        user.setOnline("false");
        userService.saveUser(user);
        return new ResponseEntity<>("Logout successfully",HttpStatus.OK);
    }

    @PostMapping("/message")
    public ResponseEntity<?> saveMessage(@RequestBody Message message){
        messageService.save(message);
        return new ResponseEntity<>("Message save successfully", HttpStatus.OK);
    }

    @GetMapping("/message-history/{data}")
    public ResponseEntity<?> getAllMessage(@PathVariable("data") String roomName){
        List<Message> messageList = messageService.getAllMessageByRoomName(roomName);
        return new ResponseEntity<>(messageList, HttpStatus.OK);
    }

    @GetMapping("/avatar/{username}")
    public ResponseEntity<?> getAvatar(@PathVariable(value = "username") String  name){
        User user = userService.getUserByUsername(name);
        return new ResponseEntity<>(user.getImage(), HttpStatus.OK);
    }
}