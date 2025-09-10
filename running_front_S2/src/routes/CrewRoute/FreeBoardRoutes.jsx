import { Route, Routes } from 'react-router-dom';
import FreeEdit from '../../pages/Crew/FreeBoard/Edit/FreeEdit';
import FeedDetail from '../../pages/Crew/FreeBoard/FeedDetail/FeedDetail';
import FeedReg from '../../pages/Crew/FreeBoard/FeedReg/FeedReg';
import FreeBoard from '../../pages/Crew/FreeBoard/FreeBoard';

export function FreeBoardRoutes(props) {
  return (
    <>
      <Route path="/freeBoards" element={<FreeBoard />} />
      <Route path="/freeBoards/register" element={<FeedReg />} />
      <Route path="/freeBoards/:freeId" element={<FeedDetail />} />
      <Route path="/freeBoards/:freeId/edit" element={<FreeEdit />} />
    </>
  );
}
