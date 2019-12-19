package com.hospitalUI.controller;

import com.hospitalUI.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
//@RequestMapping("/admin")
public class AdminController {

	private AdminService adminService;

	@Autowired
	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}

	@GetMapping("/")
	public String initiateApplication() {
		return "login";
	}

	@PostMapping(value = "/checkLogin")
	public String checkLogin() {
		return "mainLayoutReception";
	}

	@PostMapping("/resetPassword")
	public String resetPassword() {
		return "resetPassword";
	}

	@PostMapping("/forgotPassword")
	public String forgotPassword() {
		return "forgetPassword";
	}

}
