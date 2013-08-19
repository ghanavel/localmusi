app.controller("PostRegisterCntl",function($scope,$routeParams,MgModal,DataService){
    $scope.MgModal=MgModal;
    var currentUser;
    if(MgModal.isLogin)
    {
        var currentUser=DataService.getCurrentUser();
         if(!currentUser.get("emailVerified")){
            loadRegistrationlesions();
            $(".instructions").click(function(){
                loadRegistrationTrainingVideo(title,instuctionFile,notationFile, audioFile);
                $(".lessonTab").removeClass("selected").removeClass("unselected-no-border").addClass("unselected");
                $(".instructions").removeClass("unselected").addClass("selected");
                $("#recordDesc").hide(); 
            });
            $(".practice").click(function(){
                $("#recordIcon").hide();
                $("#videoDesc").show();

                loadRegistrationTrainingVideo(title,practiceFile,notationFile, audioFile);

                $("#store_icon").hide();
                $("#reviewIcon").hide();
                        
                $(".lessonTab").removeClass("selected").removeClass("unselected-no-border").addClass("unselected");
                $(".practice").removeClass("unselected").addClass("selected");
                $(".instructions").addClass("unselected-no-border");
                $("#recordDesc").hide();
            });
            $(".record").click(function(){
                loadRegistrationTrainingVideo(title,recordFile,notationFile, audioFile);
                 
                  $("#videoDesc").hide();
                  $("#recordDesc").show();
                  $("#store_icon").show();
                  $("#reviewIcon").hide();
                  $(".lessonTab").removeClass("selected").removeClass("unselected-no-border").addClass("unselected");
                  $(".record").removeClass("unselected").addClass("selected");
                  $(".practice").addClass("unselected-no-border");
                  $("#videoInsturctionsMsg").hide();
            });
            $(".review").click(function(){
                 $("#training_video").hide();
                  $("#reviewIcon").show();
                  $("#recordIcon").hide();
                  $("#videoDesc").hide();
                  $("#store_icon").show();
                  $(".lessonTab").removeClass("selected").removeClass("unselected-no-border").addClass("unselected");
                  $(".review").removeClass("unselected").addClass("selected");
                  $(".record").addClass("unselected-no-border");
                  $("#recordDesc").hide();
                  $("#videoInsturctionsMsg").hide();
            });
            $("#email_confirmed_content").show();
            $("#email_not_verified_content").hide();
         }else{
             $("#email_not_verified_content").show();
             $("#email_confirmed_content").hide();
         }
     }
     $scope.verifyMail=function(){
     
        DataService.verifyMail(function(results){
                $scope.$apply(function() {
                        console.log(results);
                        if(results.get("emailVerified"))
                        {
                            $("#email_confirmed_content").show();
                          $("#email_not_verified_content").hide();
                        }
                        else
                        {
                           $("#email_not_verified_content").show();
                          $("#email_confirmed_content").hide();
                          alert("Your email is not verified. Please try again.");
                        }
                        
                  });
            });
     
     }
     $scope.resendEmail=function(){
         DataService.resendEmail(currentUser,function(results){
                    
                });
     
     }
     DataService.getChoirEnrollmentByEmail(currentUser.get("email"),function(list){
                $scope.$apply(function() {
                $("."+g_currentLocation+"-notes").show();
                if(g_currentLocation == "sydney")
                {
                    $("#stepOneDiv").hide();
                    $("#stepTwoDiv").hide();
                }else{
                    $("#stepOneDiv").show();
                    $("#stepTwoDiv").show();
                }
                if(list[0])
                {
                   $scope.symphonyDetails = list[0];
                   var guruname = list[0].get("reg_guruname");
                   var guruemail = list[0].get("guruemail");
                   var fileurl = list[0].get("file_url");
                   var schoolName =  list[0].get("schoolName");
                   var learning_category = list[0].get("learning_category");
                   if(learning_category&&learning_category.length>0)
                   {
                    $('input[id=learning_category]:checkbox').each(function() {
                      var cat = learning_category.split(",");
                      for(var i=0;i<cat.length;i++)
                      {
                        if($(this).val()==cat[i])
                          $(this).attr("checked",true);
                      }
                                 
                    });
                   }
                   if(guruname&&guruname.length>0)
                   {
                      $("#enroll-guruname").val(guruname);
                      $("#enroll-guruname").attr("readonly","true");
                      $("#gurudetails").hide();
                   }
                   if(guruemail&&guruemail.length>0)
                   {
                      $("#enroll-guruemail").val(guruemail);
                      $("#enroll-guruemail").attr("readonly","true");
                   }
                   if(fileurl&&fileurl.length>0)
                   {
                      $("#fileurl").attr("href",fileurl);
                      $("#fileurl").show();  
                   }
                   if(schoolName)
                   {
                      $("#enroll-schoolname").val(schoolName);
                      $("#enroll-schoolname").attr("readonly","true");
                   }
                   

                }
                  });
            });
    $scope.postSongCategory = function()
    {
        var selectedCategory = "";
       $('input[id=learning_category]:checkbox:checked').each(function() {
            selectedCategory += $(this).val()+",";           
          });
       if(selectedCategory.length==0)
       {
        alert("Please select a category.");
        return;
       }
        DataService.getChoirEnrollmentByEmail(currentUser.get("email"),function(results){
                $scope.$apply(function() {
                        console.log(results);
                        if(results[0])
                        {
                            results[0].set("learning_category",selectedCategory);
                            DataService.saveChoirEnrollment(results[0],function(results){
                                $scope.$apply(function() {
                                         alert("Thank you for choosing the songs category.");
                                  });
                            });
                        
                        }
                  });
            });
    }
});

