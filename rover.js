class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL'
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let results = [];

      for (let i = 0; i < message.commands.length; i++) {
         let command = message.commands[i];
         let commandResult = {completed: true};

         switch (command.commandType) {
            case 'MODE_CHANGE':
               this.mode = command.value;
               break;
            case 'MOVE':
               if (this.mode === 'LOW_POWER') {
                  commandResult.completed = false;
               } else {
                  this.position = command.value;
               }
               break;
            case 'STATUS_CHECK':
               commandResult.roverStatus = {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               };
               break;
            default:
               commandResult.completed = false;
         }
         results.push(commandResult);
      }

      let recieved = {'message': message.name, 'results': results};
      return recieved;
   }

}

module.exports = Rover;