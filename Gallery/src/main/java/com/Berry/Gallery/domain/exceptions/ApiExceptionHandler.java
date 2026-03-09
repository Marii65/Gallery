package com.Berry.Gallery.api.exception;

import com.Berry.Gallery.domain.exceptions.EmailJaCadastradoException;
import com.Berry.Gallery.domain.exceptions.UserJaCadastradoException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(EmailJaCadastradoException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleEmailJaCadastrado(EmailJaCadastradoException ex) {

        Map<String, String> erro = new HashMap<>();
        erro.put("erro", ex.getMessage());

        return erro;
    }

    @ExceptionHandler(UserJaCadastradoException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleUserJaCadastrado(UserJaCadastradoException ex) {

        Map<String, String> erro = new HashMap<>();
        erro.put("erro", ex.getMessage());

        return erro;
    }

}
