import { useState } from "react";
import SearchInput from "./SearchInput";
import RadioButton from "./RadioButton";
import AssetsListPage from "./AssetsListPage";

const filterByOptions = [
  {
    label: "All assets",
    value: "all",
  },
  {
    label: "Images",
    value: "image",
  },
  {
    label: "Video",
    value: "video",
  },
];
function ContentLibrary() {
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  return (
    <div className="flex overscroll-y-none">
      <div className="cl-left-nav inset-0 absolute h-full overscroll-y-none">
        <div className="p-4">
          <SearchInput value={searchText} onChange={setSearchText} />
          <div className="flex pt-4 pl-2">
            <img src="/svgs/filter.svg" alt="Filter By" />
            <span className="pl-1 font-semibold">Filter by</span>
          </div>
          <RadioButton
            options={filterByOptions}
            value={filterBy}
            onChange={setFilterBy}
          />
        </div>
      </div>
      <div className="cl-right-nav absolute overscroll-y-none p-5 pr-0">
        <AssetsListPage filterBy={filterBy} searchText={searchText} />
      </div>
    </div>
  );
}

export default ContentLibrary;
