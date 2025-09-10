import { css } from "@emotion/react";

export const container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: auto;

    & > div {
    width: 40rem;
    height: 60rem;
    background-color: #ebebeb;
    }
`;