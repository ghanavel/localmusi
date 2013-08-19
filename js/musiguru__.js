var app=angular.module('app',['LocalStorageModule']);

function getEnv(){
  var baseUrl = location.hostname;
  var env = {isProduction:false,isStaging:false, isDebug:false, isLocal:false};

  if(baseUrl.indexOf("musiguru-stg.herokuapp.com") > -1){
    env.isStaging = true;
  }else if (baseUrl.indexOf("musiguru.in") > -1){
    env.isProduction = true;
  }else if (baseUrl.indexOf("182.71") > -1){
    env.isDebug = true;
  }else{
    env.isLocal = true;
  }
  return env;
}

var env = getEnv();    
var parse_app_id;
var parse_app_js_key;
var parse_app_rest_key;

var featurePacks=[];
var homeLibrary;
    //PRODUCTION
    
if(env.isProduction){
	parse_app_id = "QHPmDhoFnKv8v4jY9RyQTHXkwg8Uv0NzY2cZlqZK";
	parse_app_js_key = "BqjbwZJxgRexcwCdZajpmajv3c462VsJtIiyJ8mi";
	parse_app_rest_key = "mrG6xta0a6Q4bqcD36DrHapdpLHZWSCKT1otGoXO"

	featurePacks.push({name:"Assorted Krithis",series:"100",categoryId:"0S8tif8hNh",moduleId:"efED6kJjX0"});
	featurePacks.push({name:"Basic Level 2",series:"200",categoryId:"1YGtUVdRR9",moduleId:"iNZQVGUb1O"});
	featurePacks.push({name:"Basic Level 3",series:"300",categoryId:"1YGtUVdRR9",moduleId:"rLtxxgKQQ3"});
	homeLibrary=["efED6kJjX0","bGGcLFl2HG","ZSe2z0P6bK","iNZQVGUb1O","rLtxxgKQQ3"];
}else{
	parse_app_id = "s1Cml2EY2yuUNg318MvDZSpMg3fipKKD5AmsgwCc";
	parse_app_js_key =  "fybbAFwWKbQDWr0dIcWzr7yWIKtYJGuRryCsIx8R";
	parse_app_rest_key = "4ed5RlspSDEeLV84CJjMLFyBUJWzThQ2S7pDY8Aj";

	featurePacks.push({name:"Assorted Krithis",series:"100",categoryId:"0S8tif8hNh",moduleId:"bGGcLFl2HG"});
	featurePacks.push({name:"Basic Level 2",series:"200",categoryId:"fJ6mwDkprI",moduleId:"4k9lLcpXpw"});
	featurePacks.push({name:"Basic Level 3",series:"300",categoryId:"fJ6mwDkprI",moduleId:"NtRKMMCSiz"});
	homeLibrary=["bGGcLFl2HG","4k9lLcpXpw","NtRKMMCSiz","hbPJMrTXKZ","h1IoaPsGCG"];

}
Parse.initialize(parse_app_id, parse_app_js_key);



var Collections;
var currentIndex = 0;
var loaderDelay = 1000;
var price = 0;
var desc = "";
var lessonsListObj;
var title="";
var audioFile="";
var notationFile="";
var instuctionFile="";
var parcticeFile="";
var instructionFile="";
var recordFile="";
var g_currentLocation;
var trainingTitle;
var trainingUrl;
var practiceUrl;
var g_isModuleLocked=true;

