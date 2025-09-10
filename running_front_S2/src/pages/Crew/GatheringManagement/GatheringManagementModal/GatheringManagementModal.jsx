/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import * as s from "./styles";
import {
  reqGatheringParticipants,
  reqUpdateParticipantsAttendance,
} from "../../../../api/Crew/gatheringApi";
import { cancelButton } from "../GatheringModify/styles";

function GatheringManagementModal({ isOpen, onClose, crewId, gatheringId }) {
  const [participants, setParticipants] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    if (!isOpen || !gatheringId) return;

    const fetchParticipants = async () => {
      try {
        const res = await reqGatheringParticipants(crewId, gatheringId);
        setParticipants(res.data);
        setCheckedState(res.data.map((p) => p.attendanceStatus === 1));
      } catch (err) {
        console.error("참석자 불러오기 실패:", err);
      }
    };

    fetchParticipants();
  }, [isOpen, crewId, gatheringId]);

  const handleCheckboxChange = (index) => {
    const updated = [...checkedState];
    updated[index] = !updated[index];
    setCheckedState(updated);
  };

  const handleSave = async () => {
    const payload = participants.map((p, index) => ({
      userId: p.userId,
      attendanceStatus: checkedState[index] ? 1 : 0,
    }));

    console.error("저장용 payload:", payload);

    try {
      await reqUpdateParticipantsAttendance(crewId, gatheringId, payload);
      alert("참석 상태와 km가 저장되었습니다.");
      onClose();
    } catch (err) {
      console.error(err);
      alert("저장 실패");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box css={s.modalBox}>
        <div>참석자 ({participants.length}명)</div>
        <table css={s.participantTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>참석자</th>
              <th>참석여부</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, index) => (
              <tr key={p.userId} css={s.participantRow}>
                <td>{index + 1}</td>
                <td css={s.participantCell}>
                  <img src={p.picture} alt="" css={s.participantImg} />
                  <span>
                    {p.nickname} ({p.fullName})
                  </span>
                </td>
                <td>
                  <Checkbox
                    checked={checkedState[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div css={s.buttonContainer}>
          <Button css={s.cancelButton} onClick={onClose}>
            취소
          </Button>
          <Button css={s.saveButton} onClick={handleSave}>
            저장
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default GatheringManagementModal;
