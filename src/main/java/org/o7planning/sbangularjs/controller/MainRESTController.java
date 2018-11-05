package org.o7planning.sbangularjs.controller;

import java.util.List;


import org.o7planning.sbangularjs.exception.MyResourceNotFoundException;
import org.o7planning.sbangularjs.model.Student;
import org.o7planning.sbangularjs.servies.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController 
public class MainRESTController {
  
    @Autowired
    private StudentService studentService;
  
  
    // URL:
    // http://localhost:8080/SomeContextPath/students
    // http://localhost:8080/SomeContextPath/students.xml
    // http://localhost:8080/SomeContextPath/students.json
    @RequestMapping(value = "/students", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE, //
                    MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public List<Student> getStudents() {
        List<Student>students= studentService.lstStudent();

        return students;
    }
    @RequestMapping(value = "/students/p/{page}/{pageSize}", //
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE, //
                    MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public Page<Student> getStudentsP(@PathVariable("page") int page, @PathVariable("pageSize") int pageSize) {
        Page<Student> resultPage = studentService.findPaginated(page, pageSize);
        if (page > resultPage.getTotalPages()) {
            throw new MyResourceNotFoundException();
        }

        return resultPage;
    }

  
    // URL:
    // http://localhost:8080/SomeContextPath/student/{stuId}
    // http://localhost:8080/SomeContextPath/student/{stuId}.xml
    // http://localhost:8080/SomeContextPath/student/{stuId}.json
    @RequestMapping(value = "/student/{stuId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE, //
                    MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public Student getStudent(@PathVariable("stuId") Long stuId) {
        return studentService.getById(stuId);
    }
  
    // URL:
    // http://localhost:8080/SomeContextPath/employee
    // http://localhost:8080/SomeContextPath/employee.xml
    // http://localhost:8080/SomeContextPath/employee.json
  
    @RequestMapping(value = "/student", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE, //
                    MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public Student addStudent(@RequestBody Student student) {
  
        System.out.println("(Service Side) Creating student with stuName: " + student.getStuName());
  
         studentService.addStudent(student);
		return student;
    }
  
    // URL:
    // http://localhost:8080/SomeContextPath/employee
    // http://localhost:8080/SomeContextPath/employee.xml
    // http://localhost:8080/SomeContextPath/employee.json
    @RequestMapping(value = "/student/{id}", //
            method = RequestMethod.PUT, //
            produces = { MediaType.APPLICATION_JSON_VALUE, //
                    MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public void  updateStudent(@RequestBody Student student,@PathVariable Long id) {
  
       
  
         studentService.upDateStudent(student, id);
    }
  
    // URL:
    // http://localhost:8080/SomeContextPath/employee/{empId}
    @RequestMapping(value = "/student/{stuId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    public void deleteStudent(@PathVariable("stuId") Long stuId) {
  
        System.out.println("(Service Side) Deleting student with Id: " + stuId);
  
        studentService.deletStudent(stuId);
    }
  
}