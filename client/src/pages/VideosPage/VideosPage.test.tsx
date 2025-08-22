import React from "react";
import { useGetVideosQuery } from "@src/services/VideoService";
import { render } from "@testing-library/react";
import VideosPage from "./VideosPage";

jest.mock("@src/services/VideoService");
const mockedUseGetVideosQuery = useGetVideosQuery as jest.Mock;

describe("VideosPage component", () => {
  test("", async () => {
    const mockData = {
      videos: [{ id: 1, title: "Mocked Video" }],
      totalPages: 5,
    };

    mockedUseGetVideosQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<VideosPage />);

    expect(mockedUseGetVideosQuery).toHaveBeenCalledWith({ page: 1 });
  });
});
