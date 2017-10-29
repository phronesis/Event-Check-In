$(document).ready(function(){
  $("input[id^='searchInput']").on("keyup", function(e) {
    var search_input = $(this).val();
    let search_box = encodeURIComponent(search_input);
    let endpoint = `http://events.celagoszone5.org/event-registrants.json?event_id=2&serial_no=${search_box}`;
    let data = `<div>${search_box}</div>`;
    
    //Make ajax request
    if(search_input.length >= 3){
      $.ajax({
        url: endpoint,
        dataType: "json",
        success: function(response) {
          if(response.data) {
            $('#result').html("");
            $.each(response.data, function(index, data) {
              //Append the data to the list -- dropdown
              let title = (data.title !== null)?data.title:"";
              let fullName = title+ " "+data.first_name+" "+data.last_name;
              $("#result").append(
                '<li class="list-group-item">'
              +data.qr_code.serial_no+'   '+fullName+'  '+data.phone_number+'  '+data.registrant_type.type+
              '</li>'
            );
            });
          }
        }
      });
    }
   
  });
});
