package com.group3.spotifycopy.models.dto;

import com.group3.spotifycopy.models.Playlist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public  class UserDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;
    private String email;

    @OneToMany(cascade=CascadeType.ALL)
    public List<Playlist> playlists;

}
