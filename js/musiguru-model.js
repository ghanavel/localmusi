/*
 *
 * Modal Data
 *
 */
 
app.factory("MgModal",function(){
 
	return{
			name:"Musiguru",
			isLogin:false,
			category:{},
			modules:[],
			module:{},
			lessonPath:"",
			user:{
				lastVisited:"",
				library:[],
				availDiscount:false,
				firstname:"",
				username:""
			},
			MUSIGURU:"Musiguru",
			MUSIGURU_SIGNUP:"Musiguru Signup",
			title:""
		}
 });