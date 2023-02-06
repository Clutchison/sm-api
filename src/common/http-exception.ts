export default class HttpException extends Error {
  public statusCode?: number;
  public message: string;
  public details?: {};

  constructor(statusCode: number, message: string, details?: any) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }

  public toJson() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      details: this.details,
    }
  }
}