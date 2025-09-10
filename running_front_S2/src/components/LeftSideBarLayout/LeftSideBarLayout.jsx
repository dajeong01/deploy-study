/** @jsxImportSource @emotion/react */
import * as s from './styles';
import ContentLayout from '../ContentLayout/ContentLayout';

function LeftSideBarLayout({ profileSection, navigationButtons, bottomSection, children }) {
  return (
      <div css={s.layout}>
        <div css={s.leftBox}>
          <div>
            {profileSection}
            <div css={s.buttonContainer}>
              {navigationButtons}
            </div>
          </div>
          {bottomSection}
        </div>
        <ContentLayout>
          {children}
        </ContentLayout>
      </div>
  );
}

export default LeftSideBarLayout;