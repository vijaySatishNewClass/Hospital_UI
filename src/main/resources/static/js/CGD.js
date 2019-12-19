var baseURL = "http://192.168.1.103:8080/CGD";
var baseURLForRedirecctingPage = "http://192.168.1.103:8080/CGDUI";
$(document).ready(function() {
	$("#errorDiv").hide();
	$("#loginDiv").load("ums.html");
	/*$("#includedContent").empty();*/
	
	$("#datatable > tbody").empty();
	getUser();

	$("#datatable2 > tbody").empty();
	// getSubject();
	createLoginUser();
	getCourse();
	getCandidate();

	getManagerApproval();
	getTraine();
	getPayement();
	getCertificate();

});

function loginCheck() {
	if (validateLogin()) {
		loginJson = {
			"userName" : $("#inputUser").val(),
			"password" : $("#inputPassword").val()

		};
		var loginJsonString = JSON.stringify(loginJson);
		jQuery.ajax({
			type : "post",
			contentType : "application/json; charset=utf-8",
			url : baseURL + "/loginCheck",
			data : loginJsonString,
			success : function(data) {
				if (data == 'ums') {
					$(".auth").hide();
					$("#loginDiv").empty();
					$("#includedContent").load("ums.html")
					$("#datatable > tbody").empty();
					getUser();
				} else {
					$("#errorDiv").show();
					setTimeout(function() {
						$("#errorDiv").hide()
					}, 5000);

				}
			},
			error : function() {
				alert("Error");
			}
		});
	}
}

function createUser() {
	if (validateUser()) {
		createJson = {

			"userName" : $("#username").val(),
			"password" : $("#password").val(),
			"firstName" : $("#firstname").val(),
			"lastName" : $("#lastname").val(),
			"email" : $("#email").val(),
			"sex" : "Female",
			"currentPosition" : $("#position").val(),
			"department" : $("#department").val(),
			"workplace" : $("#workplace").val(),
			"telephone" : $("#telephone").val(),
			"phonenumber" : $("#mobile").val(),
			"experiencers" : $("#experience").val(),
			"expertise" : $("#skill").val(),
			"line" : $("#line").val(),
			"twitter" : $("#twitter").val(),
			"facebook" : $("#facebook").val(),
			"instagram" : $("#instagram").val(),
			"youtube" : $("#youtube").val(),
			"github" : $("#github").val()
		};
		var createUserJsonString = JSON.stringify(createJson);
		jQuery.ajax({
			type : "post",
			contentType : "application/json; charset=utf-8",
			url : baseURL + "/createUser",
			data : createUserJsonString,
			success : function(data) {
				$("#hiddenID").val("true");
				window.location.replace(baseURLForRedirecctingPage
						+ "/htmls/ums.html");
				
				$("#umsTBLID > tbody").empty();
				getUser();
			},
			error : function() {

			}
		});
	}

}

function getUser() {
	jQuery
			.ajax({
				type : "get",
				contentType : "application/json; charset=utf-8",
				url : baseURL + "/getUser",
				success : function(data) {
					for (var i = 0; i < data.length; i++) {
						var markup = "<tr>" 
								+"<td class='align-middle'>" 
								+(i+1 )
								+"</td>" 
								+"<td class='align-middle'>" 
								+data[i].userName
								+"</td><td class='align-middle'>"
								+ data[i].firstName
								+" </td>" 
								+"<td class='align-middle'>" 
								+ data[i].department 
								+"</td>" 
								+"<td class='align-middle'>" 
								+data[i].currentPosition
								+"</td>"
								+"<td>"
								+"<span class='rating'><input type='checkbox' name='rating1' id='userrating1' value='6' checked=''> <label for='userrating1'><span class='fa fa-star fa-lg'></span></label></span></td>" 
								+"<td class='align-middle'><label class='switcher-control switcher-control-lg'><input type='checkbox' class='switcher-input switcher-edit'checked='' value='1'> <span class='switcher-indicator'></span> <span class='switcher-label-on'>ON</span> <span class='switcher-label-off text-red'>OFF</span></label></td>"
								+" </td>" 
								+"<td class='align-middle text-right'><a href='#' class='btn btn-sm btn-icon btn-secondary'><i class='fa fa-pencil-alt'></i> <span class='sr-only'>Edit</span></a> <a href='#' class='btn btn-sm btn-icon btn-secondary'><i class='far fa-trash-alt'></i> <span class='sr-only'>Remove</span></a></td></tr>"
						$('#umsTBLID > tbody:last-child').append(markup);
						console.log(data);
					}
				},
			});
}

