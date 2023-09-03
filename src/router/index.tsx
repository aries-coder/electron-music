import PlayList from "@/views/play-list";
import SearchList from "@/views/search-list";
import { useRoutes, RouteObject, Navigate } from "react-router-dom";

function createRouter() {
  const routers: RouteObject[] = [
    {
      path: "/",
      element: <Navigate to="/play_list" />,
    },
    {
      path: "/play_list",
      element: <PlayList />,
    },
    {
      path: "/search_list",
      element: <SearchList />,
    },
  ];

  return useRoutes(routers)
}

export default createRouter
