var state = 0

function togglePreguntas() {
  if (state == 0) {
    $(".back").css({display: "block"})
    $(".sideBar").css({transform: "translateX(-22vw)"})
    $(".preguntas").css({transform: "translateX(-22vw)"})
    $(".actionButtons").css({transform: "translateX(-22vw)", opacity: "1"})
    $(".placeholder").css({display: "none"})
    $(".formulario").css({display: "block"});
    state = 1
  } else if (state == 1) {
    $(".imgPreguntas").empty()
    $(".item").removeClass("selected");
    $(".back").css({display: "none"})
    $(".sideBar").css({transform: "translateX(0)"})
    $(".preguntas").css({transform: "translateX(0)"})
    $(".actionButtons").css({transform: "translateX(0)", opacity: "0"})
    $(".placeholder").css({display: "block"})
    $(".formulario").css({display: "none"});
    state = 0
  } else {
    toggleRespuestas()
    setTimeout(togglePreguntas, 350);
  }
}

function toggleRespuestas() {
  if (state == 1) {
    $(".preguntas").css({transform: "translateX(-26.7vw) scale(0.85, 0.85)"})
    $(".preguntas img").css({opacity: "0.3"})
    $(".respuestas").css({transform: "translateX(-72vw)"})
    $(".actionButtons .res").text("Pregunta")
    $(".actionButtons .for").css({opacity: "0.3"});
    state = 2
  } else if (state == 2) {
    $(".preguntas").css({transform: "translateX(-22vw) scale(1, 1)"})
    $(".preguntas img").css({opacity: "1"})
    $(".respuestas").css({transform: "translateX(0)"})
    $(".actionButtons .res").text("Respuestas")
    $(".actionButtons .for").css({opacity: "1"});
    state = 1
  }
}

function toggleFormulas() {
  if (state == 1) {
    $(".preguntas").css({transform: "translateX(-26.7vw) scale(0.85, 0.85)"})
    $(".preguntas img").css({opacity: "0.3"})
    $(".formulario").css({zIndex: "25", opacity: "1", transform: "translateY(0)"});
    $(".actionButtons .res").css({opacity: "0.3"});
    state = 3
  } else {
    $(".preguntas").css({transform: "translateX(-22vw) scale(1, 1)"})
    $(".preguntas img").css({opacity: "1"})
    $(".formulario").css({zIndex: "-10", opacity: "0", transform: "translateY(5vw)"});
    $(".actionButtons .res").css({opacity: "1"});
    state = 1
  }
}
