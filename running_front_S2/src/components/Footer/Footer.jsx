import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer css={s.footer}>
      <div css={s.links}>
        <a href="/">크루정보</a>
        <a href="/">커뮤니티</a>
        <a href="/">대회일정</a>
        <a href="/">문의사항</a>
      </div>

      <div css={s.socialIcons}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </div>

      {/* 한 줄로 나열 */}
      <div css={s.contact}>
        <div>Email: info@busanrun.com</div>
        <div>Tel: 051-123-4567</div>
        <div>Address: 부산광역시 해운대구 러닝로 123</div>
      </div>

      <div css={s.copyright}>
        &copy; 2025 Busan Running Crew. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
