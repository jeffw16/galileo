$(document).ready(function() {
  $('select').material_select();
});

function init(){
  $("#science_hours").change(function(){
    $("#entertainment_hours").val(24-$("#science_hours").val());
    $("#science_hours_label").html($("#science_hours").val());
  });
}
