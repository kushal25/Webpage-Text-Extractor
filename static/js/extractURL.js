function onSubmit()
{  
  var xmlhttp = new XMLHttpRequest();
  var url = "http://52.40.203.182/extract";
  // var url = "http://localhost:5000/extract";
  if(!document.forms["myForm"]["enterURL"].value)
  {
    alert("Enter URL for extraction");
  }
  else
  {
    var json = {"url" : document.forms["myForm"]["enterURL"].value}

    xmlhttp.onreadystatechange = function() 
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
        {
            var myArr = JSON.parse(xmlhttp.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(json));
  }
}

function displayArrayObjects(arrayObjects) 
{
  $(".myTable tr").remove();
  var $header = '<tr><th width="50%">Word</th><th width="50%">Frequency</th></tr>';
  $('.myTable').append($header);
  for (var i = 0; i < arrayObjects.length; i++) 
  {
    var $formrow = '<tr><td id=row>'+arrayObjects[i]['word']+'</td><td>'+arrayObjects[i]['freq']+'</td></tr>';
    $('.myTable').append($formrow);  
  }

}

function myFunction(arr) 
{    
  if(arr.statusCode ===400)
  {
    alert(arr.extractResponse);
  }
  else
  {          
    document.getElementById("resp").textContent = arr.extractResponse;
    displayArrayObjects(arr.frequency);
  }
}

