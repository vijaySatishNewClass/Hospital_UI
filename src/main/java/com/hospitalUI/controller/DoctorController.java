package com.hospitalUI.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exception.globalCustomException.CustomException;
import com.exception.model.ErrorMO;
import com.hospitalUI.service.DoctorService;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

  private DoctorService doctorService;

  @Autowired
  public DoctorController(DoctorService doctorService) {
    this.doctorService = doctorService;
  }
  
  
  
  
  @GetMapping("/getMessage")
  public ResponseEntity<?> getMessage(){
	  
	
	  
	  return new ResponseEntity<>(new ErrorMO(200,"mhgfjhc"),HttpStatus.OK);
	  
  }
  
  
}
