package org.o7planning.sbangularjs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
  
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

    @RequestMapping(value = "/newst")
    public String toNews(){
        return "/tabs/news";
    }

    @RequestMapping(value = "/sportst")
    public String toSport(){
        return "/tabs/sports";
    }

    @RequestMapping(value = "/musict")
    public String toMusic(){
        return "/tabs/music";
    }

    @RequestMapping(value = "/indext")
    public String toIndex(){
        return "/tabs/index";
    }

    @RequestMapping(value = "/about")
    public String toAbout(){
        return "/tabs/about";
    }

    @RequestMapping(value = "/student")
    public String toStudent(){
        return "/tabs/student";
    }

    @RequestMapping(value = "/tabtwo")
    public String toTab2(){
        return "/tabs2/index";
    }

    @RequestMapping(value = "/tabthree")
    public String toTab3(){
        return "/tabs3/index";
    }
}