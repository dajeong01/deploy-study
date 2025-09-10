import { Route, Routes } from "react-router-dom";
import CrewAlbums from "../../pages/Crew/Albums/CrewAlbums";
import CrewInfo from "../../pages/Crew/Information/CrewInfo";
import Member from "../../pages/Crew/Member/Member";
import Message from "../../pages/Crew/Message/Message";
import Report from "../../pages/Crew/Report/Report";
import Setting from "../../pages/Crew/Setting/Setting";
import Welcome from "../../pages/Crew/Welcome/Welcome";
import { GatheringRoutes } from "./GatheringRoutes";
import { FreeBoardRoutes } from "./FreeBoardRoutes";
import { NoticeRoutes } from "./NoticeRoutes";


export default function CrewRoutes({ isCrewLeader }) {
  return (
    <Routes>
      <Route path="/" element={<CrewInfo />} />
      <Route path="/welcome" element={<Welcome isCrewLeader={isCrewLeader} />} />
      <Route path="/members" element={<Member />} />
      <Route path="/albums" element={<CrewAlbums />} />
      <Route path="/report" element={<Report isCrewLeader={isCrewLeader} />} />
      <Route path="/message" element={<Message isCrewLeader={isCrewLeader} />} />
      <Route path="/setting" element={<Setting />} />
      {FreeBoardRoutes()}
      {GatheringRoutes()}
      {NoticeRoutes()}
    </Routes>
  );
}