app.controller("RegisterCntl",function($scope,$routeParams,MgModal,DataService){
    
     $(".loadingcircle").hide();
    g_currentLocation = $routeParams.location;
    var currentUser=DataService.getCurrentUser();
    $scope.MgModal=MgModal;
    $scope.$watch('MgModal', function() { 
                    console.log("mgmodal"); 
                    if(MgModal.isLogin)
                    {
                        var currentUser=DataService.getCurrentUser();
                        setUserData(currentUser);
                        $scope.checkEnrollment();
                    }
                }, true);
    if(MgModal.isLogin)
    {
        setUserData(currentUser);
        $scope.checkEnrollment();
    }
    if(g_currentLocation == "sydney")
    {
        $("#participationDiv").hide();
        $("#gurudetails").hide();
        $("#participationDiv").hide();
        $("#trainedDiv").hide();
        $("#skillsDiv").hide();
    }else{
        $("#participationDiv").show();
        $("#gurudetails").show();
        $("#participationDiv").show();
        $("#trainedDiv").show();
        $("#skillsDiv").show();
    }
    $scope.checkEnrollment=function(){
    
        var currentUser=DataService.getCurrentUser();
            DataService.getChoirEnrollmentByEmail(currentUser.get("email"),function(results){
                $scope.$apply(function() {
                        console.log(results);
                        var flag=false;
                        if(results && results !=null)
                        {
                            for(var i=0;i<results.length;i++)
                            {
                                if(results[i].get("location") == g_currentLocation)
                               {
                                    flag=true;
                                    break;
                               }
                            }
                            if(flag)
                                window.location.href="#/postregister";
                            else
                             window.location.href="#/register/"+location;
                        }
                  });
            });
    
    
    }
    $scope.displayLoginbox=function()
    {
       showLogin();
    }
    $scope.buyBundle = function(){
        initiateBundlePurchase();
    }



    $scope.saveEnrollment=function()
    {
        var username = $("#enroll-username").val();
        var password = $("#enroll-password").val();
        var confPWd= $("#enroll-confpassword").val();
        var firstname = $("#enroll-firstname").val();
        var lastname = $("#enroll-lastname").val();
        var loc = g_currentLocation;
        var iama = "";
        var trainedIn = "";   
        var symphony_participate = $('input[name=symphony_participate]:radio:checked').val();

        $('input[name=iam]:checkbox:checked').each(function() {
            iama += $(this).val()+",";
               
          });
        $('input[name=trained]:checkbox:checked').each(function() {
            trainedIn += $(this).val()+",";
               
          });
          
            if( !(confPWd === password))
            {
                alert('Password and Confirm Password should be same');
                return;
            }

            else if(symphony_participate == "a_music_school")
            {
                if($("#enroll-guruname").val().length==0)
                {
                  alert("Please provide Guru's name");
                  $("#enroll-guruname").focus()
                  return;
                }
                else
                  if($("#enroll-guruemail").val().length==0)
                {
                  alert("Please provide Guru's email`");
                  $("#enroll-guruemail").focus()
                  return;
                }
            }
            var ChoirEnrolment = Parse.Object.extend("ChoirEnrolment");
            var choirEnrolment = new ChoirEnrolment();
            choirEnrolment.set("firstname", firstname);
            choirEnrolment.set("lastname", lastname);
            choirEnrolment.set("age", $("#enroll-age").val());
            choirEnrolment.set("phone",  $("#enroll-phone").val());
            choirEnrolment.set("address", $("#enroll-address").val());
            choirEnrolment.set("city", $("#enroll-city").val());
            choirEnrolment.set("location",loc)

            choirEnrolment.set("symphony_participate",symphony_participate);
            choirEnrolment.set("guruname", $("#enroll-guruname").val());
            choirEnrolment.set("guruemail",$("#enroll-guruemail").val());
            choirEnrolment.set("schoolName",$("#enroll-schoolname").val());


            choirEnrolment.set("desc", $("#enroll-desc").val());
            choirEnrolment.set("email", username);


            choirEnrolment.set("iam",iama);    
            choirEnrolment.set("instruments", $("#instuments").val());
            //choirEnrolment.set("trained_in",trained);
         if(MgModal.isLogin)
         {
            DataService.saveChoirEnrollment(choirEnrolment,function(results){
                $scope.$apply(function() {
                        console.log(results);
                        window.location.href="#/postregister";
                  });
            });
         }else{
            
            var userInfo={"firstname":firstname,"lastname":lastname}

       
            var user = new Parse.User();
            user.set("username", username);
            user.set("password", password);

            user.set("email", username);

            if( !(confPWd === password))
            {
                alert('Password and Confirm Password should be same');
                return;
            }
            DataService.signUp(user,userInfo,function (results) {
                  $scope.$apply(function() {
                        MgModal.isLogin=true;
                        DataService.saveChoirEnrollment(choirEnrolment,function(results){
                        $scope.$apply(function() {
                                console.log(results);
								cloud_unlock_all();
                                window.location.href="#/postregister";
                          });
                    });
                  });
            });
            
         }
    }
    
    
});
app.controller("SymphoneyHomeCntrl",function($scope,MgModal,DataService){
    $(".loadingcircle").hide();
    $scope.MgModal=MgModal;
    $scope.showClevelandVideo = function()
    {
        window.location.href="#/";
    }
  $scope.$watch('MgModal', function() { 
                    console.log("mgmodal"); 
                    if(MgModal.isLogin)
                    {
                        var currentUser=DataService.getCurrentUser();
                        DataService.getChoirEnrollmentByEmail(currentUser.get("email"),function(results){
                        $scope.$apply(function() {
                        console.log(results);
                        setViewLocations(results);
                        });
                        });
                    }
                }, true);
    if(MgModal.isLogin)
    {
        var currentUser=DataService.getCurrentUser();
      DataService.getChoirEnrollmentByEmail(currentUser.get("email"),function(results){
                    $scope.$apply(function() {
                            console.log(results);
                            setViewLocations(results);
                      });
                });
    }
    $scope.symphoneyHomeBtnClick=function(location){
      $(".loadingcircle").show();
      g_currentLocation=location;
      if(MgModal.isLogin)
      {
            var currentUser=DataService.getCurrentUser();
            DataService.getChoirEnrollmentByEmail(currentUser.get("email"),function(results){
                $scope.$apply(function() {
                        console.log(results);
                        var flag=false;
                        if(results && results !=null)
                        {
                            for(var i=0;i<results.length;i++)
                            {
                                if(results[i].get("location") == location)
                               {
                                    flag=true;
                                    break;
                               }
                            }
                            if(flag)
                                window.location.href="#/postregister";
                            else
                             window.location.href="#/register/"+location;
                        }
                  });
            });
        
        }else{
            window.location.href="#/register/"+location;
        }
    }
    $scope.showMore=function(location){
        showMore(location);
    }
    $scope.showLess=function(location){
        showLess(location);
    }
});
app.controller("Footerctrl",function($scope,MgModal){
    console.log("Footerctrl");
    $scope.privacyClick=function(){
        window.location="#/privacy";
    }
    $scope.termsClick=function(){
        window.location="#/terms";
    }

	$scope.goToTop=function()
	{
		window.scrollTo(0,0);
	}

});

