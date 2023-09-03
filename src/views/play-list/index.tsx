import RemoveSvg from "@/assets/images/music/remove";
import SongItem from "@/components/song-item";
import { handleRemovePlaySong, useAppDispatch, useAppSelector } from "@/store";
import { memo } from "react";

const PlayList = memo(() => {
  const { songsPlayList } = useAppSelector((state) => state.songsReducer);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full overflow-auto px-[5px]">
      {songsPlayList.length
        ? songsPlayList.map((item, index) => {
            return (
              <div
                style={{
                  backgroundColor: (index + 1) % 2 === 0 ? "#fff" : "#fafafa",
                }}
                key={item.id}
              >
                <SongItem
                  song={{
                    id: item.id,
                    name: item.name,
                    albumName: item.al.name,
                    artistsName: item.ar
                      ?.map((item: any) => item.name)
                      .join("/"),
                  }}
                >
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch(handleRemovePlaySong({ id: item.id }))
                    }
                  >
                    <RemoveSvg />
                  </span>
                </SongItem>
              </div>
            );
          })
        : "暂无歌曲播放列表"}
    </div>
  );
});

export default PlayList;
