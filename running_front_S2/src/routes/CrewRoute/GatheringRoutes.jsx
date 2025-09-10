import { Route, Routes } from 'react-router-dom';
import Gathering from '../../pages/Crew/Gathering/Gathering';
import GatheringRegister from '../../pages/Crew/Gathering/GatheringRegister/GatheringRegister';
import GatheringManagement from '../../pages/Crew/GatheringManagement/GatheringManagement';
import GatheringModify from '../../pages/Crew/GatheringManagement/GatheringModify/GatheringModify';

export function GatheringRoutes(props) {
  return (
    <>
      <Route path="/gathering/*" element={<Gathering />} />
      <Route path="/gathering/register" element={<GatheringRegister />} />
      <Route path="/gathering-management" element={<GatheringManagement />} />
      <Route path="/gathering-management/:gatheringId" element={<GatheringModify />} />
    </>
  );
}