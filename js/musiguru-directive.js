/*
app.directive("superman",function(){
  return {
    restrict:"E",
    template:"<div>I am super hero</div>"
  }
});
*/

/*
app.directive("superman",function(){
  return {
    restrict:"E",
    template:"<div>I am super hero</div>",
    link: function(){
    	alert("doctor");
    }
  }
});
*/


/*
app.directive("enter",function(){
  return function(scope,element){
  	element.bind("mouseover",function(){
  		console.log("I am enter");
  	});

  }
});
*/

/*
app.directive("enter",function(){
  return function(scope,element){
    element.bind("mouseover",function(){
        element.addClass("one");
    });

  }
});

app.directive("enter",function(){
  return function(scope,element){
    element.bind("mouseleave",function(){
      element.removeClass("one");
    });

  }
});
*/

/*
app.directive("superhero",function(){
  return {
      restrict: "A",
      template:  "I am super hero" ,
      link: function(scope,element){
        element.bind("mouseover",function(){
          element.addClass("one");
        });
      }
  }
});
*/
  
/*
app.directive("superhero",function(){
  return {
      restrict: "A",
      template:  "I am super hero" ,
      link: function(scope,element){
        element.bind("mouseover",function(){
          element.addClass("one");
        });
      }
  }
});
*/


/*
app.directive("studentRow",function(){
  return {
      restrict: "C",
      link: function(scope,element){
          //alert($(".studentRow").length);
        
        element.bind("mouseover",function(){
          element.addClass("two");
        });
        
      }
  }
});
*/


/*
app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
     
    for (var i=1; i<=total; i++)
      input.push(i);

    return input;
    
  };
});
*/


app.directive('pagination', function() {
  return {
    restrict: 'E',
    scope: {
      numPages: '=',
      currentPage: '=',
      onSelectPage: '&'
    },
    templateUrl: 'html/pagination.html',
    replace: true,
    link: function(scope) {
      scope.$watch('numPages', function(value) {
        scope.pages = [];
        for(var i=1;i<=value;i++) {
          scope.pages.push(i);
        }
        //console.log(scope.currentPage);
        if (scope.currentPage > value ) {
          scope.selectPage(value);

        }
      });
      scope.noPrevious = function() {
        return scope.currentPage === 1;
      };
      scope.noNext = function() {
        return scope.currentPage === scope.numPages;
      };
      scope.isActive = function(page) {
        return scope.currentPage === page;
      };

      scope.selectPage = function(page) {
        if ( ! scope.isActive(page) ) {
          scope.currentPage = page;
          scope.onSelectPage({ page: page });
        }
      };

      scope.selectPrevious = function() {
        if ( !scope.noPrevious() ) {
          scope.selectPage(scope.currentPage-1);
        }
      };
      scope.selectNext = function() {
        if ( !scope.noNext() ) {
          scope.selectPage(scope.currentPage+1);
        }
      };
    }
  };
});


