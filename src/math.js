
const  calcTip = (price, perTip = .25) => price + (price * perTip)


const fahrenheitToCelsius = temp => (temp - 32) / 1.8
const celsiusToFahrenheit = temp => (temp * 1.8) + 32

module.exports = {
    calcTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}