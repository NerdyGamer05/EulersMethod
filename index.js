//const math = require('mathjs');
import math from './math.min.js'
//X[n] => Y[n-1] + Δx * y'(X[n-1]Y[n-1])

async function calculate(yPrime, xVal, yVal, h, desiredX) {
        let val = (desiredX - xVal) / 0.1;
        let x = xVal;
        let num = yVal;

        for (let i = 0; i < val; i++) {
            num = await nextStep(yPrime, x, num, h);
            if (i === val-1) { break }
            x = +(x + h).toFixed(12);
        }
        return "Using Euler's method method to esimate y(" + desiredX + ") is " + num;  
        //return "An error has occured. Please check that you inputted value numbers."
}

async function nextStep(equation, x, y, h) {
    let newVal = await math.evaluate(equation.replace(/x/g, "(" + x + ")").replace(/y/g, "(" + y + ")"));
    return await (y + (h * newVal));
}

calculate('2xy', 1, 3, 0.1, 2).then(x => console.log(x));