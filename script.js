const btnCreate = document.querySelector('.createMatrix');
const btnMatrInc = document.querySelector('.MatrInc');
const btnLeftInc = document.querySelector('.LeftInc');
btnCreate.addEventListener('click', createMatrixInputs);

btnMatrInc.addEventListener('click', outIncidence);
btnLeftInc.addEventListener('click', left_inc);
var matrixInputs = []

//создание инпутов для ввода матрицы
function createMatrixInputs() {

    matrixInputs = []

    const node = document.querySelector('.matrix-inputs')
  
    var size = document.getElementsByClassName("matrix-size")[0].value
    size = document.getElementsByClassName("matrix-size")[0].value 

    if(node.rows.length != 0) {
        for (var i = node.rows.length -1; i >= 0; i -= 1) {
            var row = node.deleteRow(i)
        }
    }


    for (var i = 0; i < size; i += 1) {
        // let caption = node.createCaption();
        // caption.textContent = 'Матрица смежности';
        var row = node.insertRow()
        var inputsRow = []
        matrixInputs.push(inputsRow)
        for (var j = 0; j < size; j += 1) {
            var cell = row.insertCell()
            // cell.style.width = '1px'

            var input = document.createElement('input')
            inputsRow.push(input)
            // input.type = 'text'
                input.size = "1"
            // input.style.width = '100%'
            // input.style.height = '10%'
            // input.style.padding = '5px 10px';
            cell.appendChild(input)
        }
    }

    btnMatrInc.style.display = 'block';
    btnLeftInc.style.display = 'block';

}

  
  //получить значения матрицы
function getMatrixValues(matrixInputs) {
    var res = []
    for (var i = 0; i < matrixInputs.length; i += 1) {
        var inputsRow = matrixInputs[i]
        var valuesRow = []
        for (var j = 0; j < inputsRow.length; j += 1) {
            var input = inputsRow[j]
            var valueNum = parseFloat(input.value)
            if (isNaN(valueNum)) {
                valueNum = 0
            }
            valuesRow.push(valueNum)
        }
        res.push(valuesRow)
    }
    return res
}

function adjacency_to_incidence(matrixInputs) {
    var sm = getMatrixValues(matrixInputs) 
    var incidence = [];
    var N = sm.length
    

      var connection = 0;
      for(var i = 0; i < N; i++)
        for(var j = 0; j < N; j++) 
          if(sm[i][j]) 
            connection++

      for(var i=0; i<N; i++) { 
        incidence[i] = new Array
        for (var j=0;j<connection;j++){
          incidence[i][j]=0;
        }
      }

      var k = 0
      for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
          if (sm[i][j]) {
            incidence[i][k] = 1
            incidence[j][k] = -1;
            k++;  
          }
        }
      }

    return incidence;
}

function outIncidence() {
    var node = document.querySelector('.matrix-output');

    var size = document.getElementsByClassName("matrix-size")[0].value
    var incidence =  adjacency_to_incidence(matrixInputs)

    console.log(incidence)

    if (incidence[0][0] !=1) {
        alert('Ошибка')
        return 0
    }

    // var name = document.getElementById("name_inc")
    // name.style.display = 'block'

    for (var i = 0; i < size; i++) {
        var row = node.insertRow()
        var inputsRow = []
        matrixInputs.push(inputsRow)
        for (var j = 0; j < incidence[0].length; j++) {
            var cell = row.insertCell()  
            var number = document.createTextNode(incidence[i][j])
            cell.appendChild(number)
        }
    }

}

function left_inc() {
    // try {
    // var matrix = getMatrixValues(matrixInputs)
  
     var matrix = [
      [0,1,0,0,0,0,0],
      [0,0,0,0,0,1,0],
      [1,0,0,0,1,0,1],
      [0,0,0,0,0,1,0],
      [0,1,0,1,0,0,0],
      [0,0,0,0,0,0,0],
      [0,1,0,1,0,0,0]
    ]
   
    // var size = document.getElementsByClassName("matrix-size")[0].value
    var size = 7
  
    const dataEntry = document.querySelector('.dataEntry')
  
    // var name = document.getElementById("left_incedence")
    // name.style.display = 'block'
  
  
      mas = matrix.slice(0)
      valueOfInput = size
  
      const lInc = document.querySelector('.dataEntry')
  
    for(let i = 0; i < valueOfInput; i++) {
      for(let j = 0; j < valueOfInput; j++) {
          if (mas[i][j] != 1) {
              mas[i][j] = '*';
          }
      }
  }
  
  for(let i = 0; i < valueOfInput; i++) {
      for(let j = 0; j < valueOfInput; j++) {
          if (mas[i][j] == 1) {
              mas[i][j] = i + 1;
          }
      }
  }
  
  let tmp = [];
  let newMasForA = [];
  for(let i = 0; i < valueOfInput; i++) {
      for(let j = 0; j < valueOfInput; j++) {
          if (mas[j][i] != '*') {
              tmp.push(mas[j][i]);
          }
      }
      newMasForA.push(tmp);
      tmp = [];
  }
  
  for(let i = 0; i < newMasForA.length; i++){
    var i1 = i+1
    dataEntry.innerHTML += `<li class="list-group-item">G<sup>-</sup>`+'('+i1+')'+'[ '+ newMasForA[i]+' ]' + '</li>'
  }
  
  console.log(newMasForA)

  }