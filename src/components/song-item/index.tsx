import React, { memo, useState, useEffect } from "react";
import PauseSvg from "@/assets/images/music/pause";
import PlaySvg from "@/assets/images/music/play";
import {
  changeCurrentSongIsPlay,
  fetchSongDetailByIdsAction,
  useAppDispatch,
  useAppSelector,
} from "@/store";

const SongItem: React.FC<{ song: any; children?: React.ReactNode }> = memo(
  ({ song, children }) => {
    const [isPlay, setIsPlay] = useState(false);
    const { currentSong, currentSongIsPlay } = useAppSelector(
      (state) => state.songsReducer
    );
    const dispatch = useAppDispatch();

    const handleSongClick = () => {
      // 处理逻辑
      if (!isPlay) {
        if (currentSong.id === song.id) {
          dispatch(changeCurrentSongIsPlay());
        } else {
          dispatch(fetchSongDetailByIdsAction(song.id));
        }
      } else {
        dispatch(changeCurrentSongIsPlay());
      }
    };

    useEffect(() => {
      if (Object.keys(currentSong).length) {
        if (currentSong.id !== song.id) {
          setIsPlay(false);
        } else {
          setIsPlay(currentSongIsPlay);
        }
      }
    }, [currentSong, currentSongIsPlay]);

    return (
      <div className="w-full flex py-1 hover:bg-[#f2f2f3]">
        <div className="w-[80%]">
          <div className="text-[14px] truncate" title={song.name}>
            {song.name}
          </div>
          <div className="text-[12px] truncate">
            <span className="text-[#ff6600]" title={song.artistsName}>
              {song.artistsName}
            </span>{" "}
            ·
            <span className="text-[#777]" title={song.albumName}>
              {" "}
              {song.albumName}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <span onClick={handleSongClick} className="cursor-pointer">
            {isPlay ? <PlaySvg /> : <PauseSvg />}
          </span>
          <span>{children}</span>
        </div>
      </div>
    );
  }
);

export default SongItem;
