package com.group3.spotifycopy.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.group3.spotifycopy.models.Playlist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class UserDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String username;
    private String password;

    public UserDTO(String username, String password) {
        this.username=username;
        this.password=password;
    }

    @JsonIgnore
    public String getPassword() {
    return password;
}

    @JsonProperty
    public void setPassword(String password) {
        this.password=password;
    }
}