/*

===============================================================================================================
===============================================================================================================
*/
app.controller("Homectrl",function($scope, DataService,MgModal){
    //console.log("Homectrl");
    currentUser = Parse.User.current();

    if(currentUser){
      window.location.href="#/mydashboard";
      return false;
    }
      
    $scope.loadExploreLibrary=function()
    {
      window.location.href="#/library";
    }        



  if(window.location.href.indexOf("scrollTo") == -1) // This doesn't work, any suggestions?
    {
      //alert("hai");
       currentUser = Parse.User.current();
      if(currentUser)
        window.location.href="#/mydashboard";
      else
        window.location.href="#/";
      
    }else{


      currentUser = Parse.User.current();
      if(currentUser)
      window.location.href="#/mydashboard";
      else
        $scope.loadExploreLibrary=function()
        {
          window.location.href="#/library";
        }



    }








     trackUserInteraction(window.location,"Home","View","");
     $scope.isIE=false;
    if(navigator.appName.indexOf("Microsoft Internet Explorer")>-1)
    {
      $scope.isIE=true;
    }
    $scope.$on( '$viewContentLoaded', function( event )
    {

      $('#social_get_placeholder').append($('.followusSocialInner').clone());

      (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/all.js#xfbml=1&appId=502779023065725";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");      
   
    });

   $(".slider").diyslider({
            width: "800px", // width of the slider
            height: "150px", // height of the slider
            display: 3, // number of slides you want it to display at once
            loop: false // disable looping on slides
        }); // this is all you need!
    $scope.MgModal=MgModal;
   $scope.newsLeftSliderClick=function()
    {
        $(".slider").diyslider("move", "back");
    }
    $scope.newsRightSliderClick=function()
    {
        $(".slider").diyslider("move", "forth");
    }
    $('#myGallery').galleryView({
                    filmstrip_position: 'left',
                    autoplay:true,
                    panel_width: 610,
                    panel_height: 375,
                    frame_width: 75,
                    panel_animation:"crossfade",
                    enable_overlays: true
                });
    
    /*$scope.getModules = function getModules () {
        DataService.getModulesWithoutID(function (results) {
              $scope.$apply(function() {
                    $scope.modules=results;
                    showLessonsLoader();
                    loadModulesData({modules:results, inventory: MgModal.user.library});
                    console.log(results);
                    
              });
        });
    };
    $scope.getModules();*/
     DataService.getModules(homeLibrary,function (results) {
              $scope.$apply(function() {
                    $scope.modules=results;
                    showLessonsLoader();
                    loadModulesData({modules:results, inventory: MgModal.user.library});
                    console.log(results);
              });
        });
    
    $scope.instructionClick=function(){
         instructionClick();
    }
    $scope.praticeClick=function(){
         praticeClick();
    }
    $scope.recordClick=function(){
         recordClick();
    }
    $scope.reviewClick=function(){
         reviewClick();
    }
    $scope.registrationClick=function(){
        window.location.href="#/introduction";
    }
    $scope.displaySignupbox=function(){
        MgModal.isDirect=false;
		$scope.MgModal=MgModal;
        showSingnup();
    
    }
    $scope.loadLessonBoard=function(url)
    {
      window.location.href="#/lessonboard/"+featurePacks[url].categoryId+"/"+featurePacks[url].moduleId+"/"+featurePacks[url].series;
    }




    /*
	 currentUser = Parse.User.current();
	if(currentUser)
		window.location.href="#/mydashboard";
	else
		window.location.href="#/";*/
    $scope.loadExploreLibrary=function()
      {
        window.location.href="#/library";
      }
      
	
});


/*

===============================================================================================================
===============================================================================================================
*/
app.controller("Appctrl",function($scope, $route, $routeParams, $location,MgModal,DataService,localStorageService){
    console.log("Appctrl");
    
    var currentUser=DataService.getCurrentUser();
    if(currentUser)
    {
        MgModal.title=MgModal.MUSIGURU;
        MgModal.isLogin=true;
        MgModal.user.lastVisited=localStorageService.get(currentUser.get("email"));
                    
    }else{
        MgModal.title=MgModal.MUSIGURU_SIGNUP;
        MgModal.isLogin=false;
    }
    
    $scope.MgModal=MgModal;
    
    
});


/*

===============================================================================================================
===============================================================================================================
*/
app.controller("Headerctrl",function($scope,DataService,MgModal,localStorageService){
    console.log("Headerctrl");
    $scope.MgModal=MgModal;
    console.log($scope.MgModal);
    var currentUser;
    $scope.loadExploreLibrary=function()
    {
        window.location.href="#/library";
    };


    $scope.displayLoginbox=function(){
        MgModal.isDirect=false;
		$scope.MgModal=MgModal;
        currentUser = Parse.User.current();
        showLogin();
	
	};
	$scope.displaySignupbox=function(){
		MgModal.isDirect=false;
		$scope.MgModal=MgModal;
		showSingnup();
	
	}
	$scope.logout=function(){
		var x;
		var r=confirm("Are you sure you want to signout?");
		if (r==true)
		  {
			  DataService.logOut(function () {
				  $scope.$apply(function() {
						$scope.MgModal.isLogin=false;
						MgModal.title=MgModal.MUSIGURU_SIGNUP;
						unloadLoginbox();
						console.log("success"+MgModal.name);
						window.location.href="#/";
						//location.reload();
				  });
				});
		  }
		
		
	};
	$scope.homeLogoClick=function(){
		currentUser = Parse.User.current();
		if(currentUser)
			window.location.href="#/mydashboard";
		else
			window.location.href="#/";
		//location.reload();
	
	}
	$scope.loadLessonBoard=function()
	{
		currentUser = Parse.User.current();
		if(localStorageService.get(currentUser.get("email")))
			window.location.href=localStorageService.get(currentUser.get("email"));
		else
			window.location.href="#/mydashboard";
	}
	$scope.loadExploreLibrary=function()
	{
		window.location.href="#/library";
	}
	

  if(MgModal.isLogin){
    currentUser = Parse.User.current();
    $scope.MgModal.user.username = currentUser.get("username");
    $scope.MgModal.user.firstname = currentUser.get("firstname");
    //$scope.MgModal.user.firstname = "abcdeeeeeeeeeeeeeeee";
  }
  
  



	
});


/*

===============================================================================================================
===============================================================================================================
*/
app.controller("Popupctrl",function($scope, $route, $routeParams, $location,DataService,MgModal,localStorageService){
    console.log("Popupctrl");
    $scope.unloadpopup=function(){
        unloadLoginbox();
    }
    $scope.MgModal=MgModal;
    $scope.callMGSignup=function()
    {
        var username = $("#mg-enroll-username").val();
        var password = $("#mg-enroll-password").val();
        var confPWd= $("#mg-enroll-confpassword").val();
        var firstname = $("#mg-enroll-firstname").val();
        var lastname = $("#mg-enroll-lastname").val();
        
        var userInfo={"firstname":firstname,"lastname":lastname}

       
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);

        user.set("email", username);

        if( !(confPWd === password))
        {
            alert('Password and Confirm Password should be same');
            return;
        }
        DataService.signUp(user,userInfo,function (results) {
              $scope.$apply(function() {
                    MgModal.title=MgModal.MUSIGURU;
                    $scope.MgModal.isLogin=true;
                    //MgModal.user.username = username;
                    $scope.MgModal.user.username = results.get("username");
                    $scope.MgModal.user.firstname = results.get("firstname");
                    $scope.MgModal=MgModal;                     
                    unloadLoginbox();
                    cloud_unlock_all();
					$scope.checkActivation();
                    console.log("success"+MgModal.name);
                    //window.location.href="#/mydashboard";
              });
        });
    }
    
    $scope.resetMGPassword=function resetMGPassword(){
        var username = $("#login-username").val();
        if( username.length ==0)
        {
            alert("Enter Email Address");
            return;
        }
        DataService.requestPasswordReset(username,function (results) {
              $scope.$apply(function() {
                    unloadLoginbox();
              });
        });
    
    }
    $scope.checkMGLogin=function()
    {  
        var username = $("#login-username").val();
        var password = $("#login-password").val();

        DataService.logIn(username,password,function (results) {
              $scope.$apply(function() {
                    MgModal.isLogin=true;
                    MgModal.title=MgModal.MUSIGURU;
                    console.log("results"+results) ;
                    MgModal.user.lastVisited=localStorageService.get(username);
                    $scope.MgModal.user.username = results.get("username");
                    $scope.MgModal.user.firstname = results.get("firstname");
                    $scope.MgModal=MgModal;                    
                   unloadLoginbox();
					         $scope.checkActivation();
                    //console.log("success");
					       //window.location.href="#/mydashboard/";
              });
        });
    }



    $scope.checkActivation=function()
  	{
  		if(MgModal.user.activationCode)
  	   {
          
  			DataService.getUserByActivationCode(MgModal.user.activationCode,function (referral) {
  							  $scope.$apply(function() {
  								   if(referral)
  									{
  										
  										DataService.getUserByEmail(Parse.User.current().get("email"),function (results) {
  											  $scope.$apply(function() {
												 results[0].set("studentOf",referral.get("gurumail"));
												  DataService.updateUser(results[0],function (data) {
  													  $scope.$apply(function() {
  															   if(data)
  																{
  																	MgModal.user.availDiscount=true;
  																}else{
  																	MgModal.user.availDiscount=false;
  																}
  																$scope.MgModal=MgModal;
  																window.location.href="#/mydashboard/";
  														  });
  													});
  											  });
  										});

  										
  									}else{
  										MgModal.user.availDiscount=false;
  									}
  									$scope.MgModal=MgModal;
  									window.location.href="#/mydashboard/";
  							  });
  						});
  		}else{
          
          var isPartnerSignupPage  = ($location.path().indexOf("partner-signup")  > 0) ? true : false;
          //alert(isPartnerSignupPage);
          MgModal.user.availDiscount=false;
          DataService.verifyMail(function(results){
                  $scope.$apply(function() {
                          if(!results.get("emailVerified") && isPartnerSignupPage)
                          {
                            window.location.href="#/partner-signup/";
                          }else{
                             window.location.href="#/mydashboard/"; 
                          }
                   
                          
                    });
          });

      }
  	
  	}
    
});


