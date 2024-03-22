package com.ssafy.banchic.domain.entity;

import com.ssafy.banchic.domain.type.OAuthProvider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private String refreshToken;

    @Builder
    public Member(String email, String nickname, OAuthProvider oAuthProvider) {
        this.email = email;
        this.nickname = nickname;
        this.oAuthProvider = oAuthProvider;

    }

    // 연관관계 메서드
    public void changeRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }
}
