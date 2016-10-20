$(document).ready(function() {
  $('select').material_select();
  $("#modal1").openModal();
  sleepHours = 24;
  $("#sleep_hours_label").html(24);
  init();
});

decisionmins = 0;

scienceHours = 0;
eatingHours = 0;
entertainmentHours = 0;
decisionHours = 0;
sleepHours = 0;

function setEatingHours(val){
  $("#eating_hours").val(val);
  $("#eating_hours").material_select();
}

function setEatingHoursMax(val){
  for(var i = 0; i <= 3; i++){
    if(i <= val){
      $("#eating_hours option[value='"+i+"']").prop("disabled",false);
    }else{
      $("#eating_hours option[value='"+i+"']").prop("disabled",true);
    }
  }
  $("#eating_hours").material_select();
}

function adjustMaxes(){
  $("#science_hours").prop("max",24-eatingHours-entertainmentHours-decisionHours);
  $("#entertainment_hours").prop("max",24-eatingHours-scienceHours-decisionHours);
  setEatingHoursMax(24-entertainmentHours-scienceHours-decisionHours);
  sleepHours = 24-eatingHours-entertainmentHours-decisionHours-scienceHours;
  $("#sleep_hours_label").html(sleepHours);
}

function init(){
  $("#science_hours").change(function(){
    scienceHours = $("#science_hours").val();
    $("#science_hours_label").html($("#science_hours").val());
    adjustMaxes();
  });

  $("#entertainment_hours").change(function(){
    entertainmentHours = $("#entertainment_hours").val();
    $("#entertainment_hours_label").html($("#entertainment_hours").val());
    adjustMaxes();
  });

  $("#eating_hours").change(function(){
    eatingHours = $("#eating_hours").val();
    adjustMaxes();
  });

  setInterval(function(){
    decisionmins++;
    $("#decision_hours").css("width", decisionmins/30*100+"%");
    if(decisionmins >= 30 && sleepHours != 0){
      decisionmins = 0;
      decisionHours++;
      $("#decision_hours_label").html(decisionHours);
      adjustMaxes();
    }
  },1000)
}
