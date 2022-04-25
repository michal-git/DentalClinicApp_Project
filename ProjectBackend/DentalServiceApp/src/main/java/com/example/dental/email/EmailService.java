package com.example.dental.email;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@AllArgsConstructor
public class EmailService implements EmailSender{

    private final static String EMAIL_FROM = "dentalclinic.medical@gmail.com";
    private final static String EMAIL_SUBJECT = "Confirm your email";

    private final static String FAILED_TO_SEND_MSG = "failed to send email";
    private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to, String email) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject(EMAIL_SUBJECT);
            helper.setFrom(EMAIL_FROM);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error(FAILED_TO_SEND_MSG, e);
            throw new IllegalStateException(FAILED_TO_SEND_MSG);
        }
    }
}