/*

===============================================================================================================
===============================================================================================================
*/
app.controller("Libraryctrl",function($scope,$route,DataService,MgModal){
    
    console.log("Libraryctrl");
    trackUserInteraction(window.location,"Library","View","");
    $scope.getCategories = function getCategories () {
        DataService.getCategories(function (results) {
              $scope.$apply(function() {
                    $scope.categories=results;
                    console.log("getCategories");
             });
        });
    };
    $scope.getCategories();
    $scope.onCateogyClick=function onCateogyClick(object)
    {
        console.log(object.get("modules"));
        DataService.getModules(object.get("modules"),function (results) {
              $scope.$apply(function() {
                    //MgModal.modules=results;
                    var sortedArr=[];
                      for(var i=0;i<object.get("modules").length;i++)
                      {
                            for(var j=0;j<results.length;j++)
                            {
                                if(results[j]["id"]==object.get("modules")[i])
                                {
                                    sortedArr.push(results[j]);
                                    break;
                                }
                            }
                      }
                    MgModal.modules=sortedArr;
                    MgModal.category=object;
                    location.href="#/modules/"+object.id;
              });
        });
    };
    $scope.loadLessonBoard=function(url)
    {
        window.location.href="#/lessonboard/"+featurePacks[url].categoryId+"/"+featurePacks[url].moduleId+"/"+featurePacks[url].series;
    }
    $scope.displayLoginbox=function(){
        if(!MgModal.isLogin)
        {
			MgModal.isDirect=false;
		    MgModal.isSubscribe=true;
			$scope.MgModal=MgModal;
            showLogin();
        }
    }
	$scope.displaySignupbox=function(){
		MgModal.isDirect=false;
		$scope.MgModal=MgModal;
		showSingnup();
	
	}

  $scope.ajaxloader = function(){
     showPagePreLoader("explore_loading_circle",1500);
  }

  $scope.ajaxloader();




});


