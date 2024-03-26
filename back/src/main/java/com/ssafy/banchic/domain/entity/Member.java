package com.ssafy.banchic.domain.entity;

import com.ssafy.banchic.domain.type.OAuthProvider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;
    private String nickname;
    @Enumerated(EnumType.STRING)
    private OAuthProvider oAuthProvider;
    private String image;

    @OneToOne(mappedBy = "member", cascade = CascadeType.REMOVE)
    private RefreshToken refreshToken;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Heart> heart = new ArrayList<>();

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

}
