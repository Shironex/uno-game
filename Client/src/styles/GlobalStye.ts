import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *,*::before,*::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        scroll-behavior: smooth;
    }
    body {
        background: #1d1e27;
        font-family: 'Roboto', sans-serif;
        letter-spacing: .6px;
        /* Hide scrollbar */
        ::-webkit-scrollbar {
            display: none;
        }
        
        
    }
`;

        /* background: ${({ theme }) => theme.colors.background_second};
        color: ${({ theme }) => theme.colors.text}; */