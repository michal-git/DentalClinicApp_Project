package com.example.dental.exception;

public class EmailTakenException extends Exception {
    private final static String MESSAGE = "E-mail address already taken: ";

    public EmailTakenException(String email) {
        super(MESSAGE + email);
    }
}