/*
 * function saveSubject() { var createJson = { "subjectCode" :
 * $("#subject_code").val(), "subjectThai" : $("#subject_th").val(),
 * "englishClass" : $("#subject_en").val(), "learningStyle" :
 * $("#select2-learn_format-container").val(), "instructor" :
 * $("#teacher").val(), "positionType" : $("#position_type").val(), "status" :
 * $("#subject_status").val(),
 * 
 * "levelPosition" : $("#position_level").val(), "position" :
 * $("#position").val(), "personnelType" : $("#person_type").val(),
 * 
 * "department" : $("#department_id").val() }; var createSubjectJsonString =
 * JSON.stringify(createJson); jQuery .ajax({ type : "post", contentType :
 * "application/json", url : "http://localhost:8000/CGD/subject", data :
 * createSubjectJsonString, success : function(data) {
 * 
 * window.location
 * .replace("http://localhost:8000/CGD-UI/htmls/lms_subject.html"); }, error :
 * function() { alert("Data is not saved fine for subject"); } }); } function
 * getSubject() { jQuery .ajax({ type : "get", contentType : "application/json;
 * charset=utf-8", url : "http://localhost:8000/CGD/getSubjectDetails", success :
 * function(data) { for (var i = 0; i < data.length; i++) { var markup = "<tr role='row' class='odd'><td class='sorting_1'>" +
 * (1 + i) + "</td>" + "<td><a href='lesson.html'>" + data[i].subjectThai + "</a></td><td><a
 * href='lesson.html'>" + data[i].englishClass + "</a></td>
 * <td class='align-middle'> <label class='switcher-control
 * switcher-control-success switcher-control-lg'>" + "<input type='checkbox'
 * class='switcher-input switcher-edit' value='1'
 * id='999e08eb38df8ce28c01654331adf845__course_subject__subject_status__subject_id__26__1573110069'>
 * <span class='switcher-indicator'></span>" + " <span
 * class='switcher-label-on'>ON</span> <span class='switcher-label-off
 * text-red'>OFF</span></label> </td>" + "<td class='align-middle'><a
 * href='subjectform.html' ><i class='far fa-edit fa-lg text-success'
 * data-toggle='tooltip' title='แก้ไข'></i></a><a href='#clientDeleteModal'
 * id='999e08eb38df8ce28c01654331adf845__course_subject__subject_status__subject_id__26__1573110069'
 * rel='ต่อยอดธุรกิจด้วย Business Canvas' class='switcher-delete'
 * data-toggle='tooltip' title='ลบข้อมูล'><i class='fas fa-trash-alt fa-lg
 * text-warning '></i></a></td></tr>" $('#datatable2 >
 * tbody:last-child').append(markup); console.log(data); } }, }); }
 */
