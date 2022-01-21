async function calculate(yPrime, xVal, yVal, h, desiredX) {
  let val = (desiredX - xVal) / 0.1;
  let x = xVal;
  let num = yVal;

  for (let i = 0; i < val; i++) {
    num = await nextStep(yPrime, x, num, h);
    if (i === val - 1) { break }
    x = +(x + h).toFixed(12);
  }
  return "Using Euler's method method to esimate <strong>y(" + desiredX + ")</strong> is <strong>" + num + "</strong>.";
  //return "An error has occured. Please check that you inputted value numbers."
}

async function nextStep(equation, x, y, h) {
  let newVal = await math.evaluate(equation.replace(/x/g, "(" + x + ")").replace(/y/g, "(" + y + ")"));
  return await (y + (h * newVal));
}

function run() {
  let yPrime = document.getElementById('yPrime').value;
  let deltaX = document.getElementById('deltaX').value;
  let known = document.getElementById('known').value;
  let desiredVal = document.getElementById('desiredVal').value;

  let xVal = known.substring(known.indexOf('(') + 1, known.indexOf(','));
  let yVal = known.substring(known.indexOf(',') + 1, known.indexOf(')'));
  calculate(yPrime, Number(xVal), Number(yVal), Number(deltaX), Number(desiredVal))
    .then(x => document.getElementById('answer').innerHTML = x);
}

let solveButton = document.getElementById('solve');
solveButton.onclick = run;