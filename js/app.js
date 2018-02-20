//primero todas mis variables globales
var selectFilter = document.getElementById("select-filter");
var activeFilter = document.getElementById("active-filter");
var inactiveFilter = document.getElementById("inactive-filter");
var codersContainer = document.getElementById("coders-container");

//luego todos mis eventos
window.addEventListener("load", function() {
  paintCoders(data);
});

selectFilter.addEventListener("change", applyFilter);
activeFilter.addEventListener("click", filter);
inactiveFilter.addEventListener("click", filter);

//finalmente mis funciones
function filter() {
  var filterToApply = event.target.dataset.type;
  //string to boolean
  filterToApply = filterToApply == "true";

  var filteredData = data.filter(function(coder) {
    //la variable filterToApply unicamente
    //es true or false
    return coder.active == filterToApply;
  });

  //reutilizamos paint coders
  paintCoders(filteredData);
}

function paintCoders(coders) {
  //limpiamos para no duplicar coders
  codersContainer.innerText = "";
  coders.forEach(function(coder) {
    // para cada coder creamos un elemento document
    var coderDOM = createCoderDOM(coder);
    //y lo agregamos al contenedor
    codersContainer.appendChild(coderDOM);
  });
}

function createCoderDOM(coder) {
  //esta funcion convierte cualquier objeto coder
  // en un elemento DOM con su info correspondiente
  var coderImage = document.createElement("img");
  coderImage.src = coder.url;
  coderImage.alt = coder.name;

  var coderName = document.createElement("p");
  coderName.innerText = coder.name;

  var coderContainer = document.createElement("div");
  coderContainer.className = "contenedor-imagenes";

  var coderAverageContainer = document.createElement("p");
  coderAverageContainer.innerText = calculateAverageOfGrades(coder.grades);

  coderContainer.appendChild(coderImage);
  coderContainer.appendChild(coderName);
  coderContainer.appendChild(coderAverageContainer);

  return coderContainer;
}

function calculateAverageOfGrades(gradesArray) {
  // esta funcion convierte un arreglo de numeros
  //en un solo en el promedio (suma/numero de items)
  // de todos los numeros
  return Math.floor(
    gradesArray.reduce(function(itemA, itemB) {
      return itemA + itemB;
    }) / gradesArray.length
  );
}

function applyFilter() {
  var selectedIndex = event.target.selectedIndex;
  var filtroAAplicar = event.target[selectedIndex].dataset.filtro;
  //quitamos el if else para solo poner changeFilter(valor)
  changeFilter(filtroAAplicar);
}

function changeFilter(type) {
  var imagenesACambiar = document.getElementsByTagName("img");
  for (var i = 0; i < imagenesACambiar.length; i++) {
    imagenesACambiar[i].className = type;
  }
}
