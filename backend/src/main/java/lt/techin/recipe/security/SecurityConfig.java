package lt.techin.recipe.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/users")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/users/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, "/users")
                        .permitAll()
                        .requestMatchers(HttpMethod.PUT, "/users/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/users/**")
                        .permitAll()
                        //                        .requestMatchers(HttpMethod.GET, "/films")
                        //                        .hasRole("USER")
                        //                        .requestMatchers(HttpMethod.GET, "/films/**")
                        //                        .hasRole("USER")
                        //                        .requestMatchers(HttpMethod.POST, "/films")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.PUT, "/films/**")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.DELETE, "/films/**")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.GET, "/actors")
                        //                        .hasRole("USER")
                        //                        .requestMatchers(HttpMethod.GET, "/actors/**")
                        //                        .hasRole("USER")
                        //                        .requestMatchers(HttpMethod.POST, "/actors")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.PUT, "/actors/**")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.DELETE, "/actors/**")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.GET, "/directors")
                        //                        .hasRole("USER")
                        //                        .requestMatchers(HttpMethod.GET, "/directors/**")
                        //                        .hasRole("USER")
                        //                        .requestMatchers(HttpMethod.POST, "/directors")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.PUT, "/directors/**")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.DELETE, "/directors/**")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.GET, "/sales")
                        //                        .hasRole("USER")
                        //                        .requestMatchers(HttpMethod.GET, "/sales/**")
                        //                        .hasRole("USER")
                        //                        .requestMatchers(HttpMethod.POST, "/sales")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.PUT, "/sales/**")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.DELETE, "/sales/**")
                        //                        .hasRole("ADMIN")
                        //                        .requestMatchers(HttpMethod.GET, "/login")
                        //                        .permitAll()
                        //                        .requestMatchers(HttpMethod.GET, "/login/**")
                        //                        .permitAll()
                        //                        .requestMatchers(HttpMethod.POST, "/login")
                        //                        .permitAll()
                        //                        .requestMatchers(HttpMethod.PUT, "/login/**")
                        //                        .permitAll()
                        //                        .requestMatchers(HttpMethod.DELETE, "/login/**")
                        //                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .httpBasic(Customizer.withDefaults())
                // isjungiam CSRF tik DEVELOP tiklsams

                .csrf(csrf -> csrf.disable());

        return http.build();
    }

    //    @Bean
    //    public UserDetailsService userDetailsService() throws Exception {
    //        User.UserBuilder users = User.withDefaultPasswordEncoder();
    //        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
    //        manager.createUser(
    //                users.username("user").password("labas123").roles("USER").build());
    //
    //        return manager;
    //    }

    //    @Bean
    //    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //        http.csrf(c -> c.disable());
    //
    //        return http.build();
    //    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
