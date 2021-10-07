package com.group3.spotifycopy.models;

import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public  class User {

    private Integer id;

    private String username;
    private String password;

    public User(String username, String password) {
        this.username=username;
        this.password=password;
    }
}
