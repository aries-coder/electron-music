import SongItem from "@/components/song-item";
import { useAppSelector } from "@/store";
import { memo } from "react";

const SearchList = memo(() => {
  const { searchSongsList } = useAppSelector((state) => state.songsReducer);

  return (
    <div className="w-full h-full overflow-auto px-[5px]">
      {searchSongsList.length
        ? searchSongsList.map((item, index) => {
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
                    albumName: item.album.name,
                    artistsName: item.artists
                      ?.map((item: any) => item.name)
                      .join("/"),
                  }}
                />
              </div>
            );
          })
        : "暂无搜索列表，请先搜索噢~"}
    </div>
  );
});

export default SearchList;
