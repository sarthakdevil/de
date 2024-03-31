import jwt from  'jsonwebtoken';
const secretKey = 'your_secret_key'; // Replace 'your_secret_key' with your actual secret key

export function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}