// src/types/angular-localize.d.ts
declare module '@angular/localize' {
  // Example of a basic localization function
  export function translate(message: string, params?: Record<string, string | number>): string;

  // If you have other features, like the `$localize` function
  export function $localize(message: string | TemplateStringsArray, ...args: any[]): string;

  // Optional: Type for an Error that might come from the localization process
  export interface LocalizeError {
    message: string;
    code: string;
    locale: string;
  }

  // You can add more functions or interfaces based on your usage of @angular/localize
}
