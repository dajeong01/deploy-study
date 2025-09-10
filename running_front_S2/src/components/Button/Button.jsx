/** @jsxImportSource @emotion/react */
import * as s from './styles';

function Button({ children, ...props }) {
  return (
    <button css={s.styleButton} {...props}>
      {children}
    </button>
  );
}

export default Button;
