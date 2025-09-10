import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  color: #222222;

  @media (max-width: 98rem) {
    width: 92%;
    padding: 1.6rem;
  }
`;

export const topBar = css`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.8rem;

  button {
    padding: 0.8rem 1.2rem;
    border-radius: 1.2rem;
    background: #ffffff;
    color: #222222;
    border: 0.2rem solid #e7e9f0;
    cursor: pointer;
    transition: transform 0.08s ease, background 0.15s ease;

    &:hover {
      transform: translateY(-1px);
      background: #e9ecf3;
    }
  }

  span {
    color: #94a3b8;
  }
`;

export const titleCss = css`
  margin: 0.4rem 0 0.6rem;
`;

export const metaCss = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;

  .dot {
    margin-left: 2rem;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: none;
    display: inline-block;
  }
  button {
    padding: 0.6rem 1rem;
    border-radius: 1rem;
    background: #f1f3f7;
    color: #141518;
    border: 0.1rem solid #e7e9f0;
  }
`;

export const metaSpacer = css`
  margin-left: auto;
`;

export const contentCss = css`
  line-height: 1.7;
  word-break: break-word;

  border-bottom: 0.1rem solid #dbdbdb;
  border-top: 0.1rem solid #dbdbdb;

  img,
  video,
  iframe {
    max-width: 60%;
    height: auto;
    border-radius: 0.6rem;
  }

  p {
    margin: 1rem 0;
  }
`;

export const inputRow = css`
  margin-top: 1.6rem;
  display: flex;
  gap: 1rem;
`;

export const input = css`
  height: 3.425rem;
  flex: 1;
  background: #fafbfe;
  color: #222222;
  border: 0.1rem solid #dfe3ea;
  border-radius: 1rem;
  outline: none;
  &::placeholder {
    color: #9aa0aa;
  }
  &:hover {
    border-color: #cfd5df;
  }
  &:focus {
    border-color: #111111;
    background: #ffffff;
  }
`;

export const btnPrimary = css`
  padding: 1.2rem 1.8rem;
  border-radius: 1rem;
  background: #111111;
  color: #ffffff;
  border: 0.1rem solid #111111;
  cursor: pointer;
  transition: 0.15s;
  &:hover {
    transform: translateY(-1px);
    background: #1a1a1a;
  }
  &:disabled {
    background: #999;
    border-color: #999;
    cursor: not-allowed;
  }
`;

export const btnOutline = css`
  padding: 1.2rem 1.8rem;
  border-radius: 1rem;
  background: #ffffff;
  color: #111111;
  border: 0.15rem solid #111111;
  cursor: pointer;
  transition: 0.15s;
  &:hover {
    transform: translateY(-1px);
  }
`;

export const commentList = css`
  margin-top: 1.6rem;
`;

export const commentItem = css`
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem 0;
  border-bottom: 0.1rem solid #eef0f4;
`;

export const avatar = css`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-top: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
  background: #e8e8e8;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const commentBody = css`
  flex: 1;
  .head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.2rem;
    time {
      color: #94a3b8;
    }
    button {
      padding: 0.6rem 1rem;
      border-radius: 0.8rem;
      background: #f1f3f7;
      border: 0.1rem solid #e7e9f0;
      &:hover {
        background: #e9ecf3;
      }
    }
  }
  .content {
    white-space: pre-wrap;
  }
`;

export const editRow = css`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.8rem;
  input {
    flex: 1;
    padding: 1rem 1.2rem;
    border-radius: 0.6rem;
    border: 0.1rem solid #dfe3ea;
    background: #fafbfe;
    &:focus {
      outline: none;
      border-color: #111111;
      background: #ffffff;
      box-shadow: 0 0 0 0.8rem rgba(17, 17, 17, 0.06);
    }
  }
`;

export const moreRow = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const moreBtn = css`
  padding: 1rem 1.4rem;
  border-radius: 1rem;
  background: #f1f3f7;
  color: #141518;
  border: 0.1rem solid #e7e9f0;
  cursor: pointer;
  &:hover {
    background: #e9ecf3;
    transform: translateY(-1px);
  }
`;

export const headSpacer = css`
  margin-left: auto;
`;