function saveSubject() {
	var createJson = {

		"subjectCode" : $("#course_code").val(),
		"courseName" : $("#course_name").val(),
		"ministry" : $("#MinistryName").val(),
		"department" : $("#DepartmentName").val(),
		"division" : $("#DivisionName").val(),
		"position" : $("#Position").val(),
		"format" : $("#format").val(),
		"category" : $("#category").val(),
		"content" : $("#content").val(),
		"budget" : $("#budget1").val(),
		"income" : $("#budget2").val(),
		"organization" : $("#budget3").val(),
		"otherFinancialSupport" : $("#budget4").val(),
		"inOperation" : $("#subject_status").val(),
		"regardingRegulationAndGovt" : $("#subject_status1").val(),
		"focusingOnAchievement" : $("#subject_status2").val(),
		"goodManagement" : $("#subject_status3").val(),
		"accumulationOfProfessionalSkills" : $("#subject_status4").val(),
		"ethics" : $("#subject_status5").val(),
		"teamWork" : $("#subject_status6").val(),
		"inLeaderShip" : $("#subject_status7").val(),
		"vision" : $("#subject_status8").val(),
		"strategicGovernmentPlanning" : $("#subject_status9").val(),
		"potentialToBringChange" : $("#subject_status10").val(),
		"selfControl" : $("#subject_status11").val(),
		"coachingAndAssignment" : $("#subject_status12").val(),
		"inAnalyticalThinking" : $("#subject_status13").val(),
		"jobAccuracy" : $("#subject_status14").val(),
		"understandingOfTheOrganization" : $("#subject_status15").val(),
		"corporateImage" : $("#subject_status16").val(),
		"thinkCreatively" : $("#subject_status17").val(),
		"calculation" : $("#subject_statu18").val(),
		"englishLanguageUsage" : $("#subject_status19").val(),
		"usingComputer" : $("#subject_status20").val(),
		"informationManagement" : $("#subject_status21").val(),
		"rationale" : $("#principle").val(),
		"trainingObjectives" : $("#principle1").val(),
		"qualificationsOfTheTrainees" : $("#principle2").val(),
		"numberOfParticipants" : $("#principle3").val(),
		"trainingDuration" : $("#principle4").val(),
		"trainingLocationAndStudyTrips" : $("#principle5").val(),
		"trainingManagement" : $("#principle6").val(),
		"importantCourseContent" : $("#principle7").val(),
		"importantCourseContent1" : $("#principle8").val(),
		"measurementAndEvaluation" : $("#principle9").val(),
		"diploma" : $("#principle10").val(),
		"lecturer" : $("#principle11").val(),
		"applicationRegulations" : $("#principle12").val(),
		"addressContact" : $("#principle13").val()
	};
	var createSubjectJsonString = JSON.stringify(createJson);
	jQuery.ajax({
		type : "post",
		contentType : "application/json",
		url : baseURL + "/subject",
		data : createSubjectJsonString,
		success : function(data) {

			window.location.replace(baseURLForRedirecctingPage
					+ "/htmls/lms_subject.html");

		},
		error : function(e) {
			console.log(e);
			alert("Data is not saved fine for subject");
		}
	});

}
function getSubject() {
	jQuery
			.ajax({
				type : "get",
				contentType :

				"application/json; charset=utf-8",
				url : baseURL + "/getSubjectDetails",
				success : function(data) {
					for (var i = 0; i < data.length; i++) {
						var markup = "<tr role='row' class='odd'><td class='sorting_1'>"
								+ (1 + i)
								+ "</td>"
								+ "<td><a href='add_lessonform.html'>"
								+ data[i].subjectThai
								+ "</a></td>"
								+ "<td><ahref='add_lessonform.html'>"
								+ data[i].englishClass
								+ "</a></td>"
								+ "<td class='align-middle'><label class='switcher-controlswitcher-control-success switcher-control-lg'>"
								+ "<input type='checkbox'class='switcher-input switcher-edit' value='1'id='999e08eb38df8ce28c01654331adf845__course_subject__subject_status__subject_id__26__1573110069'><span class='switcher-indicator'></span>"
								+ " <span class='switcher-label-on'>ON</span> <span class='switcher-label-offtext-red'>OFF</span></label> </td>"
								+ "<td class='align-middle'><ahref='subjectform.html' ><i class='far fa-edit fa-lg text-success'data-toggle='tooltip' title='แก้ไข'></i></a><a href='#clientDeleteModal'id='999e08eb38df8ce28c01654331adf845__course_subject__subject_status__subject_id__26__1573110069'rel='ต่อยอดธุรกิจด้วย Business Canvas' class='switcher-delete'data-toggle='tooltip' title='ลบข้อมูล'><i class='fas fa-trash-alt fa-lgtext-warning '></i></a></td></tr>"
						$('#datatable2 >tbody:last-child').append(markup);
						console.log(data);
					}
				},
			});
}

function createLoginUser() {
	createJson = {
		"userName" : "Nidhu",
		"password" : "nidhu",
	};
	var createUserJsonString = JSON.stringify(createJson);
	jQuery.ajax({
		type : "post",
		contentType : "application/json; charset=utf-8",
		url : baseURL + "/createloginUser",
		data : createUserJsonString,
		success : function(data) {
			console.log("User is created for login with Username::Nidhu/nidhu")
		},

	});

}

