import axios from 'axios';

export const callnextquestion = async (question_number) => {
    try {
        const nextquestion_number = question_number + 1;

        // Make an HTTP GET request to the next question route
        const response = await axios.get(`/getone/${nextquestion_number}`);

        // Handle the response as needed
        console.log(response.data); // Assuming the response contains some data
    } catch (error) {
        console.error('Error calling next question:', error);
        // Handle the error as needed
    }
};