/*
 *
 *Data Service 
 * 
 */

app.factory('DataService', function(){
   
    var ParseService = {
      name: "Parse",
	   getCategories : function getCategories(callback) {
		var NavBuilder = Parse.Object.extend("NavBuilder");
        query = new Parse.Query(NavBuilder);
		query.ascending("order");
		query.find({
		  success: function(obj) {
		  	 callback(obj);
		  },
		  error: function(error) {
		    console.log("getCategories Error");
			alert("Oops! something went wrong. Please try again. ");
			 
		  }
		});
      },
	  getModules : function getModules(modulesArray,callback) {
		var Collections = Parse.Object.extend("Collections");
        query = new Parse.Query(Collections);
		query.include("Author");
		query.ascending("SeriesNumber");
		query.containedIn("objectId",modulesArray);
		
		query.find({
		  success: function(obj) {
		  	 callback(obj);
		  },
		  error: function(error) {
		    console.log("getModules Error");
			alert("Oops! something went wrong. Please try again. ");
			 
		  }
		});
      },
	  getModulesWithoutID : function getModules(callback) {
		var Collections = Parse.Object.extend("Collections");
        query = new Parse.Query(Collections);
		query.include("Author");
		query.ascending("SeriesNumber");
		query.find({
		  success: function(obj) {
		  	 callback(obj);
		  },
		  error: function(error) {
		    console.log("getModulesWithoutID Error");
			//alert("Error: " + error.code + " " + error.message);
			 alert("Oops! something went wrong. Please try again. ");
		  }
		});
      },
	   getModuleByID : function getModulesByID(categoryid,callback) {
		var Collections = Parse.Object.extend("Collections");
        query = new Parse.Query(Collections);
		query.include("Author");
		//query.ascending("SeriesNumber");
		
		query.get(categoryid,{
		  success: function(obj) {
		  	 callback(obj);
		  },
		  error: function(error) {
		    console.log("getModulesByID Error");
			//alert("Error: " + error.code + " " + error.message);
			 alert("Oops! something went wrong. Please try again. ");
		  }
		});
      },
      getCategoryById : function getCategoryById(cateogryId,callback) {
		var NavBuilder = Parse.Object.extend("NavBuilder");
        query = new Parse.Query(NavBuilder);
		//query.equalTo("objectId", cateogryId);
		
		query.get(cateogryId,{
		  success: function(obj) {
		  	 callback(obj);
		  },
		  error: function(error) {
		    console.log("getCategoryById Error");
			alert("Oops! something went wrong. Please try again. ");
			 
		  }
		});
      },
	  getLessons:function(moduleid,callback){
		
		var Lessons = Parse.Object.extend("Lessons");
		var query = new Parse.Query(Lessons);
		var Collections = Parse.Object.extend("Collections");
		var obj=new Collections();
        obj.id=moduleid;
		query.equalTo("pCollection", obj);
		query.ascending("SeriesOffset");
		query.find({
		  success: function(object) {
			callback(object);
		  },
		  error: function(error) {
		    console.log("getLessons Error");
			alert("Oops! something went wrong. Please try again. ");
		  }
		});
	  
	  },
	  signUp:function(user,userInfo,callback){
		
		user.signUp({firstname:userInfo.firstname,lastname:userInfo.lastname}, {
		  success: function(user) {
			// Password reset request was sent successfully
			callback(user);
			console.log("User Signup success");
			trackUserInteraction(window.location,"Signup","Complete","");
		  },
		  error: function(error) {
			// Show the error message somewhere
			        console.log("signUp Error");
			        trackUserInteraction(window.location,"Signup","Error","");
					if(error.get("username"))
					alert("This Email is already registered.");
					else
					alert("Signup error. Please try again.");
				}
			});
		},
	  requestPasswordReset:function(username,callback){
		
		Parse.User.requestPasswordReset(username, {
		  success: function() {
			// Password reset request was sent successfully
			callback();
			alert("Password reset email has been sent.");
		  },
		  error: function(error) {
			// Show the error message somewhere
			        console.log("requestPasswordReset Error");
					alert("Oops! something went wrong. Please try again. ");
				}
			});
		},
		logIn:function(username,password,callback){
		
		Parse.User.logIn(username,password, {
          success: function(user) {
			 callback(user);
		  },
		  error: function(error) {
			// Show the error message somewhere
			        console.log("logIn Error");
					alert("Incorrect Email/Password Combination. Please try again.");
				}
			});
		},
		logOut:function(callback){
			Parse.User.logOut();
			window.setTimeout(function() { 
				callback();
			}, loaderDelay);
		},
		getCurrentUser:function(){
			return Parse.User.current();
		},
		getChoirEnrollmentByEmail:function(email,callback){
		   var ChoirEnrollment = Parse.Object.extend("ChoirEnrolment");
		   var query = new Parse.Query(ChoirEnrollment);
		   query.equalTo("email", email);
			query.find({
				  success:function(list) {
					 callback(list);
			  },
			  error: function(error) {
				// Show the error message somewhere
				        console.log("getChoirEnrollmentByEmail Error");
						alert("Oops! something went wrong. Please try again. ");
					}
				});
		},
		saveChoirEnrollment:function(choirEnrolment,callback){
		    choirEnrolment.save(null, {
				  success: function(data) {
					 callback(data);
				  },
				  error: function(choirEnrolment, error) {
					  $(".loadingcircle").hide();
					  console.log("saveChoirEnrollment Error");
					  alert("Oops! something went wrong. Please try again. ");
				  }
				});
		},
		verifyMail:function(callback){
			
			var currentUser = Parse.User.current().fetch({
			  success:function(list) {
				console.log(list);
				callback(list);
				},
				error:function(error)
				{
					console.log("verifyMail Error");
					alert("Oops! something went wrong. Please try again. ");
				}
			});
		},
		resendEmail:function(user,callback){
		
				user.set("email", user.get("email"));
				user.save(null, {
					success: function(object) {
						alert("We have resent the email. Please check again.")
					},
					error: function(object, error) {
						console.log("resendEmail Error");
						alert("Some error on backend. Please try again.");
					}
				});
			
		},
		saveAssociate:function(associateEnrolment,callback){
			associateEnrolment.save(null, {
				  success: function(data) {
					callback(data);
				  },
				  error: function(choirEnrolment, error) {
					  $(".loadingcircle").hide();
					  alert("Oops! something went wrong. Please try again. ");
				  }
			});
		},
		getAssociateByEmail:function(email,callback){
		   var AssociateEnrolment = Parse.Object.extend("Associate");
		   var query = new Parse.Query(AssociateEnrolment);
		   query.equalTo("email", email);
		   query.find({
				  success: function(data) {
					callback(data);
				  },
				  error: function(choirEnrolment, error) {
					  $(".loadingcircle").hide();
					  alert("Oops! something went wrong. Please try again. ");
				  }
			});
		},

		getUserDetailByEmail:function(email,callback){
				//alert(email);
				var query = new Parse.Query("User");
				query.equalTo("email", email);
				query.find({
				  success: function(obj) {
				    // results is an array of Parse.Object.
				    //console.log(obj.get("emailVerified"));
				    callback(obj)
				  },

				  error: function(error) {
				    // error is an instance of Parse.Error.
				  }
				});
		},

		getInventoryByEmail:function(user,callback){
		   var Inventory = Parse.Object.extend("Inventory");
		   var query = new Parse.Query(Inventory);
		   query.equalTo("user", user);
		   query.ascending("collectionID");
		   query.find({
				  success: function(data) {
					callback(data);
				  },
				  error: function(choirEnrolment, error) {
					 alert("Oops! something went wrong. Please try again. ");
				  }
			});
		},
		sendOfferToStudent:function(data,callback){
		
		   var StudentReferral = Parse.Object.extend("StudentReferral");
		   var studentReferral = new StudentReferral();
		   studentReferral.set("email", data.email);
		   studentReferral.set("name", data.name);
		    studentReferral.set("desc", data.desc);
		   studentReferral.set("gurumail", data.gurumail);
				studentReferral.save(null, {
					success: function(object) {
						alert("Student will be informed shortly.")
						callback(data);
					},
					error: function(object, error) {
						console.log("resendEmail Error");
						alert("Some error on backend. Please try again.");
					}
				});
		
		},
		getUserByActivationCode:function(data,callback){
		
		   var StudentReferral = Parse.Object.extend("StudentReferral");
		     query = new Parse.Query(StudentReferral);
			 query.get(data,{
			  success: function(obj) {
				 console.log("success");
				 callback(obj);
			  },
			  error: function(error) {
				console.log("getUserByActivationCode");
				 callback(error);
				 
			  }
			});
		
		},
		updateUser:function(user,callback){
			 user.save(null,{
				  success: function(obj) {
					 console.log("success");
					 callback(obj);
				  },
				  error: function(error) {
					console.log("getUserByActivationCode");
					alert("Some error on backend. Please try again.");
				  }
			});
		
		},
		getUserByEmail:function(data,callback){
		
		   var User = Parse.Object.extend("User");
		     query = new Parse.Query(User);
			 query.equalTo("email", data);
		   query.find({
				  success: function(data) {
					callback(data);
				  },
				  error: function(choirEnrolment, error) {
					  alert("Oops! something went wrong. Please try again. ");
				  }
			});
		
		},
		getStudentsByGuru:function(studentData,callback){
			console.log("student data");
			console.log(studentData);
		   var User = Parse.Object.extend("StudentReferral");
		     query = new Parse.Query(User);
			 query.equalTo("gurumail", studentData.guruEmail);
			 query.limit(studentData.limit);
			 query.skip(studentData.skip);
		   query.find({
				  success: function(data) {
					callback(data);
				  },
				  error: function(choirEnrolment, error) {
					  alert("Oops! something went wrong. Please try again. ");
				  }
			});
		
		},

		getAllStudentsByGuru:function(data,callback){
		
		   var User = Parse.Object.extend("StudentReferral");
		     query = new Parse.Query(User);
			 query.equalTo("gurumail", data);
			 
		   query.find({
				  success: function(data) {
					callback(data);
				  },
				  error: function(choirEnrolment, error) {
					  alert("Oops! something went wrong. Please try again. ");
				  }
			});
		
		},

		studentReomove: function(objId,callback){
			
		   var StudentDet = Parse.Object.extend("StudentReferral");
		       var query = new Parse.Query(StudentDet);
		       
		       query.get(objId,{
		          success: function(data) {
		             
		             data.destroy({});
		             //window.location="#/mydashboard";
		             window.location.reload();
		            //console.log(data);
		          //callback(data);
		          },
		          error: function(choirEnrolment, error) {
		            //$(".loadingcircle").hide();
		            alert("Oops! something went wrong. Please try again. ");
		          }
		      });
			
		}

	}
	
	return ParseService;
	
});