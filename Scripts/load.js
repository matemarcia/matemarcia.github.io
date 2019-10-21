fetch("Scripts/data.json")
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    bankData = [];
    for (exam of data) {
      for (key in exam.Temas) {
        bankData.push({
          "Pregunta": parseInt(key),
          "A": exam.Año,
          "M": exam.Mes,
          "P": exam.Prueba,
          "T": exam.Temas[key]
        })
      }
    }
  });

function loadResults(questionArray) {
  $(".resData").empty()
  if (questionArray.length == 0) {
    //
  }
  for (q of questionArray) {
    console.log(q);
    $(".resData").append("<div onclick=\"loadQuestion(" + q.A + ",'" + q.M + "','" + q.P + "'," + q.Pregunta + ")\" class='item " + q.A + q.M + q.P + q.Pregunta + "'><div><span>" + meses[q.M] + " " + q.A + "</span><span>Paper " + q.P.slice(1) + "</span></div><div><span>Pregunta " + q.Pregunta + "</span><span>" + temas[q.T] + "</span></div></div><hr>");
  }
}

function loadQuestion(año, mes, prueba, pregunta) {
  if (state == 0) {
    togglePreguntas()
  } else if (state == 2) {
    toggleRespuestas()
  }
  $(".item").removeClass("selected");
  $("." + año + mes + prueba + pregunta).addClass("selected");

  $(".imgPreguntas").html("<img src=\"Bank/" + año + "_" + mes + "/" + prueba + "/Q/" + pregunta + ".jpg\">");
  $(".imgRespuestas").html("<img src=\"Bank/" + año + "_" + mes + "/" + prueba + "/A/" + pregunta + ".jpg\">");
  $(".imgFormulas").empty();
  fetch("Bank/" + año + "_" + mes + "/" + prueba + "/info.json")
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      if (data[pregunta].Formulario.length == 0) {
        $(".imgFormulas").append("<div>No hay datos del formulario requeridos para esta pregunta.</div>");
      } else {
        for (img of data[pregunta].Formulario) {
          $(".imgFormulas").append("<img src=\"Formulario/" + img + ".jpg\">");
        }
      }
    });
}

var filters = {
  "P": [],
  "T": [],
  "A": [],
  "M": []
}

function filter(item) {
  if (item == null) {
    filters = {
      "P": [],
      "T": [],
      "A": [],
      "M": []
    }
    $(".filtros a").removeClass("selected");
  } else if (filters[item.charAt(0)].includes(item)) {
    filters[item.charAt(0)].splice(index = filters[item.charAt(0)].indexOf(item), 1);
    $("." + item).removeClass("selected");
  } else {
    filters[item.charAt(0)].push(item);
    $("." + item).addClass("selected");
  }

  var filteredResults = []

  for (key in filters) {
    for (i of filters[key]) {
      if (key == "A" || key == "M") {
        i = i.substr(1);
      }
      for (question of bankData) {
        if (question[key] == i && !filteredResults.includes(question)) {
          filteredResults.push(question)
        }
      }
    }
  }
  loadResults(filteredResults)
}