var carnoticSongs=[
{
	"title":"Category 1: 01 - Vara leela gana",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/01 - Vara leela gana lola.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/01 - Vara leela gana lola.pdf",
	"instuctionFile":"http://www.youtube.com/embed/s4_UrzrKLJI?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/NTNrWYuZ77U?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/NTNrWYuZ77U?wmode=opaque"
},
{
	"title":"Category 1: 02 - Saarasa netra",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/02 - Saarasa Netra.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/02 - Saarasa Netra.pdf",
	"instuctionFile":"http://www.youtube.com/embed/RSuptLHRCrY?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/D90eS8TQRGw?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/ZTlr6gDTpqs?wmode=opaque"

},
{
	"title":"Category 1: 03 - Guru murthe",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/03 - Gurumoorthe.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/03 - Gurumoorte.pdf",
	"instuctionFile":"http://www.youtube.com/embed/MNE2qNMuR68?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/LbMMMDrQbXc?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/BY21UktCjKY?wmode=opaque"
},
{
	"title":"Category 1: 04 - Vande meenakshi tvam",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/04 - Vande Meenakshitvam.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/04 - Vande Meenakshitvam.pdf",
	"instuctionFile":"http://www.youtube.com/embed/0u-xDDVdUPU?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/GSvDxFTnpeQ?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/RJXLdBiE5dg?wmode=opaque"
},
{
	"title":"Category 1: 05 - Giridhara mamava",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/05 - Giridhara Maamava.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/05 - Giridhara Maamava.pdf",
	"instuctionFile":"http://www.youtube.com/embed/6OCJiPMtELo?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/DuwFQ-_K0eI?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/UfAvUx_nCQk?wmode=opaque"
},
{
	"title":"Category 1: 06 - Shakti Sagitha Ganapathim",
	"audioFile":"",
	"notationFile":"",
	"instuctionFile":"",
	"practiceFile":"",
	"recordFile":""
},
{
	"title":"Category 2: 01 - Giri raja (Part 1)",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/06 - Giri raja suta.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/06 - Giri raja suta.pdf",
	"instuctionFile":"http://www.youtube.com/embed/Z0WfJKFqCxo?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/Z0WfJKFqCxo?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/Z0WfJKFqCxo?wmode=opaque"
},
{
	"title":"Category 2: 01 - Giri raja (Part 2)",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/06 - Giri raja suta.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/06 - Giri raja suta.pdf",
	"instuctionFile":"http://www.youtube.com/embed/u7MwCZLnmLk?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/u7MwCZLnmLk?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/u7MwCZLnmLk?wmode=opaque"
},
{
	"title":"Category 2: 02 - Dandamu pettenura",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/08 - Dhandamu pettenura.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/08 - Dhandamu pettenura.pdf",
	"instuctionFile":"http://www.youtube.com/embed/lep9r0jL8Mc?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/E6AwlcctG_4?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/BMNlSjdy4V8?wmode=opaque"
},

{
	"title":"Category 2: 03 - Jayathi jayathi",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/10 - Jayathi jayathi.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/10 - Jayathi Jayathi.pdf",
	"instuctionFile":"http://www.youtube.com/embed/9x9QmDfgxqM?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/7eqIS49Dsww?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/7eqIS49Dsww?wmode=opaque"
},

{
	"title":"Category 2: 04 - Bhaagyada",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/12 - Bhaagyadalakshmi.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/12 - Bhaagyadalakshmi.pdf",
	"instuctionFile":"http://www.youtube.com/embed/d1BxDmApIT4?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/d1BxDmApIT4?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/d1BxDmApIT4?wmode=opaque"
},
{
	"title":"Category 2: 05 - Shambho gangaadhara",
	"audioFile":"http://musiguru.s3.amazonaws.com/symphony/07 - Shambho gangaadhara.mp3",
	"notationFile":"http://musiguru.s3.amazonaws.com/symphony/07 - Shambho gangaadhara.pdf",
	"instuctionFile":"http://www.youtube.com/embed/XSis79QKzqU?wmode=opaque",
	"practiceFile":"http://www.youtube.com/embed/MmbLzyNkSro?wmode=opaque",
	"recordFile":"http://www.youtube.com/embed/3CkYNLsDtKk?wmode=opaque"
},
{
	"title":"Category 2: 06 - We are the world",
	"audioFile":"",
	"notationFile":"",
	"instuctionFile":"",
	"practiceFile":"",
	"recordFile":""
},
];

	

if(navigator.userAgent.indexOf("MSIE")>-1&&window.location.protocol != "https:")
{
	var oldURL = window.location.hostname + window.location.pathname;
	var newURL = "https://" + oldURL;
	window.location = newURL;
}

