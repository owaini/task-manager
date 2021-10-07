
const {calcTip,fahrenheitToCelsius,celsiusToFahrenheit} = require('../src/math')

test('calc price with tip', ()=> {
     
    const total = calcTip(10, .3)
    expect(total).toBe(13)


    // if(total !== 13) {
    //     throw new Error('should equal 13,but  Got ' + total)
    // }
})

test('from Fahrenheit to Celsius', ()=> {

    const temp = fahrenheitToCelsius(32)

    expect(temp).toBe(0)
})
test('from Celsius to Fahrenheit', ()=> {

     const temp2 = celsiusToFahrenheit(0)

    expect(temp2).toBe(32)
})