/*

===============================================================================================================
===============================================================================================================
*/
app.controller("LessonBoardctrl",function($scope,$routeParams,DataService,MgModal,localStorageService){
    console.log("LessonBoardctrl"+$routeParams.moduleid);
    trackUserInteraction(window.location,"LessonBoard","View","");

    $scope.ajaxPageloader = function(){
        ajaxPageLoader()

    }
    var currentUser = DataService.getCurrentUser();
    //console.log(currentUser);
    //var currentUser = Parse.User.current();
    //console.log(currentUser);


    if(!currentUser){
        $scope.activateFlag = true;
    }else{
      DataService.getUserByEmail(currentUser.get("email"),function (results) {
              $scope.$apply(function() {
                if(currentUser && !results[0].get("emailVerified")){
                 $scope.activateFlag = false;
                }else{
                  $scope.activateFlag = true;
                }

                if( !$scope.activateFlag){
                    appendOverlayDiv();
                }
     
              });
      });


    }


    

   $scope.ajaxPageloader();
   
    var moduleid=$routeParams.moduleid;
    var serialno=$routeParams.serialno;
    var categoryId=$routeParams.categoryid;

    if(currentUser)
    localStorageService.add(currentUser.get("email"),"#/lessonboard/"+categoryId+"/"+moduleid+"/"+serialno);
    showLessonsLoader();
    $scope.MgModal=MgModal;
    $scope.getModuleByID=function()
    {
        
        DataService.getModuleByID(moduleid,function (results) {
                          $scope.$apply(function() {
                                MgModal.module=results;
                                $scope.MgModal=MgModal;
                                trackUserInteraction(window.location,"LessonBoard","View","#/lessonboard/"+moduleid+"--"+MgModal.module.get("Title"));
                          });
                    });
        
    }
    
    DataService.getCategoryById(categoryId,function (object) {
          $scope.$apply(function() {
                MgModal.category=object;
                $scope.MgModal=MgModal;
                console.log("getCategoryById:\t"+categoryId);
                $scope.getModuleByID();
         });
    });
        
      $scope.checkEmailVerification = function(){   
         DataService.getUserDetailByEmail(currentUser.get("email"),function(results){
            $scope.$apply(function() {
                var emailVerify = results[0].get("emailVerified");
                $scope.showFlag  = emailVerify;

                
            }); 
         });
      }

    if(currentUser){

       $scope.resendEmail=function(){
        DataService.resendEmail(currentUser,function(results){});
       }
      $scope.checkEmailVerification();
      $scope.activateAcc=function(){
           //alert("activat acc");         
            DataService.getUserDetailByEmail(currentUser.get("email"),function(results){
                      $scope.$apply(function() {
                               var emailVerify = results[0].get("emailVerified");
                               //alert(emailVerify);  
                               if(emailVerify){
                                  //window.location ="#/";
                                  $scope.showFlag  = emailVerify;
                                  window.location.reload();
                               }else{
                                 alert("You didn't complete the verification");
                               }

                    }); 
           });

      }
    }



      $scope.getLessons = function getLessons (moduleid) {
    	
    							

          async.series([
              function(async_done){
                  if(MgModal.user.libraryModuleIdHash && MgModal.user.libraryModuleIdHash.length>0){
                      async_done(null, MgModal.user.libraryModuleIdHash);
                  }else{
                     DataService.getInventoryByEmail(currentUser,function (results) {
                          var _hash={};
                          for(var i=0;i<results.length;i++)
                              _hash[results[i].get("collectionID")] = true;
                          MgModal.user.libraryModuleIdHash = _hash;
                          async_done(null, MgModal.user.libraryModuleIdHash);
                      });
                  }
              },
              function(async_done){
                  //var _isLocked = isModuleLocked(moduleid, MgModal.user.libraryModuleIdHash);
                  var _isLocked = (MgModal.isLogin)?false:true;
                  DataService.getLessons(moduleid,function (results) {
                        $scope.$apply(function() {
                              lessonsListObj = results;
                              loadLessonsList(results,serialno, _isLocked);
                       });
                  });
                  async_done(null, 'two');
              }
          ],
          // optional callback
          function(err, results){
              // results is now equal to ['one', 'two']
          });
          
      };
      $scope.getLessons(moduleid);
      
      $scope.instructionClick=function(){
           instructionClick();
      }
      $scope.praticeClick=function(){
           praticeClick();
      }
      $scope.recordClick=function(){
           recordClick();
      }
      $scope.reviewClick=function(){
           reviewClick();
      }
      $scope.displayLoginbox=function(){
          if(!MgModal.isLogin)
          {
              MgModal.isSubscribe=true;
    		$scope.MgModal=MgModal;
              showLogin();
          }
      }
      $scope.subscribe=function()
      {
          var currentUser=DataService.getCurrentUser();
          cloud_unlock_all(currentUser);
      }
      $scope.loadLibrary=function()
      {
          window.location="#/library";
      }
      $scope.loadModules=function()
      {
          window.location="#/modules/"+categoryId;
      }







      $scope.displaySignupbox=function(){
    	MgModal.isDirect=false;
    	$scope.MgModal=MgModal;
    	showSingnup();

    }
    });