function loadRegistrationlesions()
{
	
	for(var i=0;i<carnoticSongs.length;i++)
	{
		generateRegistrationlesions(i); 
	}

	window.setTimeout(function() { 
		hideListLoader();
	}, loaderDelay);
}
function generateRegistrationlesions(index)
{
	var chapterTemplate = $(".chapterTemplate").clone();
	chapterTemplate.removeClass("chapterTemplate").show();
	chapterTemplate.find(".chapterContainer").css("display","inline");
	chapterTemplate.find("#lessionId").text(index+1);
	chapterTemplate.find("#lessionTitle").text(carnoticSongs[index].title);
	if(index==0)
	{
		getRegistrationTrainingVideo(0);
	}
	chapterTemplate.click(function(){
		getRegistrationTrainingVideo(index);
	});
	chapterTemplate.find(".chapterContainer").attr("id","lesson_"+index);
	$("#chapters").append(chapterTemplate); 
}
function getRegistrationTrainingVideo(index)
{
	$(".chapterContainer").removeClass("selected-lession-list").addClass("unselected-lession-list");
	$("#lesson_"+index).addClass("selected-lession-list");
	showVideoLoader();
	currentIndex = index;
	title=carnoticSongs[index].title;
	audioFile=carnoticSongs[index].audioFile;
	notationFile=carnoticSongs[index].notationFile;
	instuctionFile=carnoticSongs[index].instuctionFile;
	practiceFile=carnoticSongs[index].practiceFile;
	recordFile=carnoticSongs[index].recordFile;

	$("#audioFile").attr("href",audioFile);
	$("#notationFile").attr("href",notationFile);
	if(notationFile=="")
	{
		$("#videoDesc").hide(); 
	}

	loadRegistrationTrainingVideo(title,instuctionFile,notationFile, audioFile);

}
function loadRegistrationTrainingVideo(title,file,notationFile, audioFile)
{
	$("#recordIcon").hide();

	$("#training_video").show();
	$("#videoDesc").show();
	$("#reviewIcon").hide();
	$("#store_icon").hide();
	$("#audioFile").show();
	$("#videoInsturctionsMsg").hide();

	if(file != "")
	{
		$("#training_video").attr("src", file);
		$("#audioFile").hide();
	}
	else if(file == "" && audioFile == "")
	{
		$("#training_video").hide();
		$("#audioFile").hide();
		$("#videoDesc").hide(); 
		$("#videoInsturctionsMsg").text("Coming soon");
		$("#videoInsturctionsMsg").show();
	}
	else
	{
		$("#training_video").hide();
		$("#videoInsturctionsMsg").text("Video instructions will be available shortly");
		$("#videoInsturctionsMsg").show();

	}
	$("#training_title").text(title);     

	$(".lessonTab").removeClass("selected").addClass("unselected");
	$(".instructions").removeClass("unselected").addClass("selected");
	window.setTimeout(function() { 
		hideVideoLoader();
	}, loaderDelay);  
}


function setUserData(user)
{
	var username = user.get("email");
	var firstname = user.get("firstname");
	var lastname = user.get("lastname");

	$("#enroll-username").val(username);

	$("#enroll-firstname").val(firstname);
	$("#enroll-lastname").val(lastname);

	$("#enroll-username").attr("readonly","readonly");
	$("#enroll-username").attr("readonly","readonly");
	if(firstname&&firstname.length>0)
		$("#enroll-firstname").attr("readonly","readonly");
	if(lastname&&lastname.length>0)
		$("#enroll-lastname").attr("readonly","readonly");                
	$("#enroll-password").removeAttr("required");
	$("#enroll-confpassword").removeAttr("required");
	$("#password-box").hide();
}

function setViewLocations(results)
{

	if(results && results !=null)
	{
		for(var i=0;i<results.length;i++)
		{
			var loc = "loc4";
			if(results[i].get("location"))
			{
				loc = results[i].get("location");
			}
			$("."+loc+" .btnregister").attr("value","View Details");
			
		}
	}

}

