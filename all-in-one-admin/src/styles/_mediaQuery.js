import { css } from 'styled-components';

// https://www.styled-components.com/docs/advanced#media-templates
// ex :  ${media.desktop`width: 768px;`}

const sizes = {
    desktop: 1024,
    tablet: 768,
    mobile: 450,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${sizes[label] / 16}em) {
        ${css(...args)};
        }
    `;
    return acc;
}, {});