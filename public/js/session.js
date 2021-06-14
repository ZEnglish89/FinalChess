
      function joinClicked(){
        $.post("/play",function(data){
      		window.location = data.redirect;
      	});
      	return false;
      }

  		function readClicked(){


          $.ajax({
            url: "/read",
            type: "GET",
            data: {},
            success: function(data){
              if (!data.retVal)
                alert("bad read");
              else {

            if (data.retVal.volleyball)
              $("#volleyball").prop("checked",true);
            else
              $("#volleyball").prop("checked",false);

            if (data.retVal.basketball)
              $("#basketball").prop("checked",true);
            else
              $("#basketball").prop("checked",false);

            if (data.retVal.soccer)
              $("#soccer").prop("checked",true);
            else
              $("#soccer").prop("checked",false);
            if (data.retVal.driverslicense)
              $("#driverslicense").prop("checked",true);
            else
              $("#driverslicense").prop("checked",false);

                $("#grade").val(data.retVal.grade);


                alert("good read");
              }
            } ,
            dataType: "json"
          });
  		  return false;
  		}


      function updateClicked(){

          $.ajax({
            url: "/update",
            type: "PUT",

            data: {
            grade:$("#grade").val(),volleyball:$("#volleyball").prop("checked"),basketball:$("#basketball").prop("checked"),
            soccer:$("#soccer").prop("checked"),driverslicense:$("#driverslicense").prop("checked")

            },
            success: function(data){
              if (!data.retVal)
                alert("bad update");
              else
                alert("good update");
            } ,
            dataType: "json"
          });
        return false;
      }


function logoutClicked(){
	$.get("/logout",function(data){
		window.location = data.redirect;
	});
	return false;
}
function ChangeClicked(){
  if($("#chngepsw").val() == "")
  {
    alert("Invalid Password");
    return false;
  }
  $.ajax({
    url: "/changepsw",
    type: "POST",
    data: {
    password:$("#chngepsw").val()
    },
    success: function(data){
      alert("changed");
      } ,
    dataType: "json"
  });
return false;
}


$(document).ready(function(){
  console.log("session ready");
  $("#chngepsw").keydown( function( event ) {
      if ( event.which === 13 ) {
        ChangeClicked();
        event.preventDefault();
        $("#chngepsw").val("");
        return false;
      }
  });
//  $("#createButton").click(createClicked);
  $("#readButton").click(readClicked);
  $("#updateButton").click(updateClicked);
  $("#join").click(joinClicked);
//  $("#deleteButton").click(deleteClicked);


	$.get("/userInfo",function(data){
      console.log("in userInfo");
		if (data.retVal.name) {
			$("#session").html("Session " + data.retVal.name + " " + data.retVal.ident);
      $("#wins").html("Wins: "+data.retVal.wins);
      $("#losses").html("Losses: "+data.retVal.losses);


    }
	});

	$("#logout").click(logoutClicked);

  $("form").submit(function(event)
  {
//        if ($("#identifier").val() == "") {
//          alert("NO ID");
//          return false;
//        }
//        if ($("#name").val() == "") {
//          alert("NO NAME");
//          return false;
//        }


    return false;
  })



})
