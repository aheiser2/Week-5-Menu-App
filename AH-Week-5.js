class Ability {                         // A character's abilities and scores
    constructor(ability, score){
        this.ability = ability;
        this.score = score;
    }

    describe(){
        return `${this.ability} score is ${score}.`;
    }
}



class Characteristics {                 // A character's race and class
    constructor(race, rpgClass){
        this.race = race;
        this.rpgClass = rpgClass;
    }

    describe(){
        return `This character is a ${this.race} ${this.rpgClass}.`;
    }
}



class Character {                       // A character that can have a race, class, and abilities with scores
    constructor(name){
        this.name = name;
        this.characteristics = [];
        this.abilities = [];
    }

    addAbility(ability){                                  // Allows an ability to be added
        if (ability instanceof Ability){
            this.abilities.push(ability);
        } else {
            throw new Error(`You can only add an instance of Ability. Argument is not an Ability: ${ability}`);
        }
    }

    addRaceAndClass(race, rpgClass){                     // Allows race and class to be added
        if (race, rpgClass instanceof Characteristics){
            this.characteristics.push(race, rpgClass);
        } else {
            throw new Error(`You can only add an instance of Race and Class. Argument is not a Race or Class: ${race} ${rpgClass}`);
        }
    }

    describe(){
        return `${this.name} is a ${race} ${rpgClass} and has the following abilities: ${this.abilities.join('\n')}`;
    }
}


class Menu {
    constructor(){
        this.characters = []
        this.selectedCharacter = null; 
    }

