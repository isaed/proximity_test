 $( document ).ready(function() {
    
    $("#search").change(function(){
       search_value();
    });

    const node = document.getElementById("search");;
    node.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            search_value();
        }
    });

        function create_table(data) {
            var table = document.createElement("table");
            var col = [];
            for (var i = 0; i < data.length; i++) {
                for (var key in data[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

             var tr = table.insertRow(-1); 

              for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th"); 
                th.innerHTML = col[i].toUpperCase();
                tr.appendChild(th);
              }

               for (var i = 0; i < data.length; i++) {

                  tr = table.insertRow(-1);

                  for (var j = 0; j < col.length; j++) {
                      var tabCell = tr.insertCell(-1);
                      tabCell.innerHTML = data[i][col[j]];
                  }
              }

                  var divContainer = document.getElementById("resultarea");
                  divContainer.innerHTML = "";
                  divContainer.appendChild(table);


        }

        function search_value(){
           var search_value = $("#search").val();
            $.ajax({
              type: "GET",
              url: "script_php.php",
              data: {param: search_value},
              cache: false,
              success: function(data){
                  console.log(data);
                  var strHTML = '';

                  if(data.length > 0){
                      for(var i = 0; i < data.length; i++) {
                          delete data[i]['ID'];
                      }
                      create_table(data);  
                  }else{
                    var divContainer = document.getElementById("resultarea");
                    divContainer.innerHTML = 'Sin resultado...';
                  }
                  
              }
            });
        }

});