function showLogin()
{
	$(".popupBoxLeft").hide();
	$(".popupBoxRight").show();
	resetValues();

}
function showSingnup()
{
	$(".popupBoxLeft").show();
	$(".popupBoxRight").hide();
	resetValues();
}
function resetValues()
{
	$("#mg-enroll-username").val("");
	$("#mg-enroll-password").val("");
	$("#mg-enroll-confpassword").val("");
	$("#mg-enroll-firstname").val("");
	$("#mg-enroll-lastname").val("");
	$("#login-username").val("");
	$("#login-password").val("");
}
function unloadLoginbox(){
	$('#home_popup_box').fadeOut("slow");
	$("#container").fadeOut("slow");
}
function loadModulesData(databundle)
{

	var modules = databundle.modules;


	for(var i=0;i<modules.length;i++)
	{
		
			var bannerImg = ((modules[i].get("BannerImage"))?modules[i].get("BannerImage").url:"images/musiguru_module_banner.png");
			var title= modules[i].get("Title");
			var guruImg=((modules[i].get("Author").get("ProfilePhoto"))?modules[i].get("Author").get("ProfilePhoto").url:"images/guru_img.png");
			/*if(modules[i].get("Author").get("ProfilePhoto")&& modules[i].get("Author").get("ProfilePhoto").url)
				guruImg = modules[i].get("Author").get("ProfilePhoto").url;*/
			var guruName = modules[i].get("Author").get("Name");
			var seriesNum = modules[i].get("SeriesNumber");
			if(i==0)
			{
				generateModulesHtml(bannerImg, title, guruImg, guruName,modules[i].id, seriesNum, true);					
				getLessonDetails(modules[i].id, seriesNum);
			}
			else
			{
				generateModulesHtml(bannerImg, title, guruImg, guruName,modules[i].id, seriesNum, false);					
			}
						
	}
	window.setTimeout(function() { 
		hideLessonsLoader();
	}, loaderDelay);



}

function generateModulesHtml(bannerImg, title, guruImg, guruName,id, seriesNum, isSelected)
{
	var moduleHtml = $(".moduleTemplate").clone();
	moduleHtml.removeClass("moduleTemplate").show();
	moduleHtml.find("#banner").attr("src", bannerImg);
	moduleHtml.find("#title").text(title);
	moduleHtml.find("#guru_img").attr("src", guruImg);
	moduleHtml.find("#guru_name").text(guruName);
	moduleHtml.click(function(){
		$(".Lesson-Content-Container").removeClass("module-selected").addClass("module-unselected");
		$(this).removeClass("module-unselected").addClass("module-selected");
		console.log("Module ID=====>"+id);
		getLessonDetails(id, seriesNum);
	});
	if(isSelected)
	{
		//$(".Lesson-Content-Container").removeClass("module-selected").addClass("module-unselected");
		moduleHtml.removeClass("module-unselected").addClass("module-selected");
	}
	$("#module_content").append(moduleHtml);
}

function getLessonDetails(id, seriesNum)
{
	showListLoader();
	var Lessons = Parse.Object.extend("Lessons");
	var query = new Parse.Query(Lessons);
	var Collections = Parse.Object.extend("Collections");
	var collec = new  Collections();
	collec.id = id;
	query.equalTo("pCollection", collec);
	query.ascending("SeriesOffset");
	query.find({
		success: function(object) {
			lessonsListObj = object;		  
			loadLessonsList(object, seriesNum);
		},
		error: function(error) {
		//alert("Error: " + error.code + " " + error.message);
		}
	});
}


function parseObjectArrayHash(arr){
	var hash={};
	for (var i = arr.length - 1; i >= 0; i--) {
		hash[arr[i].id] = true;
	};
	return hash;
}


function isModuleLocked(moduleid, pO_user_invetory){

	if(pO_user_invetory[moduleid]){
		return false;
	}
	return true;
}


/*
	render the given lessons to the lesson board
*/

