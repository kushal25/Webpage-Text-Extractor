function onSubmit()
{
  var xmlhttp = new XMLHttpRequest();
  //var url = "http://localhost:5000/signIn";
  var url = "http://52.40.203.182/signIn";

  var json = 
  {
    "inputEmail" :document.forms["myForm"]["inputEmail"].value,
    "inputPassword" : document.forms["myForm"]["inputPassword"].value
  }
  
  xmlhttp.onreadystatechange = function() 
  {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var myArr = JSON.parse(xmlhttp.responseText);
          myFunction(myArr);
      }
  };

  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify(json));

}

function myFunction(arr) 
{               
    document.getElementById("result").innerHTML = arr.commandResponse;
    if(arr.flag==1)
    {
       location.href = "http://52.40.203.182/home"; 
    }                          
}