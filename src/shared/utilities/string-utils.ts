export class StringUtils {
    static isEmpty(str: string): boolean {
      return !str || str.trim().length === 0;
    }
  
    static capitalize(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
  