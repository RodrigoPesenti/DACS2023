package utn.dacs.ms.backend.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {


	//@Bean
	//public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	//	http.cors().and().csrf().disable()
	//			.authorizeRequests(authorize -> authorize
	//					.anyRequest().permitAll()
	//			);
    //
	//	return http.build();
	//}
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> {
            CorsConfiguration cors = new CorsConfiguration();
            cors.setAllowedOrigins(List.of("http://localhost:4200"));
            cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
            cors.setAllowedHeaders(List.of("Authorization", "Content-Type"));
            return cors;
        });

        return http.build();
	}

}
