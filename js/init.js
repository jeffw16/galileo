$(document).ready(function() {
  $('select').material_select();
});

decisiontime = 0;

function init(){
  $("#science_hours").change(function(){
    $("#entertainment_hours").val(24-$("#science_hours").val());
    $("#science_hours_label").html($("#science_hours").val());
    $("#eating_hours").val(3);
  });

  setInterval(function(){
    decisiontime++;
    $("#decision_hours").css("width", decisiontime/60*100+"%");
    if(decisiontime >= 30){
      decisiontime = 0;
    }
  },1000)
}
