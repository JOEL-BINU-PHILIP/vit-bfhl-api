/**
 * Simple logger utility for consistent logging across the application
 */
class Logger {
    static getTimestamp() {
        return new Date().toISOString();
    }

    static formatMessage(level, message, meta = {}) {
        const timestamp = this.getTimestamp();
        const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;
    }

    static info(message, meta = {}) {
        console.log(this.formatMessage('info', message, meta));
    }

    static warn(message, meta = {}) {
        console.warn(this.formatMessage('warn', message, meta));
    }

    static error(message, meta = {}) {
        console.error(this.formatMessage('error', message, meta));
    }

    static debug(message, meta = {}) {
        if (process.env.NODE_ENV === 'development') {
            console.log(this.formatMessage('debug', message, meta));
        }
    }
}

module.exports = Logger;