decisionmins = 0;

scienceHours = 0;
eatingHours = 0;
workingHours = 0;
decisionHours = 0;
sleepHours = 0;

scienceMoney = 0;
eatingMoney = 0;
rent = 40;

dayNum = 1;

papers = 0;
balance = 100;
health = 100;
reputation = 50;

metrics_content="";

$(document).ready(function() {
  $('select').material_select();
  sleepHours = 24;
  $("#sleep_hours_label").html(24);
  updateMetrics();
  init();
});

var currentEncounter;

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
  $("#science_hours").prop("max",24-eatingHours-workingHours-decisionHours);
  $("#science_hours_max_label").html(24-eatingHours-workingHours-decisionHours);
  $("#working_hours").prop("max",24-eatingHours-scienceHours-decisionHours);
  $("#working_hours_max_label").html(24-eatingHours-scienceHours-decisionHours);
  setEatingHoursMax(24-workingHours-scienceHours-decisionHours);
  sleepHours = 24-eatingHours-workingHours-decisionHours-scienceHours;
  $("#sleep_hours_label").html(sleepHours);
}

function adjustMoneyMaxes(){
  $("#science_money").prop("max",balance-eatingMoney-rent);
  $("#science_money_max_label").html(balance-eatingMoney-rent);
  $("#eating_money").prop("max",balance-scienceMoney-rent);
  $("#eating_money_max_label").html(balance-scienceMoney-rent);
}

function updateMetrics(){
  var metrics_content = "<div class=\"col s3\"><center>Papers published: "+papers+"</center></div><div class=\"col s3\"><center>Reputation: "+reputation+"%</center></div><div class=\"col s3\"><center>Money: $"+balance+"</center></div><div class=\"col s3\"><center>Health: "+health+"%</center></div>";
  $(".metrics-row").html(metrics_content);
}

function resetInput(){
  decisionmins = 0;

  scienceHours = 0;
  $("#science_hours").val(0);
  $("#science_hours_label").html($("#science_hours").val());
  eatingHours = 0;
  $("#eating_hours").val(0);
  $("#eating_hours_label").html($("#eating_hours").val());
  workingHours = 0;
  $("#working_hours").val(0);
  $("#working_hours_label").html($("#working_hours").val());
  decisionHours = 0;

  sleepHours = 24;
  $("#sleep_hours_label").html(24);

  scienceMoney = 0;
  $("#science_money").val(0);
  $("#science_money_label").html($("#science_money").val());
  eatingMoney = 0;
  $("#eating_money").val(0);
  $("#eating_money_label").html($("#eating_money").val());
  adjustMoneyMaxes();
  adjustTimeMaxes();

}

var encounters = [
  {
    title: "Plagiarize",
    content: "You're in need of some cash! You obtained a design for a new optical instrument from Holland. Even if the people find out, which they probably won't, the Dutch won't be able to claim ownership of the design, since it doesn't seem to be patented.<br><br>You'll paint your device red just to be safe though.",
    effect: "+$100 money",
    refusalEffect: "Nothing",
    apply: function(){
      papers++;
      reputation-=20;
      balance+=100;
      return "Oops, you got caught. You lost 10% reputation as a result. However, you already earned a ton of money, so you don't really care.";
    },
    refuse: function(){
      return "Smart choice. You don't want to be risking your reputation for something small like this.";
    }
  },
  {
    title: "Language",
    content: "Through careful observation through your telescope, you found that Copernicus's heliocentric model of the solar system is, in fact, consistent with your data. You know that you'll be prosecuted for publishing these results, but you hope that your radical ideas will spread quickly among the people. Thus, you contemplate whether to write your paper in common language or in academic latin, which is more common for scientific papers. Would you like to write your paper in plain language?",
    effect: "Unknown",
    refusalEffect: "Unknown",
    apply: function(){
      reputation+=50;
      balance+=150;
      return "Congratulations! You paper sells well in the street, and you get $150 money and 50% reputation. Watch out for the authorities though. ";
    },
    refuse: function(){
      reputation+=10;
      return "Oops. One of your students gets the manuscript and translates it into vernacular language without your consent in order to sell it. You get nothing."
    }
  },
  {
    title: "Language",
    content: "Through careful observation through your telescope, you found that Copernicus's heliocentric model of the solar system is, in fact, consistent with your data. You know that you'll be prosecuted for publishing these results, but you hope that your radical ideas will spread quickly among the people. Thus, you contemplate whether to write your paper in common language or in academic latin, which is more common for scientific papers. Would you like to write your paper in plain language?",
    effect: "Unknown",
    refusalEffect: "Unknown",
    apply: function(){
      reputation+=50;
      balance+=150;
      return "Congratulations! You paper sells well in the street, and you get $150 money and 50% reputation. Watch out for the authorities though. ";
    },
    refuse: function(){
      reputation+=10;
      return "Oops. One of your students gets the manuscript and translates it into vernacular language without your consent in order to sell it. You get nothing.";
    }
  }
];

function applyEncounter(){
  $("#encounter-result-title").html("Accepted");
  $("#encounter-result-content").html(currentEncounter.apply());
  $("#encounter-result-popup").openModal();
  balance=roundNum(balance,2);
  health=roundNum(health,2);
  papers=roundNum(papers,2);
  reputation=roundNum(reputation,2);
  resetInput();
  updateMetrics();
  $("#encounter-result-title").html("Accepted");
  $("#encounter-result-content").html(currentEncounter.getApplyResult());
  $("#encounter-result-popup").openModal();
}

