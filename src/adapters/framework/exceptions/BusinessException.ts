class BusinessException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default BusinessException;
