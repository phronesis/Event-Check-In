$(document).ready(function(){
  $("input[id^='searchInput']").on("keyup", function(e) {
    var search_input = $(this).val();
    let search_box = encodeURIComponent(search_input);
    let endpoint = `https://eventapp.com/users/${search_box}`;
    let data = `<div>${search_box}</div>`;
    $("#result").html(data);
    //Make ajax request
    $.get({
      url: endpoint,
      dataType: "json",
      success: function(response) {
        if(response.data) {
          $.each(response.data.items, function(index, data) {
            //Append the data to the list -- dropdown
          });
        }
      }
    });
  });
});
