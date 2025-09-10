import { Route, Routes } from 'react-router-dom';
import MypageModify from '../pages/Mypage/Modify/MypageModify';
import Wishlist from '../pages/Mypage/Wishlist/Wishlist';
import Post from '../pages/Mypage/Post/Post';
import Welcome from '../pages/Mypage/Welcome/Welcome';
import MyAsk from '../pages/Mypage/MyAsk/MyAsk';
import MyGathering from '../pages/Mypage/Gathering/MyGathering';

function MyPageRoute(props) {
  return (
    <Routes>
      <Route path='/' element={<MypageModify />}/>
      <Route path='/wish' element={<Wishlist />}/>
      <Route path='/post' element={<Post />}/>
      <Route path='/welcome' element={<Welcome />} />
      <Route path='/ask' element={<MyAsk />} />
      <Route path='/gathering' element={<MyGathering />} />
    </Routes>
  );
}

export default MyPageRoute;