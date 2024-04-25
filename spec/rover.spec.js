const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {

    let testRover3_1 = new Rover(11800);
    expect(testRover3_1.position).toBe(11800);
    expect(testRover3_1.mode).toBe('NORMAL');
    expect(testRover3_1.generatorWatts).toBe(110)
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let testRover3_2 = new Rover(98382);
    let response = testRover3_2.receiveMessage(message); 
    expect(response.message).toBe('Test message with two commands');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let testRover3_3 = new Rover(98382);
    let response = testRover3_3.receiveMessage(message); 
    console.log(response);
    expect(response.results.length).toBe(2);
  });

  it("responds correctly to the status check command", function() {
    let testRover3_4 = new Rover(98382);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status check command', commands);
    let response = testRover3_4.receiveMessage(message);

    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(98382);
  });

  it("responds correctly to the mode change command", function() {
    let testRover3_5 = new Rover(100);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Mode change to LOW_POWER', commands);
    let response = testRover3_5.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(testRover3_5.mode).toBe('LOW_POWER');

    commands = [new Command('MODE_CHANGE', 'NORMAL')];
    message = new Message('Mode change to NORMAL', commands);
    response = testRover3_5.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(testRover3_5.mode).toBe('NORMAL');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let testRover3_6 = new Rover(8675309);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Change to LOW_POWER', commands);
    testRover3_6.receiveMessage(message);

    commands = [new Command('MOVE', 100)];
    message = new Message('Attempt to move in LOW_POWER', commands);
    let response = testRover3_6.receiveMessage(message);
    
    expect(response.results[0].completed).toBe(false);
    expect(testRover3_6.position).toBe(8675309);
  });

  it("responds with the position for the move command", function() {
    let testRover3_7 = new Rover(100);
    let commands = [new Command('MOVE', 200)];
    let message = new Message('Attempt to move normally', commands);
    testRover3_7.receiveMessage(message);

    expect(testRover3_7.position).toBe(200);
  });
});
