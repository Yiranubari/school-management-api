import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const logFormat = winston.format.printf(
  ({ level, message, timestamp, stack, caller }) => {
    return `${timestamp} [${level.toUpperCase()}] ${caller ? `[${caller}]` : ""}: ${stack || message}`;
  },
);

class Logger {
  constructor() {
    const logDir = "logs";

    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        logFormat,
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), logFormat),
        }),
        new DailyRotateFile({
          dirname: `${logDir}/combined`,
          filename: "combined-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "30d",
        }),
        new DailyRotateFile({
          level: "error",
          dirname: `${logDir}/errors`,
          filename: "errors-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "90d",
        }),
      ],
    });
  }

  getCallerInfo() {
    const err = new Error();
    const stack = err.stack?.split("\n");
    const callerLine = stack?.[3] || "";
    const match =
      callerLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) ||
      callerLine.match(/at\s+(.*):(\d+):(\d+)/);

    if (match) {
      const filePath = match[2] || match[1] || "";
      const fileName = path.basename(filePath);
      return `Logger.${fileName.split(".")[0]}`;
    }
    return "Logger";
  }

  log(message, meta) {
    this.logger.info(message, { ...meta, caller: this.getCallerInfo() });
  }

  error(message, error) {
    let errorDetails;

    if (error instanceof Error) {
      errorDetails = {
        message: error.message,
        stack: error.stack,
      };
    } else if (typeof error === "string") {
      errorDetails = { message: error };
    } else {
      errorDetails = { message: JSON.stringify(error) };
    }

    this.logger.error(message, {
      ...errorDetails,
      caller: this.getCallerInfo(),
    });
  }

  warn(message, meta) {
    this.logger.warn(message, { ...meta, caller: this.getCallerInfo() });
  }

  debug(message, meta) {
    this.logger.debug(message, { ...meta, caller: this.getCallerInfo() });
  }
}

export default new Logger();
