$(document).ready(function() {
  $('select').material_select();
  init();
});

decisiontime = 0;

decisionHours = 0;

function setEatingHours(val){
  $("#eating_hours").val(val);
  $("#eating_hours").material_select();
}

function setEatingHoursMax(val){
  for(var i = 1; i <= 3; i++){
    if(i <= val){
      $("#eating_hours option[value='"+i+"']").prop("disabled",false);
    }else{
      $("#eating_hours option[value='"+i+"']").prop("disabled",true);
    }
  }
  $("#eating_hours").material_select();
}

function init(){
  $("#science_hours").change(function(){
    $("#entertainment_hours").val(24-$("#science_hours").val());
    $("#entertainment_hours_label").html($("#entertainment_hours").val());
    $("#science_hours_label").html($("#science_hours").val());
  });

  $("#entertainment_hours").change(function(){
    $("#science_hours").val(24-$("#entertainment_hours").val());
    $("#science_hours_label").html($("#science_hours").val());
    $("#entertainment_hours_label").html($("#entertainment_hours").val());
  });

  setInterval(function(){
    decisiontime++;
    $("#decision_hours").css("width", decisiontime/60*100+"%");
    if(decisiontime >= 60){
      decisiontime = 0;
      decisionHours++;
      $("#decision_hours_label").html(decisionHours);
    }
  },1000)
}
