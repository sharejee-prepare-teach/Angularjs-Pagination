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

    @RequestMapping(value = "/multihome")
    public String goMuliHome(){
        System.out.println("Multi Home");
        return "/multiuiview/home";
    }

    @RequestMapping(value = "/multirouteone")
    public String goMuliRouteOne(){
        return "/multiuiview/route1";
    }

    @RequestMapping(value = "/multiroutetwo")
    public String goMuliRouteTwo(){
        return "/multiuiview/route2";
    }

    @RequestMapping(value = "/twoindex")
    public String goTwoIndex() {
        return "/multiuiview/two/index";
    }

    @RequestMapping(value = "/twomenu")
    public String goTwoMenu() {
        return "/multiuiview/two/menu";
    }

    @RequestMapping(value = "/twoprojects")
    public String goTwoProject() {
        return "/multiuiview/two/projects";
    }

    @RequestMapping(value = "/twodateplanner")
    public String goTwoDatePlanner() {
        return "/multiuiview/two/dateplanner";
    }

    @RequestMapping(value = "/cross")
    public String toCrossHome() {
        return "/cross_controller/cross_home";
    }
}