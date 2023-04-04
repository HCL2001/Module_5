package com.codegym.service;

import com.codegym.entity.User;
import com.codegym.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        // MultipartFile file, String username, String email, String password
        User newUser = new User();
        userRepository.save(user);
    }

    public User findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } return null;
    }


    public List<User> getAllUser()  {
        List<User> listUser = userRepository.findAll();
        return listUser;
    }

    public Page<User> getAllUserByName(String name,Pageable pageable)  {
        Page<User> listUser = userRepository.findAllByUsernameContaining(name,pageable);
        return listUser;
    }



    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }


    public User getUserByUsernameAndPassword(String username, String password){
        return userRepository.getUserByUsernameAndPassword(username,password);
    }

    public List<User> getAllUserIfOnline() {
        return userRepository.getAllUserIfOnline();
    }

    @Transactional
    public void delete(String name){
        userRepository.deleteByUsername(name);
    }



}