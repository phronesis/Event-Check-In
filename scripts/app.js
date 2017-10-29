$(document).ready(function(){
  var host = "http://events.celagoszone5.org";
  var responseData = [];
  $("input[id ='searchInput']").on("keyup", function(e) {
    var search_input = $(this).val();
    let search_box = encodeURIComponent(search_input);
    let endpoint = `${host}/event-registrants.json?event_id=2&serial_no=${search_box}`;
    let data = `<div>${search_box}</div>`;
    
    //Make ajax request
    if(search_input.length >= 3){
      $.ajax({
        url: endpoint,
        dataType: "json",
        success: function(response) {
          if(response.data) {
            responseData = response.data;
            $('#result').html("");
            $.each(response.data, function(index, data) {
              let title = (data.title !== null)?data.title:"";
              let fullName = title+ " "+data.first_name+" "+data.last_name;
              $("#result").append(
                '<li class="list-group-item" id="'+index+'">'
              +data.qr_code.serial_no+'   '+fullName+'  '+data.phone_number+'  '+data.registrant_type.type+
              '</li>'
            );
            });
            watchLi();
          }
        }
      });
    }else{
      $('#result').html("Input At least 3 Characters");
    }
   
  });
  function watchLi(){
    $("li.list-group-item").on("click", function(e){
      let arrayIndex = $(this).attr('id');
      let selectedData = responseData[arrayIndex];
      let endpoint = `${host}/event-attendance/add.json`;
      let data = {
        event_day_id:7,//for now we will hardcode the event_day_id
        event_registrant_id:selectedData.id
      };
  
      $.ajax({
        url:endpoint,
        dataType:"json",
        type: "POST",
        data: data,
        success:function(response){
         
         if(response.data){
          $('#result').html("Successfully Checked In");
         }else{
          $('#result').html(response.error[0]);
         }
        }
      });
    });
  }

});
