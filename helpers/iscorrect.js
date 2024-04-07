const Card = require('../model/card.config');

export async function matchans(question_number, answer) {
    try {
        // Find the card in question database 
        //  If it exists then return true else false
        // if ans matched return true 
        // if not matched return false
    }
    catch (e) {
        resizeBy.status(400).send(e)
    }
}

// Example usage
const questionNumber = 123; // Question number you want to match
const providedAnswer = "your_provided_answer"; // Answer provided by the user
matchans(questionNumber, providedAnswer)
    .then(matched => {
        if (matched) {
            console.log("Answer is correct!");
        } else {
            console.log("Answer is incorrect!");
        }
    })
    .catch(error => console.error(error));
