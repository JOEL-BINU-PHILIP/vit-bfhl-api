class DataProcessor {
    /**
     * Process an array and categorize its elements
     * @param {Array} data - Input array containing mixed data types
     * @returns {Object} Processed data object
     */
    static processArray(data) {
        const result = {
            oddNumbers: [],
            evenNumbers: [],
            alphabets: [],
            specialCharacters: [],
            sum: "0",
            concatString: ""
        };

        let numSum = 0;
        const alphabetChars = [];

        for (const item of data) {
            const str = String(item).trim();

            if (str === '') continue; // Skip empty strings

            // Check if it's a number
            if (this.isNumeric(str)) {
                const num = parseInt(str, 10);
                numSum += num;

                if (num % 2 === 0) {
                    result.evenNumbers.push(str);
                } else {
                    result.oddNumbers.push(str);
                }
            }
            // Check if it's alphabetic
            else if (this.isAlphabetic(str)) {
                result.alphabets.push(str.toUpperCase());

                // Collect individual characters for concatenation
                for (const char of str) {
                    if (this.isAlphabetic(char)) {
                        alphabetChars.push(char.toLowerCase());
                    }
                }
            }
            // Otherwise, it's a special character
            else {
                result.specialCharacters.push(str);
            }
        }

        // Set sum as string
        result.sum = numSum.toString();

        // Create concatenated string with alternating caps in reverse order
        result.concatString = this.createAlternatingCapsString(alphabetChars);

        return result;
    }

    /**
     * Check if a string represents a numeric value
     * @param {string} str - String to check
     * @returns {boolean} True if numeric
     */
    static isNumeric(str) {
        return /^-?\d+$/.test(str);
    }

    /**
     * Check if a string contains only alphabetic characters
     * @param {string} str - String to check
     * @returns {boolean} True if alphabetic
     */
    static isAlphabetic(str) {
        return /^[a-zA-Z]+$/.test(str);
    }

    /**
     * Create a string with alternating caps from alphabetic characters in reverse order
     * @param {Array} alphabetChars - Array of alphabetic characters
     * @returns {string} Concatenated string with alternating caps
     */
    static createAlternatingCapsString(alphabetChars) {
        if (alphabetChars.length === 0) return "";

        // Reverse the array
        const reversedChars = [...alphabetChars].reverse();

        // Apply alternating caps (start with lowercase)
        return reversedChars.map((char, index) => {
            return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        }).join('');
    }
}

module.exports = DataProcessor;