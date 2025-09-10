import { Route, Routes } from 'react-router-dom';
import AskAnswer from '../pages/Admin/Ask/AskAnswer';
import SearchCrew from '../pages/Admin/SearchCrew/SearchCrew';
import SearchUser from '../pages/Admin/SearchUser/SearchUser';

function AdminRoute(props) {
  return (
    <Routes>
      <Route path="/user-info" element={<SearchUser />} />
      <Route path="/crew-info" element={<SearchCrew />} />
      <Route path="/ask" element={<AskAnswer />} />
    </Routes>
  );
}

export default AdminRoute;