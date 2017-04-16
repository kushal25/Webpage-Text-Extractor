function onSubmit(){
      var xmlhttp = new XMLHttpRequest();
      var url = "http://52.40.203.182/extract";

      var json = {"url" : document.forms["myForm"]["enterURL"].value}

      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              var myArr = JSON.parse(xmlhttp.responseText);
              myFunction(myArr);
          }
      };
      xmlhttp.open("POST", url, true);
      xmlhttp.setRequestHeader("Content-type", "application/json");
      xmlhttp.send(JSON.stringify(json));

      function displayArrayObjects(arrayObjects) {
        var len = arrayObjects.length, text = "";

        for (var i = 0; i < len; i++) {
            var myObject = arrayObjects[i];
            
            for (var x in myObject) {
                text += ( x + ": " + myObject[x] + " ");
            }
            text += "<br/>";
        }

        document.getElementById("respFreq").innerHTML = text;
    }

      function myFunction(arr) {    
          //location.href = "http://localhost:5000/extractedText";          
          document.getElementById("resp").innerHTML = arr.extractResponse;
          var rows = arr.frequency;
          displayArrayObjects(rows);
      }

    }