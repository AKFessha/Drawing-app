$("document").ready(function() {
  var canvas = document.getElementById("draw");
  var paint, context, mouseX, mouseY;
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
  var width = 600;
  var height = 400;
  //Listening to mouse down event
  if (canvas.addEventListener) {
    canvas.addEventListener("mousedown", function(e) {
      paint = true;
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;
      addClick(mouseX, mouseY);
      reDraw();
    });
  }

  //Listening to the mouse move event
  if (canvas) {
    if (canvas.addEventListener) {
      canvas.addEventListener("mousemove", function(e) {
        if (paint) {
          addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
          reDraw();
        }
      });
    }
  }

  //Listening to mouse up event
  if (canvas) {
    if (canvas.addEventListener) {
      canvas.addEventListener("mouseup", function(e) {
        paint = false;
      });
    }
  }
  //Listening to mouse leave event
  if (canvas) {
    if (canvas.addEventListener) {
      canvas.addEventListener("mouseleave", function(e) {
        paint = false;
      });
    }
  }

  //Defining the function called addClick
  function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }
  //Defining the function called reDraw
  function reDraw() {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    for (var i = 0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();
    }
  }
  //Event listener for clearing
  var clearButton = document.getElementById("btnClear");
  if (clearButton) {
    if (clearButton.addEventListener) {
      clearButton.addEventListener("click", function(e) {
        if (canvas) {
          context = canvas.getContext("2d");
          context.clearRect(0, 0, width, height);
          clickX.length = 0;
          clickY.length = 0;
          clickDrag.length = 0;
        }
      });
    }
  }
});