function refuseEncounter(){
  $("#encounter-result-title").html("Refused");
  $("#encounter-result-content").html(currentEncounter.refuse());
  $("#encounter-result-popup").openModal();
  balance=roundNum(balance,2);
  health=roundNum(health,2);
  papers=roundNum(papers,2);
  reputation=roundNum(reputation,2);
  resetInput();
  updateMetrics();
}

var currentEncounterNum = 0;

function encounter(){
  if(currentEncounterNum >= encounters.length){
    currentEncounter = encounters[encounters.length-1];
  }else{
    currentEncounter = encounters[currentEncounterNum];
  }
  currentEncounterNum++;
  $("#encounter-title").html(currentEncounter.title);

  $("#encounter-content").html(currentEncounter.content+"<br><br>Effect: "+currentEncounter.effect+"<br><br>Effect of Refusal: "+currentEncounter.refusalEffect);
  $("#encounter-popup").openModal();
}

function closePopup(){
  resetInput();
  encounter();
}

function roundNum(num, places){
  return Math.round(num*Math.pow(10,places))/Math.pow(10,places);
}

function processDay(){
  $("#popup-title").html("Day "+dayNum);

  var blurb;

  var deltaPapers = roundNum(scienceHours/50 + scienceMoney/500,2);
  var deltaMoneyDueToSpending = roundNum(deltaPapers*100 - scienceMoney - eatingMoney - rent,2);
  var deltaMoneyDueToWorking = roundNum(workingHours*8,2);
  var deltaHealthDueToSleep = roundNum((sleepHours > 8? (sleepHours-8)*5: (sleepHours-8)*15),2);
  var deltaHealthDueToEating = roundNum(eatingHours+eatingMoney/5 > 4? ((eatingHours+(eatingMoney/10)-4)*10): ((eatingHours+(eatingMoney/5)-4)*20),2);
  var deltaReputation=roundNum((health-70)/5 + (scienceMoney-20)/20,2);
  if(sleepHours > 10){
    deltaHealthDueToSleep = 10;
  }

  blurb = "You spent " + scienceHours + " hr and $"+scienceMoney+" sciencing. ";
  blurb+= "<br>You have created "+deltaPapers+" papers.";

  blurb+="<br><br>You spent $" + scienceMoney + " on your paper and conducted research with "+health+"% health.";
  blurb+="<br>You have "+(deltaReputation>0?"gained":"lost")+ " "+Math.abs(deltaReputation)+"% reputation because of this."

  blurb+="<br><br>You spent " + eatingHours + " hr and $" + eatingMoney + " eating.";
  blurb+="<br>You have "+(deltaHealthDueToEating>0?"gained":"lost")+" "+Math.abs(deltaHealthDueToEating)+"% health because of this.";

  blurb+="<br><br>You spent " + sleepHours + " hr sleeping.";
  blurb+="<br>You have "+(deltaHealthDueToSleep>0?"gained":"lost")+" "+Math.abs(deltaHealthDueToSleep)+"% health because of this.";

  blurb+="<br><br>You spent " + workingHours + " hr working.";
  blurb+="<br>You have earned $"+deltaMoneyDueToWorking+".";

  blurb+="<br><br>You spent $"+ scienceMoney+" on science, $"+eatingMoney+" on food, and $"+rent+" on rent.";
  blurb+="<br>You spent $"+(scienceMoney+eatingMoney+rent)+" in total.";

  $(".delta-row").html("<div class=\"col s3\"><center>"+(deltaPapers>0?"+":"")+(deltaPapers)+"</center></div><div class=\"col s3\"><center>"+(deltaReputation>0?"+":"")+(deltaReputation)+"</center></div><div class=\"col s3\"><center>"+(deltaMoneyDueToWorking+deltaMoneyDueToSpending>0?"+":"")+(deltaMoneyDueToWorking+deltaMoneyDueToSpending)+"</center></div><div class=\"col s3\"><center>"+(deltaHealthDueToSleep+deltaHealthDueToEating>0?"+":"")+(deltaHealthDueToSleep+deltaHealthDueToEating)+"</center></div>");

  balance+=deltaMoneyDueToSpending+deltaMoneyDueToWorking;
  health+=deltaHealthDueToSleep+deltaHealthDueToEating;
  papers+=deltaPapers;
  reputation+=deltaReputation;

  balance=roundNum(balance,2);
  health=roundNum(health,2);
  papers=roundNum(papers,2);
  reputation=roundNum(reputation,2);
  decisionHours = 0;
  decisionmins = 0;

  $("#popup-content").html(blurb);
  dayNum++;
  $("#day_label").html(dayNum);
  $("#popup").openModal();
  updateMetrics();
}

function init(){
  $("#science_hours").change(function(){
    scienceHours = parseInt($("#science_hours").val());
    $("#science_hours_label").html($("#science_hours").val());
    adjustTimeMaxes();
  });

  $("#working_hours").change(function(){
    workingHours = parseInt($("#working_hours").val());
    $("#working_hours_label").html($("#working_hours").val());
    adjustTimeMaxes();
  });

  $("#eating_hours").change(function(){
    eatingHours = parseInt($("#eating_hours").val());
    adjustTimeMaxes();
  });

  $("#science_money").change(function(){
    scienceMoney = parseInt($("#science_money").val());
    $("#science_money_label").html($("#science_money").val());
    adjustMoneyMaxes();
  });

  $("#eating_money").change(function(){
    eatingMoney = parseInt($("#eating_money").val());
    $("#eating_money_label").html($("#eating_money").val());
    adjustMoneyMaxes();
  });

  $("#done_button").click(function(){
    processDay();
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
