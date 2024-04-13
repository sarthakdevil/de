import { Question } from "../model/queation.config.js";

export async function matchans(question_number, answer) {
    try {
        // Find the question in the database
        const question = await Question.findOne({ questionId : question_number }).select("+answer");
        // If question doesn't exist, return false
        if (!question) {
            return false;
        }

        // Compare provided answer with expected answer
        const isMatch = question.answer === answer;
        return isMatch;
        
    } catch (error) {
        console.error('Error matching answer:', error);
        // Handle the error as needed
        return false;
    }
}
