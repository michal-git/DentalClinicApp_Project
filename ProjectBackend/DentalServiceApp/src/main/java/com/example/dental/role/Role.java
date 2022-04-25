package com.example.dental.role;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(unique = true, nullable = false, updatable = false)
    private Integer roleId;

    @Enumerated(EnumType.STRING)
    @NaturalId
    private AppUserRole name;

    public Role(AppUserRole name) {
        this.name = name;
    }
}
