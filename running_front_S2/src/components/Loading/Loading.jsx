/** @jsxImportSource @emotion/react */
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";

const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: gray;
`;

function Loading({isLoading}) {

  return (
    <div css={layout}>
        <BounceLoader 
          loading={isLoading}
          size={400}
          color="black"
        />
    </div>
  );
}

export default Loading;