function saveCourse() {

	if (validateCourse()) {
		var createJson = {
			"courseName" : $("#MinistryName").val(),
			"generation" : $("#DepartmentName").val(),
			"roup" : $("#DivisionName").val(),
			"amountReceived" : $("#budget1").val(),
			"location" : $("#Location").val(),
			"trainingDate" : $("#course_date").val(),
			"applicationDate" : $("#register_date").val(),
			"paymentDate" : $("#payment_date").val(),
			"applicationFee" : $("#price").val(),
			"bank" : $("#Bank").val(),
			"accountName" : $("#budget2").val(),
			"accountNumber" : $("#budget4").val(),
			"taxNumber" : $("#budget5").val(),
			"showCourse" : $("#Show").val(),
			"projectAdministrator" : $("#budget6").val(),
			"projectAssistant1" : $("#budget7").val(),
			"projectAssistant2" : $("#budget8").val(),
			"sign1" : $("#budget9").val(),
			"position1" : $("#budget10").val(),
			"sign2" : $("#budget11").val(),
			"position2" : $("#budget12").val(),
			"sign3" : $("#budget13").val(),
			"position3" : $("#budget14").val(),
			"payee" : $("#budget15").val(),
			"position" : $("#budget16").val(),
			"receiptDetails3" : $("#data8").val()
		};
		var createCourseJsonString = JSON.stringify(createJson);
		jQuery.ajax({
			type : "post",
			contentType : "application/json",
			url : baseURL + "/course",
			data : createCourseJsonString,
			success : function(data) {
				console.log(data);
				window.location.replace(baseURLForRedirecctingPage
						+ "/htmls/course.html");

			},
			error : function(e) {
				console.log(e);
				alert("Data is not saved fine for subject");
			}
		});
	}
}

function getCourse() {
	jQuery
			.ajax({
				type : "get",
				contentType : "application/json; charset=utf-8",
				url : baseURL + "/getCourseDetails",
				success : function(data) {

					for (var i = 0; i < data.length; i++) {
						var markup = "<tr id='999e08eb38df8ce28c01654331adf845__course_subject__subject_status__subject_id__26__1573110069__row'><td>"
								+ "<a href=''>"
								+ (i + 1)
								+ "</a></td>"
								+ "<td>"
								+ data[i].courseID
								+ "</td>"
								+ "<td>"
								+ data[i].courseName
								+ "</td>"
								+ "<td>"
								+ data[i].generation
								+ "</td><td class='align-middle'> <label class='switcher-control switcher-control-success switcher-control-lg'><input type='checkbox' class='switcher-input switcher-edit'  value='1' id='999e08eb38df8ce28c01654331adf845__course_subject__subject_status__subject_id__26__1573110069'> <span class='switcher-indicator'></span> <span class='switcher-label-on'>ON</span> <span class='switcher-label-off text-red'>OFF</span></label> </td><td class='align-middle'><a href='manage_course.html' data-toggle='tooltip' title='manage'><i class='fas fa-list-ul fa-lg text-danger '></i></a><a href='courseform.html' ><i class='far fa-edit fa-lg text-success' data-toggle='tooltip' title='แก้ไข'></i></a> <a href='#clientDeleteModal'  id='999e08eb38df8ce28c01654331adf845__course_subject__subject_status__subject_id__26__1573110069' rel='ต่อยอดธุรกิจด้วย Business Canvas' class='switcher-delete' data-toggle='tooltip' title='ลบข้อมูล'><i class='fas fa-trash-alt fa-lg text-warning '></i></a></td> </tr>"
						$('#datatablecourse > tbody:last-child').append(markup);
						console.log(data);
					}
				},
			});
}

