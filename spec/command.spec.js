const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  it("constructor sets command type", function() {
    const cmdTest2_1 = new Command('MODE_CHANGE', 'LOW_POWER');
    expect(cmdTest2_1.commandType).toBe('MODE_CHANGE');

    const cmdTest2_2 = new Command('MOVE', 3);
    expect(cmdTest2_2.commandType).toBe('MOVE');

    const cmdTest2_3 = new Command('STATUS_CHECK');
    expect(cmdTest2_3.commandType).toBe('STATUS_CHECK');
  });

  it("constructor sets a value passed in as the 2nd argument", function() {
    const cmdTest3_1 = new Command('MODE_CHANGE', 'LOW_POWER');
    const cmdTest3_2 = new Command('MOVE', 3);

    expect(cmdTest3_1.value).toBe('LOW_POWER');
    expect(cmdTest3_2.value).toBe(3);
  });

});