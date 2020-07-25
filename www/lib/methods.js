//Methods
define(['jquery','swal'], function($,swal) {
    let methods = {};
    
    //List of questions users answer
    let questionsList = [
        "Questions are displayed here and answered with the buttons below in production",
        "The output will be Gewurztraminer when you hit submit",
        "Users cannot move onto the next question until they have answered the current question",
        "In production, questions will be pulled from an SQL database prior to the website being loaded"
    ];

    //Regex checking for valid email
    const emRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    
    let questionText = $("#questionText")[0];
    let currentQuestion;
    let currentIndex = 0;
    let email = "";
    let googleDocCallback = function () { return true; };
    
    //Shuffles questions so they are asked in a random order
    methods.shuffle = function(array) {
        questionNumbers = Array.from(questionsList.keys());
        return questionNumbers.sort(() => Math.random() - 0.5);
    }

    //Accepts a valid email and turns on website when prompted
    methods.testStart = async function(){
        email = $("#email")[0].value;
        questionsShuffledIndex = methods.shuffle(questionsList);
        currentQuestion = questionsShuffledIndex[0];
        responses = [];
        currentIndex = 0;
        if(!emRegex.test(email)){
            swal({title: "Please input a valid email",
            icon: "warning",
            button: "Ok"})
            return;
        }
        $("#responseBlock")[0].style.display = "block";
        $("#navigationBlock")[0].style.display = "block";
        methods.questionNumber();
        questionText.innerText = questionsList[questionsShuffledIndex[0]];
        $("#navigationBlock")[0].style.display = "block";
        $("#startBlock")[0].style.display = "none";
    }
    
    //Unchecks all buttons
    methods.uncheckAll = function() {
        var checkboxes = $('[name=response]');
        for (var i = 0; i < checkboxes.length; i++) { 
            checkboxes[i].checked = false;
        }
    }
    
    //Rechecks question answer when a question is returned to
    methods.recheckBox = function() {
        var answer = responses[currentIndex];
        var box = $("#response" + answer)[0];
        box.checked = true;
    }
    
    //Updates question number depending on what question user is on in format of "Question x of x"
    methods.questionNumber = function(){
        let qnumber = $("#questionNumber")[0];
        qnumber.innerText = "Question " + (currentIndex + 1) + " of " + questionsList.length;
    }
    
    //Handles "next" and "back" button behaviors
    methods.testMethod = function(event){
        input = event.data.param2;
        let response = $("[name=response]");
        let responseArray = [];
        for(var i = 0; i < response.length; i++){
            responseArray.push(response[i].checked);
        }
        if(input === "next"){
            //Ignore input if user is on the last possible question
            if (currentIndex === questionsList.length - 1){
                return;
            }
            //Display a an error if no response is selected and user tries to go to the next question
            if(!responseArray.includes(true)){
                swal({title: "Please select a response",
                    icon: "warning",
                    button: "Ok"});
                return;
            }
            //Move to the next question and uncheck all response buttons
            if(currentIndex === responses.length){
                currentIndex++;
                methods.uncheckAll();
            } else {
                currentIndex++;
                if(currentIndex >= responses.length){
                    methods.uncheckAll();
                } else {
                    methods.recheckBox();
                }
            }
        } else if (input === "back") {
            //Return if person is on question 1
            if (currentIndex === 0){
                return;
            }
            //Otherwise, go back 1 question and recheck their previous answer
            currentIndex--;
            methods.recheckBox();
        }
        //Set question text to be the correct question from the list of shuffled questions and reset the question number
        questionText.innerText = questionsList[questionsShuffledIndex[currentIndex]];
        methods.questionNumber();
    }
    
    //Records user's responses to questions and turns on submit button if all questions are answered
    methods.listHandler = function(event) {
        index = event.data.param1;
        if(currentIndex > responses.length){
            responses.push(index);
        } else {
            responses[currentIndex] = index;
        }
        if(questionsList.length === responses.length){
            $("#submitbtn")[0].style.display = "block";
            $("#submitbtn")[0].style.marginBottom = "10px";
        }
    }
    
    //
    methods.enter = function() {
        //In production, score survey then give output based on which wine they were
        /*
        EX:
        for(int i = 0; i < questionsList.length; i++){
            //Unshuffle the responses to get the list in the same order as the answer key
            currentKey = responses[questionsShuffledIndex[i]];
            
            //OBJECTS FROM A DATABASE
            //wineScores is a JSON object storing each wine as an object with a corresponding score
            //wineHigh is a list of wine strings that are represented by each question, in the same order
            //wineLow is a list of wine strings that are opposite of each question, in the same order

            //Each question has 2 poles: a high and a low wine. For each question therefore, 2 wines are scored with opposite scores ranging from -2 to +2.
            //The users wine is defined by the wine with the highest number after scoring.
            wineScores[wineHigh[i]] += currentKey - 3;
            wineScores[wineLow[i]] += -1 * (currentKey - 3);
        }

        let topWine = wineScores[0];

        for(var key in wineScores){
            if(wineScores[key] > wineScore[topWine]){
                topWine = wineScores[key]
            }
        }

        //wineDescription is a JSON object that contains descriptions for each wine
        $("#OutputText").innerText = wineDescription[topWine];
        */

        //Turn on responseBlock and turn off navigation block
        $("#outputEdges")[0].style.display = "flex";
        $("#navigationBlock")[0].style.display = "none";
        $("#responseBlock")[0].style.display = "none";
        $("#outputPicture")[0].src = "Images/Gewurztraminer.jpg"
        //*In production, create logic for sending response to a database
        /*
        EX:
        jstring = JSON.stringify({
            "Email": `${email}`,
            "UserWine": `${topWine}`
        },null,2);

        request = $.ajax({
            url: "https://script.google.com/macros/s/examplestring&callback=googleDocCallback",
            type: "POST",
            dataType: 'json',
            data: `${jstring}`
        })
        */
    }
    return methods;
})