function getCandidate() {
	jQuery
			.ajax({
				type : "get",
				contentType : "application/json; charset=utf-8",
				url : baseURL + "/getCMSDetails",
				success : function(data) {
					for (var i = 0; i < data.length; i++) {
						var markup = "<tr id='ss'>"
								+ "<td>"
								+ (i + 1)
								+ "</td>"
								+ " <td>"
								+ data[i].uid
								+ "</td>"
								+ "<td>"
								+ data[i].fullName
								+ "</td>"
								+ "<td>"
								+ data[i].department
								+ "</td>"
								+ " <td>"
								+ data[i].registrationDate
								+ "</td>"
								+ " <!-- <td class='align-middle'>"
								+ " <label class='switcher-control switcher-control-success switcher-control-lg'>"
								+ "<input type='checkbox' class='switcher-input switcher-edit'  value='1' id='999e08eb38df8ce28c01654331adf845__course_subject__subject_status__subject_id__26__1573110069'> <span class='switcher-indicator'></span>"
								+ " <span class='switcher-label-on'>ON</span> <span class='switcher-label-off text-red'>OFF</span></label> </td> --><td class='align-middle'><a href='#'  id='999e08eb38df8ce28c01654331adf845__course_subject__subject_status__subject_id__26__1573110069' rel='ต่อยอดธุรกิจด้วย Business Canvas' class='switcher-delete' data-toggle='tooltip' title='ลบข้อมูล'><i class='fas fa-list-alt fa-lg text-success'></i></a></td> "
								+ "<td class='align-middle'><a href='#clientDeleteModal'  id='' rel='ต่อยอดธุรกิจด้วย Business Canvas' class='switcher-delete' data-toggle='tooltip' title='ลบข้อมูล'><i class='fas fa-trash-alt fa-lg text-warning '></i></a></td></tr>"
						$('#datatableCondidate > tbody:last-child').append(
								markup);
						console.log(data);
					}
				},
			});
}

function getManagerApproval() {
	jQuery
			.ajax({
				type : "get",
				contentType : "application/json; charset=utf-8",
				url : baseURL + "/getCMSDetails",
				success : function(data) {
					for (var i = 0; i < data.length; i++) {

						var markup = "<tr id='sd'>"
								+ "<td>"
								+ (i + 1)
								+ "</td>"
								+ "<td>"
								+ data[i].uid
								+ "</td>"
								+ "<td>"
								+ data[i].fullName
								+ "</td>"
								+ "<td>"
								+ data[i].department
								+ "</td>"
								+ "<td><div class='form-group'><select class='custom-select' id='approve_1' required=''><option value='1' class='text-warning'> pending </option><option value='2' class='text-success'> approve </option><option value='3' class='text-red'> not allowed </option></select></div></td><td><div class='form-group'><select class='custom-select' id='conf_1' required=''><option value='1'> Not confirmed </option><option value='2'> join </option><option value='3'> not join </option></select></div></td></tr>"
						$('#datatableapproval > tbody:last-child').append(
								markup);

					}
				},
			});
}
function getTraine() {
	jQuery
			.ajax({
				type : "get",
				contentType : "application/json; charset=utf-8",
				url : baseURL + "/getCMSDetails",
				success : function(data) {
					for (var i = 0; i < data.length; i++) {
						var markup = "<tr id='ss'>"
								+ "<td>"
								+ (i + 1)
								+ "</td>"
								+ "  <td>"
								+ data[i].uid
								+ "</td>"
								+ "<td>"
								+ data[i].fullName
								+ "</td>"
								+ "<td>"
								+ data[i].department
								+ "</td>"
								+ "<td class='align-middle'>"
								+ " <!-- .form-group --><div class='form-group'> <select class='custom-select' id='status_2' required=''>'<option value='0'> Choose Training results </option>'<option value='1'> Successful Training </option> '<option value='2'> Trained </option> '<option value='3'> Not Trained </option> </select>  </div><!-- /.form-group -->	 </td> </tr>"

						$('#datatabletraine > tbody:last-child').append(markup);
						console.log(data);
					}
				},
			});
}
function getPayement() {
	jQuery
			.ajax({
				type : "get",
				contentType : "application/json; charset=utf-8",
				url : baseURL + "/getCMSDetails",
				success : function(data) {
					for (var i = 0; i < data.length; i++) {
						var markup = " <tr id='ss'>"
								+ "<td>"
								+ (i + 1)
								+ "</td>  "
								+ "<td>"
								+ data[i].uid
								+ "</td>"
								+ "<td>"
								+ data[i].fullName
								+ "</td>"
								+ "<td>"
								+ data[i].department
								+ "</td> "
								+ "<td class='align-middle'> "
								+ "<!-- .form-group --><div class='form-group'><select class='custom-select' id='status_2' required=''><option value='1'> not pay yet </option><option value='2'> paid </option></select></div><!-- /.form-group --></td>					<td class='align-middle'><a href='javascript:window.print();' class='btn btn-icon btn-outline-success'><i class='fa fa-print '></i></a></td> <td class='align-middle'>24/11/2019 14:04</td> <td class='align-middle'><a href='javascript:window.print();' class='btn btn-icon btn-outline-success'><i class='fa fa-print '></i></a></td> <td class='align-middle'> </td> <td class='align-middle'> </td> </tr>"
						$('#datatablepay > tbody:last-child').append(markup);
						console.log(data);
					}
				},
			});
}