    start(){
        let selection = this.showMainMenuOptions();         // A main menu to start from where you can create, view, 
                                                            //or delete characters, or display all characters made
        while (selection != 0){
            switch (selection){
                case '1': 
                    this.createCharacter();
                    break;
                case '2':
                    this.viewCharacter();
                    break;
                case '3':
                    this.deleteCharacter();
                    break;
                case '4':
                    this.displayCharacters();
                    break;
                default: 
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert("Good-bye!")
    }

    showMainMenuOptions(){                                  // Shows the main menu options
        return prompt(`
            0) Exit
            1) Create New Character
            2) View Character
            3) Delete Character
            4) Display All Characters
        `);
    }

    showCharacterMenuOptions(characterInfo) {               // Shows the character menu options
        return prompt(`
        0) Back
        1) View Characteristics
        2) View Abilities
        ----------------------
        ${characterInfo}
        `);
    }

    showCharacteristicsMenuOptions(characterInfo){          // Shows the race and class menu options
        return prompt(`
        0) Back
        1) Enter Race and Class
        2) Change Race and Class
        3) Delete Race and Class
        ----------------------
        // ${characterInfo}
        `);
    }

    showAbilityMenuOptions(characterInfo){                  // Shows the ability menu options
        return prompt(`
        0) Back
        1) Create Ability
        2) Change Ability
        3) Delete Ability
        ----------------------
        ${characterInfo}
        `);
    }

    joinCharacteristics(){                                                                 // Joins the characteristics of a character into a string so that
    var description1 = '';                                                                 // you can see it in later code without having to reuse code
        for (let i = 0; i < this.selectedCharacter.characteristics.length; i++){
            description1 += i + ') ' + this.selectedCharacter.characteristics[i].race + ' '
            + this.selectedCharacter.characteristics[i].rpgClass + '\n';
        }
        return description1;
    }

    joinAbilities(){                                                                       // Joins the abilities of a character into a string so that       
        var description2 = '';                                                             // you can see it in later code without having to reuse code
        for (let i = 0; i < this.selectedCharacter.abilities.length; i++){
            description2 += i + ') ' + this.selectedCharacter.abilities[i].ability 
            + ' - ' + this.selectedCharacter.abilities[i].score + '\n';
        }
        return description2;
    }


    displayCharacters(){                                                                   // Joins all the characters made by the user in one string in
        let characterString = '';                                                          // order to display them together
        for (let i = 0; i < this.characters.length; i++){
            characterString += i + ') ' + this.characters[i].name + '\n';
        }
        alert(characterString);
    }  

    isItUndefined(){                                                                       // Tests to see if either of the race/class or abilities are undefined
        let x = this.joinCharacteristics();                                                // so that they don't show up on the various menus if they are
        let y = this.joinAbilities();
        let description = ''
        if(x == undefined && y == undefined){
            description = "Character Name: " + this.selectedCharacter.name + '\n' ;
        }else if(x == undefined){
            description = "Character Name: " + this.selectedCharacter.name + '\n' + y + '\n' ;
        }else if(y == undefined){
            description = "Character Name: " + this.selectedCharacter.name + '\n' + x + '\n' ;
        }else{
            description = "Character Name: " + this.selectedCharacter.name + '\n' + x + '\n' + y + '\n' ;
        }
        return description;
    }

    createCharacter(){                                                                  // Creates a character based on the name entered by the user
        let name = prompt(`Enter name for new character: `);
        this.characters.push(new Character(name));
    }

    viewCharacteristics(){                                                              // Allows the user to see the characteristics menu to then create, change, 
        let index = prompt(`Enter the index of the character you wish to edit:`);       // or delete a character's race/class
        if (index > -1 && index < this.characters.length){
            this.selectedCharacter = this.characters[index];
            var description1 = this.isItUndefined();
            
            let selection = this.showCharacteristicsMenuOptions(description1);
                switch (selection){
                    case '1': 
                         this.createRaceAndClass();
                        break;
                    case '2':
                        this.changeRaceAndClass();
                        break;
                    case '3': 
                        this.deleteRaceAndClass();

                }   
        }
    }

    viewAbilities(){                                                                    // Allows the user to see the abilities menu to then create, change,
        let index = prompt(`Enter the index of the character you wish to edit:`);       // or delete a character's abilities
        if (index > -1 && index < this.characters.length){
            this.selectedCharacter = this.characters[index];
            var description2 = this.isItUndefined();
          
            let selection = this.showAbilityMenuOptions(description2);
                switch (selection){
                    case '1': 
                        this.createAbility();
                        break;
                    case '2':
                        this.changeAbility();
                        break;
                    case '3': 
                        this.deleteAbility();

                }
            
        }
    }

    viewCharacter(){                                                                    // Allows the user to see the character menu to choose if they want to 
        let index = prompt(`Enter the index of the character you wish to view:`);       // or edit a character's race/class or abilities
        if (index > -1 && index < this.characters.length){
            this.selectedCharacter = this.characters[index];
            let description = this.isItUndefined();
            
            let selection = this.showCharacterMenuOptions(description);
                switch (selection){
                    case '1': 
                        this.viewCharacteristics();
                        break;
                    case '2':
                        this.viewAbilities();
                }
            }
    }

    deleteCharacter(){                                                                  // Deletes a created character
        let index = prompt('Enter the index of the character you wish to delete:');
        if (index > -1 && index < this.characters.length) {
            this.characters.splice(index, 1);
        }
    }

    createAbility(){                                                                    // Creates an ability with a score based on user input
        let ability = prompt('Enter ability: ');
        let score = prompt('Enter ability score: ');
        this.selectedCharacter.abilities.push(new Ability(ability, score));
    }

    changeAbility(){                                                    // Changes the ability score of a chosen ability that's already been created by the user
        let index = prompt('Enter the index of the ability you wish to change: ');
        let changedScore = prompt('Enter the new score: ');
        if (index > -1 &&  index < this.selectedCharacter.abilities.length){
            this.selectedCharacter.abilities[index].score = changedScore;
        }
    }    

    deleteAbility(){                                                                   // Deletes an ability and its score from a character  
        let index = prompt('Enter the index of the ability you wish to delete: ');
        if (index > -1 &&  index < this.selectedCharacter.abilities.length){
            this.selectedCharacter.abilities.splice(index, 1);
        }
    }

    createRaceAndClass(){                                                  // Creates a race and class based on user input, and only allows one to exist at a time
        if(this.selectedCharacter.characteristics.length === 0){
        let race = prompt('Enter race: ');
        let rpgClass = prompt('Enter class: ');
        this.selectedCharacter.characteristics.push(new Characteristics(race, rpgClass));
        }else{
            alert("You can only have one race and class!");
        }
    }

    changeRaceAndClass(){                                                   // Changes the selected character's race and class based on new user input
        let changedRace = prompt('Enter new race: ');
        let changedClass = prompt('Enter new class: ');    
        this.selectedCharacter.characteristics[0].race = changedRace;
        this.selectedCharacter.characteristics[0].rpgClass = changedClass;
    }    

    deleteRaceAndClass(){                                                   // Deletes the selected character's race and class
        this.selectedCharacter.characteristics.pop();
    }
}

let menu = new Menu();
menu.start();

