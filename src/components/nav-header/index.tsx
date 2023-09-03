import OperationSvg from "@/assets/images/nav-header/operation";
import { memo, useRef } from "react";
import { Input, Form, Dropdown } from "antd";
import type { InputRef, MenuProps } from "antd";
import MusicLogSvg from "@/assets/images/nav-header/music";
import { fetchSearchSongListAction, useAppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";

const NavHeader = memo(() => {
  const searchInputRef = useRef<InputRef>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "play_list",
      label: <div onClick={() => navigate("/play_list")}>播放列表</div>,
    },
    {
      key: "search_list",
      label: <div onClick={() => navigate("/search_list")}>搜索列表</div>,
    },
    {
      key: "clear",
      label: (
        <div
          onClick={() => {
            localStorage.clear();
            location.reload()
          }}
        >
          清除数据及缓存
        </div>
      ),
    },
  ];

  const handleSearchSong = async (value: Record<string, string>) => {
    console.log(value);

    const searchValue = value.search;
    searchInputRef.current?.blur();
    if (searchValue) {
      await dispatch(fetchSearchSongListAction(searchValue));
      navigate("/search_list");
    }
  };

  return (
    <div className="h-[100%] border-b-[#ccc] border-b flex justify-between items-center px-[5px]">
      <MusicLogSvg />
      <Form
        className="py-0 flex-1 px-2 flex items-center"
        onFinish={handleSearchSong}
      >
        <Form.Item label="search" name="search" noStyle>
          <Input
            ref={searchInputRef}
            placeholder="please input music"
            className="rounded-[15px]"
          />
        </Form.Item>
      </Form>

      <Dropdown menu={{ items }} trigger={["click"]}>
        <div>
          <OperationSvg />
        </div>
      </Dropdown>
    </div>
  );
});

export default NavHeader;
