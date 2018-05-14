const lib = require('../exercise1');
const args = [
    'a',
    {},
    null,
    false
]

describe('___FIZZBUZZ', () => {
    for (arg of args) {
        it('should throw an error if input is not an number', () => {
            expect(() => {
                lib.fizzBuzz(arg)
            }).toThrow();
        })
    }

    it('should return fizzbuzz', () => { 
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz')
    })
    it('should return fizz', () => { 
        const result = lib.fizzBuzz(3);
        expect(result).toBe('Fizz')
    })
    it('should return buzz', () => { 
        const result = lib.fizzBuzz(5);
        expect(result).toBe('Buzz')
    })
    it('should return the same number', () => { 
        const result = lib.fizzBuzz(1);
        expect(result).toBe(1)
    })
})
