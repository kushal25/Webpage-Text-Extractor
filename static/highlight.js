 function highlight(){
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        return text;
      }

      function doSomethingWithSelectedText() {
        var selectedText = highlight();
        log(selectedText);
        if (selectedText) {
            log("Im here");
            var originalText = document.getElementById('resp');
             var options = {"accuracy" : "exactly"};
             var markInstance = new Mark(document.querySelector("div.context"));
             markInstance.unmark();
             markInstance.mark(selectedText,options);
        }
    }

    function log(text)
    {
        window.console.log(text);
    }

    // function highlightWord(container,what, spanClass) {
    //     var content = container.innerHTML,
    //         pattern = new RegExp('(>[^<.]*)(' + what + ')([^<.]*)','g'),
    //         replaceWith = '$1<span ' + ( spanClass ? 'class="' + spanClass + '"' : '' ) + '">$2</span>$3',
    //         // replaceWith = '<span style="background:yellow">' + what + '</span>';
    //         highlighted = content.replace(pattern,replaceWith);
    //     return (container.innerHTML = highlighted) !== content;
    // }

    var test = document.getElementById('result');

    function whatClicked(evt) {
        if(evt.target.id === "respFreq")
        {
            document.onmouseup = doSomethingWithSelectedText;
            document.onkeyup = doSomethingWithSelectedText;
        }
    }

    test.addEventListener("click", whatClicked, false);
    