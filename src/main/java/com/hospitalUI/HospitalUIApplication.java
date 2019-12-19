package com.hospitalUI;

//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HospitalUIApplication {// implements CommandLineRunner{

	// @Autowired
	// private ApplicationContext appContext;

	// public static void main(String[] args) {
	// SpringApplication app = new SpringApplication(HospitalUIApplication.class);
	// app.setBannerMode(Mode.OFF);
	// app.run(args);
	// SpringApplication.run(HospitalUIApplication.class, args); //default
	// }

	// @Override
	// public void run(String[] args) throws Exception {

	// String[] beans = appContext.getBeanDefinitionNames();
	// for (String bean : beans) {
	// System.out.println(bean);
	// }

	// }

	public static void main(String[] args) {
		SpringApplication.run(HospitalUIApplication.class, args); // default
	}

}
