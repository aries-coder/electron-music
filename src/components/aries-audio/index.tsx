import { memo, useState, useEffect, useRef } from "react";
import { Slider } from "antd";
import BeforeSvg from "@/assets/images/music/before";
import PauseSvg from "@/assets/images/music/pause";
import AfterSvg from "@/assets/images/music/after";
import {
  changeCurrentSongIsPlay,
  handleChangePlaySong,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import PlaySvg from "@/assets/images/music/play";
import { formatAudioTime } from "@/utils/common";

const AriesAudio = memo(() => {
  const [currentSongInfo, setcurrentSongInfo] = useState<any>({});
  const { currentSong, currentSongIsPlay } = useAppSelector(
    (state) => state.songsReducer
  );
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sliderValue, setsliderValue] = useState(0);
  const [currentTime, setcurrentTime] = useState("00:00");
  const [duration, setduration] = useState("00:00");

  // 播放/暂停歌曲
  const handlePlayOrPauseSong = () => {
    dispatch(changeCurrentSongIsPlay());
  };
  // audio加载完成 准备播放
  const handleAudioCanPlayThrough = () => {
    const duration = audioRef.current!.duration;
    setduration(formatAudioTime(duration));
    // isMounted && audioRef.current!.play()
  };
  // 监听audio播放
  const handleAudioTimeUpdate = () => {
    const currentTime = audioRef.current!.currentTime;
    const duration = audioRef.current!.duration;
    const step = Math.ceil((currentTime / duration) * 100);
    setsliderValue(step);
    setcurrentTime(formatAudioTime(currentTime));
  };
  // 监听 slider 拖动
  const handleChangeSlider = (step: number) => {
    setsliderValue(step);

    const percent = step / 100;
    const duration = audioRef.current!.duration;

    audioRef.current!.currentTime = duration * percent;
  };
  // 播放结束
  const handleAudioEnded = () => {
    dispatch(
      handleChangePlaySong({
        key: "next",
      })
    );
    setsliderValue(0);
  };

  useEffect(() => {
    const artistsName =
      currentSong.ar?.map((item: any) => item.name).join("/") ?? "";
    setcurrentSongInfo({
      name: currentSong.name ?? "",
      picUrl: currentSong.al?.picUrl ?? "",
      artistsName,
    });
  }, [currentSong]);

  useEffect(() => {
    if (currentSongIsPlay) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [currentSongIsPlay]);

  return (
    <div className="h-[100%] border-t relative">
      <audio
        src={currentSong.url ?? ""}
        ref={audioRef}
        controls
        className="hidden"
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
        autoPlay={true}
        onCanPlayThrough={handleAudioCanPlayThrough}
      ></audio>
      <div className="absolute w-full top-[-5px]">
        <Slider
          tooltip={{ open: false }}
          className="my-0 mx-0"
          value={sliderValue}
          onChange={(step) => handleChangeSlider(step)}
        />
      </div>
      <div className="h-full w-full px-[3px] flex items-center">
        <div className="flex items-center w-[30%]">
          <img
            src={
              currentSongInfo.picUrl ||
              "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
            }
            alt=""
            className="w-[40px] h-[40px]"
          />
          <div className="ml-[3px] text-[#666] truncate">
            <div
              className="text-[14px] truncate"
              title={currentSongInfo.name || ""}
            >
              {currentSongInfo.name || "暂无播放歌曲"}
            </div>
            <div
              className="text-[12px] truncate"
              title={currentSongInfo.artistsName || ""}
            >
              {currentSongInfo.artistsName || ""}
            </div>
          </div>
        </div>
        <div className="flex items-center flex-1 justify-center">
          <i
            className="cursor-pointer"
            onClick={() => dispatch(handleChangePlaySong({ key: "pre" }))}
          >
            <BeforeSvg />
          </i>
          &nbsp; &nbsp;
          <i className="cursor-pointer" onClick={handlePlayOrPauseSong}>
            {currentSongIsPlay && currentSongInfo.name ? <PlaySvg /> : <PauseSvg />}
          </i>
          &nbsp; &nbsp;
          <i
            className="cursor-pointer"
            onClick={() => dispatch(handleChangePlaySong({ key: "next" }))}
          >
            <AfterSvg />
          </i>
        </div>
        <div className="text-[14px] w-[30%] text-right">
          {currentTime} / {duration}
        </div>
      </div>
    </div>
  );
});

export default AriesAudio;
