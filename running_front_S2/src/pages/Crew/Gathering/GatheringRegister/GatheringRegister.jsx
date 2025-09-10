/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate, useParams } from "react-router-dom";
import { reqRegisterGathering } from "../../../../api/Crew/gatheringApi";
import ContentLayout from "../../../../components/ContentLayout/ContentLayout";
import { useCrewStore } from "../../../../stores/useCrewStroes";

function GatheringRegister() {
  const mapLoader = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });

  const { crewId } = useCrewStore();
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(<></>);
  const [preview, setPreview] = useState({ thumbnailPicture: "" });
  const [addressText, setAddressText] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const [gatheringData, setGatheringData] = useState({
    title: "",
    content: "",
    thumbnailPicture: "",
    runningDate: "",
    runningTime: "",
    placeName: "",
    address: "",
    roadAddress: "",
    latitude: "",
    longitude: "",
    cost: "",
    maxParticipants: "",
    km: "",
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => console.error(err.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  useEffect(() => {
    if (!!location.lat && !!location.lng) {
      setMap(
        <Map
          center={{ lat: location.lat, lng: location.lng }}
          style={{ flexGrow: 1, height: "300px" }}
          level={5}
        >
          <MapMarker position={{ lat: location.lat, lng: location.lng }} />
        </Map>
      );
    }
  }, [location]);

  const handleImgAddOnClick = (e, name) => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      setGatheringData((prev) => ({ ...prev, [name]: file }));
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreview((prev) => ({ ...prev, [name]: e.target.result }));
      };
      fileReader.readAsDataURL(file);
    };
    fileInput.click();
  };

  const handleSearchAddressOnClick = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(addressText, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const handleClick = (item) => {
          setLocation({ lat: item.y, lng: item.x });
          setGatheringData((prev) => ({
            ...prev,
            placeName: item.place_name,
            address: item.address_name,
            roadAddress: item.road_address_name,
            latitude: item.y,
            longitude: item.x,
          }));
        };
        setSearchResultList(
          <div>
            {data.map((item) => (
              <div key={item.id} onClick={() => handleClick(item)}>
                <h3>{item.place_name}</h3>
                <p>{item.address_name}</p>
                <p>{item.road_address_name}</p>
                {item.phone && <p>전화: {item.phone}</p>}
              </div>
            ))}
          </div>
        );
      }
    });
  };

  const handleInputOnChange = (e) => {
    setGatheringData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterOnClick = async () => {
    const formData = new FormData();
    Object.entries(gatheringData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("crewId", crewId);
    await reqRegisterGathering(crewId, formData);
    navigate(`/crews/${crewId}/gathering`);
  };

  return (
      <div css={s.layout}>
        <header css={s.header}>
          <h2>정모 일정 등록</h2>
        </header>
        <main css={s.main}>
          {/* 썸네일 */}
          <div
            css={s.thumbnailContainer}
            onClick={(e) => handleImgAddOnClick(e, "thumbnailPicture")}
          >
            {preview?.thumbnailPicture ? (
              <img
                src={preview.thumbnailPicture}
                alt="썸네일 미리보기"
                css={s.thumbnailImg}
              />
            ) : (
              <>
                <CiImageOn />
                <div>정모사진을 등록해주세요.</div>
              </>
            )}
          </div>

          <input
            type="text"
            placeholder="모임명"
            name="title"
            value={gatheringData.title}
            onChange={handleInputOnChange}
          />
          <input
            type="text"
            placeholder="설명"
            name="content"
            value={gatheringData.content}
            onChange={handleInputOnChange}
          />
          <input
            type="date"
            name="runningDate"
            value={gatheringData.runningDate}
            onChange={handleInputOnChange}
          />
          <input
            type="time"
            name="runningTime"
            value={gatheringData.runningTime}
            onChange={handleInputOnChange}
          />

          {/* 주소 입력 + 검색 */}
          <div css={s.addressWrapper}>
            <input
              type="text"
              placeholder="주소입력"
              value={addressText}
              onChange={(e) => setAddressText(e.target.value)}
            />
            <button onClick={handleSearchAddressOnClick}>검색</button>
          </div>

          <div css={s.mapContainer}>
            <div>{searchResultList}</div>
            {map}
          </div>

          <input
            type="text"
            placeholder="러닝거리"
            name="km"
            value={gatheringData.km}
            onChange={handleInputOnChange}
          />
          <input
            type="text"
            placeholder="정모비용"
            name="cost"
            value={gatheringData.cost}
            onChange={handleInputOnChange}
          />
          <input
            type="text"
            placeholder="최대인원"
            name="maxParticipants"
            value={gatheringData.maxParticipants}
            onChange={handleInputOnChange}
          />

          <div css={s.buttonContainer}>
            <button css={s.cancelButton} onClick={() => navigate(-1)}>
              취소
            </button>
            <button css={s.registerButton} onClick={handleRegisterOnClick}>
              등록
            </button>
          </div>
        </main>

      </div>
  );
}

export default GatheringRegister;
