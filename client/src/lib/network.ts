export class BaseURL extends URL {
  constructor(path: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_BASE_URL is not defined in environment variables.');
    }
    super(path, baseUrl);
  }
}
