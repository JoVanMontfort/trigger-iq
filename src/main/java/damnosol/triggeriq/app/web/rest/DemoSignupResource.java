package damnosol.triggeriq.app.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DemoSignupResource {

    private final Logger log = LoggerFactory.getLogger(DemoSignupResource.class);

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        log.info("Signup request received: {}", request.getEmail());
        return ResponseEntity.ok("Signup successful for " + request.getEmail());
    }

    public static class SignupRequest {

        private String email;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
}
