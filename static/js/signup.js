function onSubmit()
{
  var xmlhttp = new XMLHttpRequest();
  //var url = "http://localhost:5000/signUp";
  var url = "http://52.40.203.182/signUp";

  var json = {
    "inputName" : document.forms["myForm"]["inputName"].value,
    "inputEmail" :document.forms["myForm"]["inputEmail"].value,
    "inputPassword" : document.forms["myForm"]["inputPassword"].value
  }
        
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");      
  xmlhttp.send(JSON.stringify(json));
  xmlhttp.onreadystatechange = function() 
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
        var myArr = JSON.parse(xmlhttp.responseText);           
        myFunction(myArr);
    }
  };
}

function myFunction(arr) 
{             
    document.getElementById("result").innerHTML = arr.commandResponse;
    if(arr.flag==1)
    {
       location.href = "http://52.40.203.182/home"; 
    } 
}