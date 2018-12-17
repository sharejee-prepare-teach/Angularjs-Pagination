package org.o7planning.sbangularjs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {
  
    @RequestMapping("/")
    public String welcome() {
        return "index";
    }

    @RequestMapping("/two")
    public String toTwo() {
        return "two";
    }

    @RequestMapping("/main")
    public String toMain() {
        return "main";
    }

    @RequestMapping("/index2")
    public String toIndex2() {
        return "index2";
    }

    @RequestMapping("/twotest")
    public String toTwotest() {
        return "twotest";
    }
    @RequestMapping(value = "/text_editor_angular",method = RequestMethod.GET)
    private String toNewsAngularJSEditor(){
        return "/text_editor_angular";
    }
}