function loadLessonsList(pO_LessonList, seriesNum, _isModuleLocked)
{
	g_isModuleLocked = _isModuleLocked;

	var object = pO_LessonList; //parse object list of lessons in module

	$("#chapters").empty();
	//showLessonsLoader();
	for(var i=0; i<object.length; i++)
	{
		var seriesOff = object[i].get("SeriesOffset");
		var counter=i;
		var lessonNum=parseInt(seriesNum)+counter+1;
		/*var lessonNum = seriesOff*1+seriesNum*1;
		if(lessonNum<10)
		{
			lessonNum = "00"+lessonNum;
		}
		else if(lessonNum>9&&lessonNum<20)
		{
			lessonNum = "0"+lessonNum;
		}*/
		var name = object[i].get("name");
		renderLessonInList(lessonNum, name, i, _isModuleLocked);
		if(i==0)
		{
			getTrainingVideo(0, _isModuleLocked);
		}
	}			
	window.setTimeout(function() { 
		hideListLoader();
	}, loaderDelay);


}



function renderLessonInList(lessonNum, lessonTitle, index, _isModuleLocked)
{

		var chapterTemplate = $(".chapterTemplate").clone();
		chapterTemplate.removeClass("chapterTemplate").show();
		//chapterTemplate.find(".chapterContainer").css("display","inline");

		//chapterTemplate.find("#lessionId").attr("id","lesson_"+index);
		chapterTemplate.find("#lessionId").text(lessonNum);
		chapterTemplate.find("#lessionTitle").text(lessonTitle);
		chapterTemplate.click(function(){
			getTrainingVideo(index, _isModuleLocked);
		});
		chapterTemplate.find(".chapterContainer").attr("id","lesson_"+index);
		$("#chapters").append(chapterTemplate);		
}


/*

	getTrainingVideo(index)
	index= index position of the lesson in the module

	Sets up the UI to show the training video on the LessonBoard.
	Generally invoked when the user taps/clicks on a lesson in the lesson list.
*/


function getTrainingVideo(index, _isModuleLocked)
{
	$(".chapterContainer").removeClass("selected-lession-list").addClass("unselected-lession-list");
	$("#lesson_"+index).addClass("selected-lession-list");
	showVideoLoader();
	currentIndex = index;
	price = lessonsListObj[index].get("price");
	desc = lessonsListObj[index].get("description");
	//price = 0; //ADITYA_DEBUG
	console.log("price != 0 && _isModuleLocked="+(price != 0 && _isModuleLocked));
	if(price != 0 && _isModuleLocked) // check if this module is purchased or not!
	{
		loadTrainingVideo(null, null, desc, price, g_isModuleLocked);
	}
	else
	{
		trainingTitle = lessonsListObj[index].get("training_text");
		trainingUrl = lessonsListObj[index].get("training_url");
		practiceUrl = lessonsListObj[index].get("url");

		loadTrainingVideo(trainingTitle, trainingUrl, desc,price, _isModuleLocked);
	}

}


/*

	loadTrainingVideo(trainingTitle, trainingUrl, desc, price)
	index= index position of the lesson in the module
	
	Renders the video player and given the url 
	and displays the related meta data for the user
*/

function loadTrainingVideo(trainingTitle, trainingUrl, desc, price, _isModuleLocked)
{
	$("#recordIcon").hide();
	//$("#training_title").show();
	console.log("price != 0 && _isModuleLocked="+(price != 0 && _isModuleLocked));
	if(price!=0 && g_isModuleLocked)
	{
		$("#videoDesc").html( desc + "<br/><br/>Sign up to get a two week free trial!");			
		$("#training_video").hide();
		$("#flow_training_video").hide();
		$("#videoDesc").show();
		$("#reviewIcon").show();
		$("#store_icon").show();
	}
	else
	{			
		$("#training_video").show();
		$("#videoDesc").show();
		$("#reviewIcon").hide();
		$("#store_icon").hide();
		if(trainingUrl.indexOf("cloudfront.net") == -1)
		{
			var youtubeUrl = generateYoutubeUrl(trainingUrl);
			$("#training_video").attr("src", youtubeUrl);
			$("#flow_training_video").hide();
		}else{

			renderCloudFrontVideo(trainingUrl)

			//$("#player").attr("href", trainingUrl);
			$("#flow_training_video").show();
			$("#training_video").hide();
		}
		
		
		$("#training_title").text(trainingTitle);			
		$("#videoDesc").html(desc);
	}
	$(".lessonTab").removeClass("selected").addClass("unselected");
	$(".instructions").removeClass("unselected").addClass("selected");
	window.setTimeout(function() { 
			hideVideoLoader();
			$(".scroll-chapters").jScrollPane();
		}, loaderDelay);	
}

