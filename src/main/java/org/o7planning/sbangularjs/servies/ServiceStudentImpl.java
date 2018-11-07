package org.o7planning.sbangularjs.servies;

import java.util.List;

import org.o7planning.sbangularjs.model.Student;
import org.o7planning.sbangularjs.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ServiceStudentImpl implements StudentService{

  @Autowired
  StudentRepository studentRepository;
	
	
	@Override
	public List<Student> lstStudent() {
		// TODO Auto-generated method stub
		return studentRepository.findAll();
	}

	@Override
	public Student getById(Long id) {
		// TODO Auto-generated method stub
		return studentRepository.findOne(id);
	}

	@Override
	public void addStudent(Student student) {
		studentRepository.save(student);
		
	}

	

	@Override
	public void deletStudent(Long id) {
		studentRepository.delete(id);
		
	}

	@Override
	public void upDateStudent(Student student, Long id) {
		student.setStuId(id);
		studentRepository.save(student);
	}

	@Override
	public Page<Student> findPaginated(int page, int size) {
		return studentRepository.findAll(new PageRequest(page,size));
	}
}