/*

===============================================================================================================
===============================================================================================================
*/
app.controller("Modulesctrl",function($scope,$routeParams,DataService,MgModal){
	
	$scope.MgModal=MgModal;
	var categoryId=$routeParams.categoryId;
	
	DataService.getCategoryById(categoryId,function (object) {
			  $scope.$apply(function() {
					MgModal.category=object;
					console.log("getCategoryById:\t"+$scope.categoryId);
          trackUserInteraction(window.location,"Library","View","#/modules/"+categoryId + "=="+MgModal.category.get("name"));
					DataService.getModules(object.get("modules"),function (results) {
						  $scope.$apply(function() {
								//MgModal.modules=results;
								var sortedArr=[];
								  for(var i=0;i<object.get("modules").length;i++)
								  {
										for(var j=0;j<results.length;j++)
										{
											if(results[j]["id"]==object.get("modules")[i])
											{
												sortedArr.push(results[j]);
												break;
											}
										}
								  }
								MgModal.modules=sortedArr;
								MgModal.category=object;
								$scope.name=MgModal.category.get("name");
								$scope.price="$25";
								if($scope.name == "Carnatic Curriculum")
								{
									$scope.price="$35";
								}
								$scope.modules=MgModal.modules;
								console.log(object.get("modules"));
						  });
					});
			 });
		});
	
	$scope.getImageUrl=function(object)
	{
		/*if(object.get("BannerImage"))
		return ((object.get("BannerImage").url!= null |undefined|"")?object.get("BannerImage").url:"images/module_thumb.png");
		else*/
		return "images/module_thumb.png";
		
	};
	$scope.onModuleclick=function(object)
	{
		MgModal.module=object;
		console.log(object);
		window.location="#/lessonboard/"+categoryId+"/"+object["id"]+"/"+object.get("SeriesNumber");
	}
	$scope.loadLibrary=function()
	{
		window.location="#/library";
	}

  $scope.ajaxloader = function(){
     showPagePreLoader("modules_loading_circle",1500);
  }

  $scope.ajaxloader();



});


/*

===============================================================================================================
===============================================================================================================
*/
app.controller("Associatectrl",function($scope,$routeParams,DataService,MgModal){
    //co
    $scope.MgModal=MgModal;
    $scope.getAssociateByEmail=function(currentUser){
        
        DataService.getAssociateByEmail(currentUser.get("email"),function (results) {
                  $scope.$apply(function() {
                         $(".loadingcircle").hide();
                         if(results.length>0)
                            window.location.href="#/mydashboard";
                         else
                         {
                            if(currentUser.get("emailVerified")){
                              window.location.href = "#/partner-signup";  
                            }                            
                            setAssociateData(currentUser);
                        }
                            
                  });
            });
    
    }
    $scope.$watch('MgModal', function() { 
                    console.log("mgmodal"); 
                    if(MgModal.isLogin)
                    {
                        var currentUser=DataService.getCurrentUser();
                        $scope.getAssociateByEmail(currentUser);
                    }
                }, true);
    $scope.displayLoginbox=function(){
        showLogin();
    };
    
    if(MgModal.isLogin)
    {   

        var currentUser=DataService.getCurrentUser();
        $scope.getAssociateByEmail(currentUser);
    }
    
    $scope.callAssociateSignup=function(){
        
        var username = $("#enroll-username").val();
        var password = $("#enroll-password").val();
        var confPWd= $("#enroll-confpassword").val();
        var firstname = $("#enroll-firstname").val();
        var lastname = $("#enroll-lastname").val();
        var loc = $("#enroll-location").val();
        var iama = "";
        var trainedIn = "";   
        var symphony_participate="";
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);

        user.set("email", username);

        if( !(confPWd === password))
        {
            alert('Password and Confirm Password should be same');
            return;
        }
        var currentUser=DataService.getCurrentUser();
        if(currentUser)
        {
            DataService.getUserByEmail(currentUser.get("email"),function (results) {
									  $scope.$apply(function() {
											results[0].set("isAssociate", true);
											DataService.updateUser(results[0],function (data) {
																						  $scope.$apply(function() {
																							   $scope.saveAssociateEnrolment();
																						  });
																					});
											
									  });
								});
        }else{
            var user = new Parse.User();
            user.set("username", username);
            user.set("password", password);

            user.set("email", username);
			var username = $("#enroll-username").val();
      user.set("isAssociate", true);
			var userInfo={"firstname":firstname,"lastname":lastname}
            DataService.signUp(user,userInfo,function (results) {
                  $scope.$apply(function() {
                        $scope.MgModal.isLogin=true;
                        //$scope.MgModal.user.username = username;
                        $scope.MgModal.user.username = results.get("username");
                        $scope.MgModal.user.firstname = results.get("firstname");
                        $scope.MgModal=MgModal;                         
                        $scope.saveAssociateEnrolment();
                  });
            });
        }
    
    }
    $scope.saveAssociateEnrolment=function(){
        $(".loadingcircle").show();
       var AssociateEnrolment = Parse.Object.extend("Associate");
       var associateEnrolment = new AssociateEnrolment();
       
        var username = $("#enroll-username").val();
        var age = $("#enroll-age").val();
        var phone = $("#enroll-phone").val();
        var address = $("#enroll-address").val();
        var city = $("#enroll-city").val();
		var school=$("#schoolname").val();
       
        associateEnrolment.set("age", age);
        associateEnrolment.set("phone", phone);
        associateEnrolment.set("address", address);
        associateEnrolment.set("city", city);
        associateEnrolment.set("email", username);
		associateEnrolment.set("school", school);
        DataService.saveAssociate(associateEnrolment,function (results) {
                  $scope.$apply(function() {
                         $(".loadingcircle").hide();
                         window.location.href="#/mydashboard";
                  });
            });
    
    }
    

});

