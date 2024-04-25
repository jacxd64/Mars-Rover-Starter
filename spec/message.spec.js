const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws error if name is NOT passed into constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name parameter required.'));
    });

    it("constructor sets name", function() {
        const msgTest2_1 = new Message("changing mode to low power", []);
        expect(msgTest2_1.name).toBe("changing mode to low power");
    });

    it("contains a commands array passed into the constructor as the 2nd argument", function() {
        let testObj = {commandType: 'MODE_CHANGE', value: 'LOW_POWER'};
        let testArr = [testObj]
        const msgTest3_1 = new Message("changing mode to low power", testArr);
        expect(msgTest3_1.commands).toBe(testArr);
    })

});
