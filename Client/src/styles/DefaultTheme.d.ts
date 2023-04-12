import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      background_alpha: string;
      background_border: string;
      background_second: string;
      background_third: string;
      text: string;
      text_gray: string;
      primary: string;
      primary_hover: string;
    };
    fonts: string[];
    
  }
}