/*

===============================================================================================================
===============================================================================================================
*/
/*app.controller("PostAssociateRegisterCntl",function($scope,$routeParams,DataService,MgModal){
    
    $scope.MgModal=MgModal;
    $scope.getAssociateByEmail=function(currentUser){
        
        DataService.getAssociateByEmail(currentUser.get("email"),function (results) {
                  $scope.$apply(function() {
                         $(".loadingcircle").hide();
                         if(results.length>0)
                            window.location.href="#/post-partner-signup";
                         else
                         {
                            window.location.href = "#/partner-signup";
                            setAssociateData(currentUser);
                        }
                            
                  });
            });
    
    }
    $scope.$watch('MgModal', function() { 
                    console.log("mgmodal"); 
                    if(MgModal.isLogin)
                    {
                        var currentUser=DataService.getCurrentUser();
                        $scope.getAssociateByEmail(currentUser);
                    }
                }, true);
    var currentUser=DataService.getCurrentUser();
    if (currentUser) {
    
        $scope.getAssociateByEmail(currentUser);
    }
    else
    {
      window.location.href = "#/partner-signup";
    }
    
    $scope.sendOfferToStudent=function()
	{
		var data=new Object();
		data.name=$("#offerStudentName").val();
		data.email=$("#offerStudentEmail").val();
		data.gurumail=currentUser.get("email");
		 DataService.sendOfferToStudent(data,function (results) {
                  $scope.$apply(function() {
                         $(".loadingcircle").hide();
                         window.location.href="#/post-partner-signup";
                  });
            });
	}
});
*/
app.controller("PartnerCntl",function($scope,$routeParams,DataService,MgModal){
    $scope.carnoticSongs=carnoticSongs;
});




/*

===============================================================================================================
===============================================================================================================
*/

app.controller("PostLoginCntl",function($scope,$routeParams,DataService,MgModal,localStorageService){
	var currentUser = Parse.User.current();
  console.log(currentUser);

  //alert(currentUser);
  if(!currentUser){
    window.location.href="#/";
    return false;
  }
    

  //console.log("emailVerified: "+currentUser.get("emailVerified"));

  $scope.hasData=true;
  $scope.hasStudents=true;
  
  $scope.checkEmailVerification = function(){   
      DataService.getUserDetailByEmail(currentUser.get("email"),function(results){
            $scope.$apply(function() {
              //console.log(results);
                var emailVerify = results[0].get("emailVerified");
                $scope.showFlag  = emailVerify;

                
            }); 
      });
  }

  $scope.checkEmailVerification();
  
  $scope.activateAcc=function(){
       //alert("activat acc");         
        DataService.getUserDetailByEmail(currentUser.get("email"),function(results){
                  $scope.$apply(function() {
                           var emailVerify = results[0].get("emailVerified");
                           //alert(emailVerify);  
                           if(emailVerify){
                              //window.location ="#/";
                              $scope.showFlag  = emailVerify;
                              //window.location.reload();
                                window.location ="#/mydashboard";

                           }else{
                              alert("You didn't complete the verification");
                           }

                }); 
       });

  }

 //var currentUserDet = DataService.getCurrentUser();
 //console.log(currentUserDet);
 //console.log(currentUser);
     
  $scope.resendEmail=function(){
       DataService.resendEmail(currentUser,function(results){
                  
              });
   
  }
  
  //console.log(currentUser.get("emailVerified"));

	if(!currentUser)
		window.location.href="#/";
	$scope.MgModal=MgModal;
  //$scope.myname="ghana";
	
	$scope.loadLessonBoard=function(url)
	{
	
		window.location.href="#/lessonboard/"+featurePacks[url].categoryId+"/"+featurePacks[url].moduleId+"/"+featurePacks[url].series;
	}
	var currentUser=DataService.getCurrentUser();

  setTimeout(function(){
      DataService.getInventoryByEmail(currentUser,function (results) {
        $scope.$apply(function() {
                 $(".loading_circle").hide();
                var modules=[];
                 for(var i=0;i<results.length;i++)
                  modules.push(results[i].get("collectionID"));
					 if(modules.length>0)
					 {
						  $scope.hasData=true;
						  DataService.getModules(modules,function (results) {
											$scope.$apply(function() {
											  MgModal.user.library=results;
											  $scope.MgModal=MgModal;
											  $scope.checkActivation();
											});

										});
					}else{
						$scope.hasData=false;
					 }

                });
      });
  },4000);
	
	
	$scope.getImageUrl=function(object)
	{
		/*if(object.get("BannerImage"))
		return ((object.get("BannerImage").url!= null |undefined|"")?object.get("BannerImage").url:"images/module_thumb.png");
		else*/
		return "images/module_thumb.png";
		
	}
	$scope.onModuleclick=function(object)
	{
		MgModal.module=object;
		console.log(object);
		window.location="#/mylessonboard/"+object["id"]+"/"+object.get("SeriesNumber");
	}
	$scope.loadLibrary=function()
    {
        window.location="#/library";
    }

  $scope.ajaxloader = function(){
     showPagePreLoader("postlgn_library_loading_circle",5000);
  }

 
	 $scope.checkActivation=function()
		{
			
				 $scope.getUserByEmail();
			
		
		}
	
	  $scope.getUserByEmail=function()
	  {
			DataService.getUserByEmail(currentUser.get("email"),function (results) {
									  $scope.$apply(function() {
											$scope.isAssociate=false;
											if(results[0].get("studentOf"))
											{
												MgModal.user.availDiscount=true;
											}else{
												MgModal.user.availDiscount=false;
											}
											if(results[0].get("isAssociate"))
											{

												$scope.isAssociate=true;

                        /*
												DataService.getStudentsByGuru(currentUser.get("email"),function (data) {
													  $scope.$apply(function() {
															console.log(data);
															if(data.length>0)
															{
																$scope.students=data;
                                //console.log($scope.students.length);
																$scope.hasStudents=true;

                                var pagesShown = 1;
                                var pageSize = 2;
                                                                
                                $scope.itemsLimit = function() {
                                    return pageSize * pagesShown;
                                };

           
                                 $scope.showMoreItems = function() {
                                      event.preventDefault();
                                      pagesShown = pagesShown + 1;         
                                 };
 
                                  $scope.hasMoreItemsToShow = function() {
                                      
                                      return pagesShown < ($scope.students.length / pageSize);
                                  };
                              }else{
																$scope.hasStudents=false;
															}


                           


															
													  });
												});
                        */


                        DataService.getAllStudentsByGuru(currentUser.get("email"),function (data) {
                            $scope.$apply(function() {
                              console.log(data);
                              if(data.length>0)
                              {
                                $scope.students=data;
                                var pagesShown = 1;
                                var pageSize = 5;

                                $scope.noOfPages = Math.ceil($scope.students.length / pageSize);
                                console.log($scope.noOfPages);
                                $scope.currentPage = 1;
                                
                                $scope.setPage = function () {
                                    studentInput = {
                                      guruEmail:currentUser.get("email"),
                                      limit:pageSize,
                                      skip:($scope.currentPage - 1) * pageSize
                                    };
                                    DataService.getStudentsByGuru(studentInput,function (data) {
                                        $scope.$apply(function() {
                                          //alert(studentInput.skip);
                                          //alert(data);
                                          $scope.studentData = data;
                                          if($scope.hasStudents && $scope.students.length > pageSize){
                                              $scope.showpagination = true;
                                          }else{
                                             $scope.showpagination = false;
                                          }
                                          console.log($scope.showpagination)
                                        });
                                    });
                                };

                                $scope.$watch( 'currentPage', $scope.setPage );
                              
                                  
                              }else{
                                $scope.hasStudents=false;
                              }


             

                              
                            });
                        });



											}
											$scope.MgModal=MgModal;
											
									  });
								});
	  
	  }
	   $scope.getAssociateByEmail=function(currentUser){
        
        DataService.getAssociateByEmail(currentUser.get("email"),function (results) {
                  $scope.$apply(function() {
                         $(".loadingcircle").hide();
                         if(results.length>0)
                            window.location.href="#/mydashboard";
                         
                            
                  });
            });
    
    }
	 $scope.getUserByEmail();
	  $scope.$watch('MgModal', function() { 
                    console.log("mgmodal"); 
                    if(MgModal.isLogin)
                    {
                        var currentUser=DataService.getCurrentUser();
                        $scope.getAssociateByEmail(currentUser);
                    }
                }, true);
	 $scope.sendOfferToStudent=function()
	{
		var data=new Object();
		data.name=$("#offerStudentName").val();
		data.email=$("#offerStudentEmail").val();
		data.desc=$("#offerStudentDesc").val();
		data.gurumail=currentUser.get("email");
		 DataService.sendOfferToStudent(data,function (results) {
                  $scope.$apply(function() {
                         $(".loadingcircle").hide();
                         window.location.reload();
                  });
            });
	}
	 $scope.ajaxloader();


  $scope.studentReomove = function(objId){
    var x;
    var r=confirm("Are you sure you want to signout?");
    if (r==true)
      { 
        //DataService.studentReomove(objId,function (results) { });
      }
  }
   

});



