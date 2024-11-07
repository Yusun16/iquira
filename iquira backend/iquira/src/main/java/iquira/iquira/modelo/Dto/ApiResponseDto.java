package iquira.iquira.modelo.Dto;

public class ApiResponseDto<T> {

    private String mensaje;
    private T data;
    private boolean success;

    public ApiResponseDto(String mensaje, T data, boolean success) {
        this.mensaje = mensaje;
        this.data = data;
        this.success = success;
    }

    // Getters y setters
    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}