function getCertificate() {
	jQuery
			.ajax({
				type : "get",
				contentType : "application/json; charset=utf-8",
				url : baseURL + "/getCMSDetails",
				success : function(data) {
					for (var i = 0; i < data.length; i++) {
						var markup = "<tr id='ss'>"
								+ "<td>"
								+ (i + 1)
								+ "</td>"
								+ "<td>"
								+ data[i].uid
								+ "</td>"
								+ "<td>"
								+ data[i].fullName
								+ "</td>"
								+ "<td>"
								+ data[i].department
								+ "</td>"
								+ "<td class='align-middle'><a href='javascript:window.print();' class='btn btn-icon btn-outline-success'><i class='fa fa-print '></i></a></td>  </tr>"
						$('#datatableCertificate > tbody:last-child').append(
								markup);
						console.log(data);
					}
				},
			});
}

function validateCourse() {
	var status = true;
	if ($("#budget1").val() == "" || $("#budget1").val() == "0") {
		$("#budget1").notify("Please enter received amount", "error");
		status = false;
	}
	if ($("#price").val() == "" || $("#price").val() == "0") {
		$("#price").notify("Please enter price", "error");
		status = false;
	}
	if ($("#budget2").val() == "") {
		$("#budget2").notify("Please enter account name", "error");
		status = false;
	}
	
	if ($("#course_date").val() == "") {
		$("#course_date").notify("Please enter account name", "error");
		status = false;
	}
	
	if ($("#register_date").val() == "") {
		$("#register_date").notify("Please enter account name", "error");
		status = false;
	}
	
	if ($("#payment_date").val() == "") {
		$("#payment_date").notify("Please enter account name", "error");
		status = false;
	}
	
	if ($("#budget4").val() == "" || $("#price").val() == "0") {
		$("#budget4").notify("Please enter price", "error");
		status = false;
	}
	if ($("#budget5").val() == "") {
		$("#budget5").notify("Please enter account name", "error");
		status = false;
	}
	
	return status;
}



function validateUser() {
	var status = true;
	if ($("#username").val() == "") {
		$("#username").notify("Please enter a valid username", "error");
		status = false;
	}
	if ($("#password").val() == "") {
		$("#password").notify("Please enter a valid password", "error");
		status = false;
	}
	if ($("#Repassword").val() == "") {
		$("#Repassword").notify("Password does not match ", "error");
		status = false;
	}
	if ($("#lastname").val() == "") {
		$("#lastname").notify("Please enter a valid lastname", "error");
		status = false;
	}
	if ($("#department").val() == "") {
		$("#department").notify("Please enter a valid department", "error");
		status = false;
	}
	if ($("#email").val() == "") {
		$("#email").notify("Please enter a valid email", "error");
		status = false;
	}
	if ($("#position").val() == "") {
		$("#position").notify("Please enter a valid position", "error");
		status = false;
	}
	if ($("#mobile").val() == "") {
		$("#mobile").notify("Please enter a valid mobile number", "error");
		status = false;
	}
	if ($("#experience").val() == "") {
		$("#experience").notify("Please enter a valid experience", "error");
		status = false;
	}
	if ($("#skill").val() == "") {
		$("#skill").notify("Please enter a valid expertise", "error");
		status = false;
	}
	if ($("#firstname").val() == "") {
		$("#firstname").notify("Please enter Firstname", "error");
		status = false;
	}

	if ($("#telephone").val() == "") {
		$("#telephone").notify("Please enter Firstname", "error");
		status = false;
	}
	if ($("#mobile").val() == "") {
		$("#mobile").notify("Please enter Firstname", "error");
		status = false;
	}

	return status;

}



function validateLogin() {
	var status = true;
	if ($("#inputUser").val() == "") {
		$("#inputUser").notify("Please enter a valid username", "error");
		status = false;
	}
	if ($("#inputPassword").val() == "") {
		$("#inputPassword").notify("Please enter password", "error");
		status = false;
	}

	return status;
}

function redirectPage(){
	
	$(".page").empty();
	$(".page").load("add_umsform.html");
	
}











