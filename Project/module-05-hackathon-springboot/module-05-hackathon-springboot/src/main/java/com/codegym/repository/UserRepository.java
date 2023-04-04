package com.codegym.repository;

import com.codegym.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.online = 'true'")
    List<User> getAllUserIfOnline();

    @Query("SELECT u FROM User u WHERE u.username = ?1")
    User getUserByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.username = ?1 AND u.password = ?2")
    User getUserByUsernameAndPassword(String username, String password);

    Page<User> findAllByUsernameContaining(String firstname, Pageable pageable);

    void deleteByUsername(String name);
}
