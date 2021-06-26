import MenuListWrapper from "./MenuList";
import VideoPlayer from "./VideoPlayer";

const MenuOptions = [
  {
    label: "Rename",
    icon: "pencil",
    value: "rename",
  },
  {
    label: "Delete",
    icon: "trash",
    value: "delete",
  },
];

function Asset({ asset, deleteAsset }) {
  function handleMenuClick(actionName) {
    switch (actionName) {
      case "rename":
        return; // Need to handle rename asset
      case "delete":
        deleteAsset(asset.id);
        return;
    }
  }
  if (!asset) return;
  return (
    <div className="asset-container m-5 border" key={asset.id}>
      <div className="asset-image">
        {asset.asset_type == "image" ? (
          <img
            className="rounded-t"
            src={asset.thumbnail_url}
            width="250"
            height="250"
            alt={asset.file_name}
          />
        ) : (
          <VideoPlayer src={asset.video_src} file_name={asset.file_name} />
        )}
      </div>
      <div className="pl-2">
        <div className="flex pt-2">
          {asset.tags.map((tag) => (
            <label
              className="text-sm rounded p-1 bg-gray-100 mr-1 asset-tag truncate"
              title={tag.name}
              key={tag.id}
            >
              {tag.name}
            </label>
          ))}
        </div>
        <div className="flex p-2">
          <div className="pr-2">
            <input type="checkbox" className="h-5 w-5 cursor-pointer" />
          </div>
          <label className="w-36 text-sm truncate" title={asset.file_name}>
            {asset.file_name}
          </label>
          <MenuListWrapper
            menuIcon="more-vertical"
            options={MenuOptions}
            onChange={handleMenuClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Asset;