function renderCloudFrontVideo(m3u_url){
	var _url = m3u_url.split("\/");
	if (_url.length >1) {
		_url = _url[_url.length -2];	
	}else{
		_url="";
	}
	//flowplayer("player", "swf/flowplayer-3.2.16.swf");

	flowplayer("player", 
		{
			src:"http://releases.flowplayer.org/swf/flowplayer.commercial-3.2.16.swf", 
			quality:'autolow'
		}, 
		{
		 key: '#$0d41f73ccb82f2c2d47',
		 clip: {
			url: 'mp4:rtmp/'+_url,
			bufferLength:15,
			autoPlay: false,
			scaling: 'fit',
				// configure clip to use hddn as our provider, referring to our rtmp plugin
				provider: 'hddn'
			},

			// streaming plugins are configured under the plugins node
			plugins: {
				controls: {
					url: "http://releases.flowplayer.org/swf/flowplayer.controls-3.2.15.swf",

	                // customize the appearance make it have a lighter look
	                buttonColor: 'rgba(0, 0, 0, 0.9)',
	                buttonOverColor: '#000000',
	                backgroundColor: '#D7D7D7',
	                backgroundGradient: 'medium',
	                sliderColor: '#FFFFFF',

	                sliderBorder: '1px solid #808080',
	                volumeSliderColor: '#FFFFFF',
	                volumeBorder: '1px solid #808080',

	                timeColor: '#000000',
	                durationColor: '#535353'
	            }
				// here is our rtmp plugin configuration
				, hddn: {
					url: "http://releases.flowplayer.org/flowplayer.rtmp/flowplayer.rtmp-3.2.12.swf",

					// netConnectionUrl defines where the streams are found
					netConnectionUrl: 'rtmp://s2equu8v27lz28.cloudfront.net/cfx/st'
				}
			},
			canvas: {
				backgroundGradient: 'none'
			}
		});





}

function generateYoutubeUrl(url)
{
	var youtubeId = url.substring(url.lastIndexOf("/")+1);
	var youtubeUrl = "http://www.youtube.com/embed/"+youtubeId+"?wmode=opaque";
	return youtubeUrl;
}


