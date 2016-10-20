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

scienceMoney = 0;
eatingMoney = 0;
entertainmentMoney = 0;

balance = 100;

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

function adjustTimeMaxes(){
  $("#science_hours").prop("max",24-eatingHours-entertainmentHours-decisionHours);
  $("#science_hours_max_label").html(24-eatingHours-entertainmentHours-decisionHours);
  $("#entertainment_hours").prop("max",24-eatingHours-scienceHours-decisionHours);
  $("#entertainment_hours_max_label").html(24-eatingHours-scienceHours-decisionHours);
  setEatingHoursMax(24-entertainmentHours-scienceHours-decisionHours);
  sleepHours = 24-eatingHours-entertainmentHours-decisionHours-scienceHours;
  $("#sleep_hours_label").html(sleepHours);
}

function adjustMoneyMaxes(){
  $("#science_money").prop("max",balance-eatingMoney-entertainmentMoney);
  $("#science_money_max_label").html(balance-eatingMoney-entertainmentMoney);
  $("#eating_money").prop("max",balance-scienceMoney-entertainmentMoney);
  $("#eating_money_max_label").html(balance-scienceMoney-entertainmentMoney);
  $("#entertainment_money").prop("max",balance-scienceMoney-eatingMoney);
  $("#entertainment_money_max_label").html(balance-scienceMoney-eatingMoney);
}

function init(){
  $("#science_hours").change(function(){
    scienceHours = $("#science_hours").val();
    $("#science_hours_label").html($("#science_hours").val());
    adjustTimeMaxes();
  });

  $("#entertainment_hours").change(function(){
    entertainmentHours = $("#entertainment_hours").val();
    $("#entertainment_hours_label").html($("#entertainment_hours").val());
    adjustTimeMaxes();
  });

  $("#eating_hours").change(function(){
    eatingHours = $("#eating_hours").val();
    adjustTimeMaxes();
  });

  $("#science_money").change(function(){
    scienceMoney = $("#science_money").val();
    $("#science_money_label").html($("#science_money").val());
    adjustMoneyMaxes();
  });

  $("#eating_money").change(function(){
    eatingMoney = $("#eating_money").val();
    $("#eating_money_label").html($("#eating_money").val());
    adjustMoneyMaxes();
  });

  $("#entertainment_money").change(function(){
    entertainmentMoney = $("#entertainment_money").val();
    $("#entertainment_money_label").html($("#entertainment_money").val());
    adjustMoneyMaxes();
  });

  setInterval(function(){
    decisionmins++;
    $("#decision_hours").css("width", decisionmins/30*100+"%");
    if(decisionmins >= 30 && sleepHours != 0){
      decisionmins -= 30;
      decisionHours++;
      $("#decision_hours_label").html(decisionHours);
      adjustTimeMaxes();
    }
  },1000)
}
