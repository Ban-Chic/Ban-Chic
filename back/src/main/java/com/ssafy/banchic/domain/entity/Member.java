package com.ssafy.banchic.domain.entity;

import com.ssafy.banchic.domain.type.OAuthProvider;
import jakarta.persistence.*;
import java.util.List;
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

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Review> reviews;

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateImage(String imgUrl) {
        this.image = imgUrl;
    }

}