function instructionClick()
{
	loadTrainingVideo(trainingTitle, trainingUrl, desc, price);

	$(".lessonTab").removeClass("selected").removeClass("unselected-no-border").addClass("unselected");
	$(".instructions").removeClass("unselected").addClass("selected");
	// $(".scroll-chapters").jScrollPane();
	$("#recordDesc").hide(); 

}
function praticeClick()
{
	$("#recordIcon").hide();
	$("#videoDesc").show();

	/*if(price!=0)
	{
		$("#videoDesc").text("Please download the app to view this lesson.");			
		$("#training_video").hide();			
		$("#reviewIcon").show();
		$("#store_icon").show();
	}
	else
	{
		var youtubeUrl = generateYoutubeUrl(practiceUrl);
		$("#training_video").attr("src", youtubeUrl);

		$("#videoDesc").text("Watch & follow along with guru.");
		//$("#training_title").show();
		$("#training_video").show();			
		$("#store_icon").hide();
		$("#reviewIcon").hide();
					
	}*/
	loadTrainingVideo(trainingTitle, practiceUrl, desc, price);
	$(".lessonTab").removeClass("selected").removeClass("unselected-no-border").addClass("unselected");
	$(".practice").removeClass("unselected").addClass("selected");
	$(".instructions").addClass("unselected-no-border");
	$(".scroll-chapters").jScrollPane();
}
function recordClick()
{
	$("#videoDesc").text("To experience the record and review feature download the Musiguru app today!");
		//$("#training_title").show();
		$("#training_video").hide();
		$("#flow_training_video").hide();
		$("#recordIcon").show();
		$("#videoDesc").show();
		$("#store_icon").show();
		$("#reviewIcon").hide();
		$(".lessonTab").removeClass("selected").removeClass("unselected-no-border").addClass("unselected");
		$(".record").removeClass("unselected").addClass("selected");
		$(".practice").addClass("unselected-no-border");
		$(".scroll-chapters").jScrollPane();
	}
	function reviewClick()
	{
		$("#videoDesc").text("With the Musiguru App you can record yourself as you pratice and then review your performance!");
		//$("#training_title").show();

		$("#training_video").hide();
		$("#flow_training_video").hide();
		$("#reviewIcon").show();
		$("#recordIcon").hide();
		$("#videoDesc").show();
		$("#store_icon").show();
		$(".lessonTab").removeClass("selected").removeClass("unselected-no-border").addClass("unselected");
		$(".review").removeClass("unselected").addClass("selected");
		$(".record").addClass("unselected-no-border");
		$(".scroll-chapters").jScrollPane();
	}
	function showLessonsLoader()
	{
		$("#Lesson-Content .overlay").show();
		$("#chapters-Content .overlay").show();
		$("#chapterInfo .overlay").show();
		$("#chapterInfo .overlay-white-bg").show();
    //$("#module_content").hide();
    $("#chaptersNav").hide()
    $("#chapterInfo_contents").hide();
    
}
function hideLessonsLoader()
{
	$("#Lesson-Content .overlay").hide();
    //$("#module_content").show();
    $(".scroll-pane").jScrollPane();
    
}

function showListLoader()
{
	$("#chaptersNav").hide();
	$("#chapterInfo_contents").hide();
	$("#chapters-Content .overlay").show();
	$("#chapterInfo .overlay").show();
	$("#chapterInfo .overlay-white-bg").show();   
}
function hideListLoader()
{
	$("#chapters-Content .overlay").hide();
	$("#chaptersNav").show();
	$(".chapters-scroll").jScrollPane();
}
function showVideoLoader()
{
	$("#chapterInfo .overlay").show();
	$("#chapterInfo .overlay-white-bg").show();
	$("#chapterInfo_contents").hide();    
}
function hideVideoLoader()
{
	$("#chapterInfo .overlay").hide();
	$("#chapterInfo .overlay-white-bg").hide();
	$("#chapterInfo_contents").show();    
   // $(".scroll-chapters").jScrollPane();
}

function showMore(divClass)
{
	$("."+divClass+"_more").slideDown("1000");
	$("."+divClass+"_link").hide();
}

function showLess(divClass)
{
	$("."+divClass+"_more").slideUp("1000");
	$("."+divClass+"_link").show("1000");
}
function setAssociateData(currentUser)
{
	var username = currentUser.get("email");
	var firstname = currentUser.get("firstname");
	var lastname = currentUser.get("lastname");

	$("#enroll-username").val(username);

	$("#enroll-firstname").val(firstname);
	$("#enroll-lastname").val(lastname);

	$("#enroll-username").attr("readonly","readonly");
	$("#enroll-username").attr("readonly","readonly");
	if(firstname&&firstname.length>0)
		$("#enroll-firstname").attr("readonly","readonly");
	if(lastname&&lastname.length>0)
		$("#enroll-lastname").attr("readonly","readonly");                
	$("#enroll-password").removeAttr("required");
	$("#enroll-confpassword").removeAttr("required");
	$("#password-box").hide();

}

function cloud_unlock_all(){
	Parse.Cloud.run('free_trial_unlock', {}, {
		success: function(result) {
	    	console.log("cloud_unlock_all success== "+JSON.stringify(result, null, 2));
		},
		error: function(error) {
			console.log("cloud_unlock_all error== "+JSON.stringify(error, null, 2));
		}
	});
}




