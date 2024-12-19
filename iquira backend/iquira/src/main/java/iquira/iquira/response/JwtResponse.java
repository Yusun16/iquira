package iquira.iquira.response;

import java.util.List;

public class JwtResponse {

    private String token;
    String type = "Bearer";
    private String username;
    private Integer id;
    private List<String> roles;

    public JwtResponse(String accessToken, String username, Integer id, List<String> roles) {
        this.token = accessToken;
        this.username = username;
        this.id = id;
        this.roles = roles;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAcessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
