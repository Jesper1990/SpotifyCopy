package com.group3.spotifycopy.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Playlist {

    private Integer id;

    private String playlistName;

    private Integer owner;

    private List<String> songIds;
}
