package com.example.dental.security.config;

import com.example.dental.security.jwt.JwtAuthEntryPoint;
import com.example.dental.security.jwt.JwtAuthTokenFilter;
import com.example.dental.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtAuthEntryPoint unauthorizedHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                    .antMatchers(
                            "/restApi/users/add-role", "/restApi/users/remove-role", "/restApi/users/set-blocked",
                            "/restApi/users/add-user", "/restApi/dental-service/add", "/restApi/dental-service/disable",
                            "/restApi/dental-service/enable", "/restApi/dental-service/get-one", "/restApi/dental-service/update-price",
                            "/restApi/appointments/dentist-appointments", "/restApi/appointments/all"
                    ).hasAuthority("ADMIN")
                    .antMatchers(
                            "/restApi/appointments/dentist/create", "/restApi/appointments/done",
                            "/restApi/appointments/add-description"
                    ).hasAuthority("DENTIST")
                    .antMatchers(
                            "/restApi/appointments/create"
                    ).hasAuthority("PATIENT")
                    .antMatchers(
                            "/restApi/users/all-patients"
                    ).hasAnyAuthority("DENTIST", "ADMIN")
                    .antMatchers(
                            "/restApi/appointments/my-appointments", "/restApi/appointments/postpone"
                    ).hasAnyAuthority("DENTIST", "PATIENT")
                    .antMatchers(
                            "/restApi/users/my-profile", "/restApi/users/get-one", "/restApi/dental-service/all",
                            "/restApi/appointments/cancel"
                    ).hasAnyAuthority("ADMIN", "DENTIST", "PATIENT")
                    .antMatchers("/restApi/auth/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public JwtAuthTokenFilter authenticationJwtTokenFilter() {
        return new JwtAuthTokenFilter();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userService);
        return provider;
    }
}
