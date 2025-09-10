import { Route, Routes } from 'react-router-dom';
import Notice from '../../pages/Crew/Notice/Notice';
import NoticeEdit from '../../pages/GlobalNotice/Edit/NoticeEdit';
import NoticeDetail from '../../pages/GlobalNotice/NoticeDetail/NoticeDetail';
import NoticeReg from '../../pages/GlobalNotice/NoticeReg/NoticeReg';

export function NoticeRoutes(props) {
  return (
    <>
      <Route path="/notices" element={<Notice />} />
      <Route path="/notices/register" element={<NoticeReg />} />
      <Route path="/notices/:noticeId" element={<NoticeDetail />} />
      <Route path="/notices/:noticeId/edit" element={<NoticeEdit />} />
    </>
  );
}
