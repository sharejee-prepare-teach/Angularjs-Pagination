package org.o7planning.sbangularjs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by Rith on 10/2/2018.
 */
@SpringBootApplication
@EnableAutoConfiguration
public class MainApplication {
    public static void main(String args[]){
        SpringApplication.run(MainApplication.class,args);
    }
}
