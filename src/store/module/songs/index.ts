import {
  fetchSearchSongList,
  fetchSongDetailByIds,
  verifySongIsUseByIdRequest,
} from "@/service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISongsListStateType } from "./type";
import cache from "@/utils/cache";

export const fetchSearchSongListAction = createAsyncThunk(
  "fetchSearchSongListAction",
  async (searchValue: string) => {
    const res = await fetchSearchSongList(searchValue);

    return res;
  }
);

export const fetchSongDetailByIdsAction = createAsyncThunk(
  "fetchSongDetailByIdsAction",
  async (ids: number, thunkAPI) => {
    const state: ISongsListStateType = (thunkAPI.getState() as any)
      .songsReducer;
    const songsList = state.songsPlayList;
    const info = { ok: false, song: null, isExistPlayList: false, id: ids };
    const song = songsList.find((song) => song.id === ids);

    if (song) {
      info.isExistPlayList = true;
    } else {
      const res = await fetchSongDetailByIds(ids);
      const song = res.songs[0];

      if (song.fee === 1 || song.fee === 4) {
        window.$message.error("为会员歌曲，不可播放");
        info.ok = false;
      }

      if (song.fee === 0 || song.fee === 8) {
        const res = await verifySongIsUseByIdRequest(ids);
        if (!res.success) {
          window.$message.error("暂无版权，不可播放");
          info.ok = false;
        } else {
          info.ok = true;
          song.url = `https://music.163.com/song/media/outer/url?id=${ids}.mp3`;
          info.song = song;
        }
      }
    }

    return info;
  }
);

const initialState: ISongsListStateType = {
  searchSongsList: [],
  songsPlayList: cache.getItem("songsPlayList") ?? [],
  currentSong: cache.getItem("currentSong") ?? {},
  currentSongIsPlay: false,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    changeCurrentSongIsPlay(state) {
      state.currentSongIsPlay = !state.currentSongIsPlay;
    },
    handleChangePlaySong(
      state,
      action: PayloadAction<{ key: "pre" | "next" }>
    ) {
      const id = state.currentSong.id;
      const index = state.songsPlayList.findIndex((song) => song.id === id);

      switch (action.payload.key) {
        case "pre":
          if (index === 0) {
            state.currentSong =
              state.songsPlayList[state.songsPlayList.length - 1];
          } else {
            state.currentSong = state.songsPlayList[index - 1];
          }
          break;
        case "next":
          if (index === state.songsPlayList.length - 1) {
            state.currentSong = state.songsPlayList[0];
          } else {
            state.currentSong = state.songsPlayList[index + 1];
          }
          break;
        default:
          break;
      }

      state.currentSongIsPlay = false;
      state.currentSongIsPlay = true;
    },
    handleRemovePlaySong(state, action: PayloadAction<{ id: number }>) {
      const newSongsPlayList = state.songsPlayList.filter(
        (song) => song.id !== action.payload.id
      );
      state.songsPlayList = newSongsPlayList
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchSearchSongListAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.searchSongsList = action.payload.result.songs;
      }
    );
    builder.addCase(
      fetchSongDetailByIdsAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.ok && !action.payload.isExistPlayList) {
          const song = action.payload.song;
          state.currentSong = song;
          state.currentSongIsPlay = true;
          cache.setItem("currentSong", song);
          const songsPlayList = state.songsPlayList;
          songsPlayList.unshift(song);
          state.songsPlayList = songsPlayList;
          cache.setItem("songsPlayList", songsPlayList);
        }
        if (action.payload.isExistPlayList) {
          const index = state.songsPlayList.findIndex(
            (song) => song.id === action.payload.id
          );
          state.currentSong = state.songsPlayList[index];
          state.currentSongIsPlay = true;
        }
      }
    );
  },
});

export const {
  changeCurrentSongIsPlay,
  handleChangePlaySong,
  handleRemovePlaySong,
} = songsSlice.actions;
export default songsSlice.reducer;
