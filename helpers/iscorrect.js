import { QuestionPanel } from '../controllers/question.controller.js';

export async function matchans(question_number, answer) {
    try {
        // Find the question in the database
        const question = await QuestionPanel.findOne({ question_number });

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