/*

===============================================================================================================
===============================================================================================================
*/
app.controller("MyLesonboardCntl",function($scope,$routeParams,DataService,MgModal,localStorageService){
	
	$scope.MgModal=MgModal;
	var moduleid=$routeParams.moduleid;
	var serialno=$routeParams.serialno;
	var currentUser = Parse.User.current();

  console.log("cur: "+currentUser);
	if(currentUser)
	localStorageService.add(currentUser.get("email"),"#/mylessonboard/"+moduleid+"/"+serialno);
  
  async.series([
      function(async_done){
          if(MgModal.user.libraryModuleIdHash && MgModal.user.libraryModuleIdHash.length>0){
              async_done(null, MgModal.user.libraryModuleIdHash);
          }else{
              DataService.getInventoryByEmail(currentUser,function (results) {
                  var _hash={};
                  for(var i=0;i<results.length;i++)
                      _hash[results[i].get("collectionID")] = true;
                  MgModal.user.libraryModuleIdHash = _hash;
                  async_done(null, MgModal.user.libraryModuleIdHash);
              });
          }
      },
      function(async_done){
          //var _isLocked = isModuleLocked(moduleid, MgModal.user.libraryModuleIdHash);
          var _isLocked = (MgModal.isLogin)?false:true;
          DataService.getLessons(moduleid,function (results) {
                $scope.$apply(function() {
                      lessonsListObj = results;
                      loadLessonsList(results,serialno, _isLocked);
               });
          });
          async_done(null, 'two');
      }
  ],
  // optional callback
  function(err, results){
      // results is now equal to ['one', 'two']
  });


   DataService.getModuleByID(moduleid,function (results) {
                          $scope.$apply(function() {
                                MgModal.module=results;
                                $scope.MgModal=MgModal;
                                trackUserInteraction(window.location,"LessonBoard","View","#/mylessonboard/"+moduleid+"--"+MgModal.module.get("Title"));
                          });
                    });



	$scope.instructionClick=function(){
	 instructionClick();
	}
	$scope.praticeClick=function(){
		 praticeClick();
	}
	$scope.recordClick=function(){
		 recordClick();
	}
	$scope.reviewClick=function(){
		 reviewClick();
	}
	$scope.displayLoginbox=function(){
		if(!MgModal.isLogin)
		{
			MgModal.isSubscribe=true;
			showLogin();
		}
	}
	$scope.loadMyLibrary=function()
	{
		window.location="#/mydashboard";
	}
	

});
/*
======================================================================================================================
======================================================================================================================
*/
app.controller("StudentActivateCntl",function($scope,$routeParams,DataService,MgModal){
	MgModal.isDirect=true;
	MgModal.user.activationCode=$routeParams.activatationcode;
	$scope.MgModal=MgModal;
	
	var currentUser = Parse.User.current();
	if(currentUser)
	{
		DataService.getUserByActivationCode(MgModal.user.activationCode,function (referral) {
								  $scope.$apply(function() {
									   if(referral && referral.get("email")==currentUser.get("email"))
										{
											
												DataService.getUserByEmail(currentUser.get("email"),function (results) {
												  $scope.$apply(function() {
													 results[0].set("studentOf",referral.get("gurumail"));
													  DataService.updateUser(results[0],function (data) {
														  $scope.$apply(function() {
																   if(data)
																	{
																		MgModal.user.availDiscount=true;
																	}else{
																		MgModal.user.availDiscount=false;
																	}
																	$scope.MgModal=MgModal;
																	window.location.href="#/mydashboard/";
															  });
														});
												  });
											});
	
										}else{
											showSingnup();
										}
									
								  });
							});
	}else{
		showSingnup();
	}
	
});
app.controller("AssociateTermsctrl",function($scope,$routeParams,DataService,MgModal){

});

