import { useEffect, useState } from "react";
import axios from "axios";
import AssetListGridRenderer from "./AssetListGridRenderer";
import CircularProgress from "@material-ui/core/CircularProgress";

function AssetsListPage({ filterBy, searchText }) {
  const [assetsList, setAssetsList] = useState([]);
  const [filteredAssetsList, setFilteredAssetsList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalAssets, setTotalAssets] = useState();

  function fetchAssets(page) {
    setIsLoading(true);
    return axios
      .get(`https://ncei7.sse.codesandbox.io/api/assets?page=${page}`)
      .then((response) => {
        let data = response["data"]["results"];
        let meta = response["data"]["meta"];
        let hasNextPage = meta["currentPage"] < meta["endPage"];
        setAssetsList([...assetsList, ...data]);
        setHasNextPage(hasNextPage);
        setTotalAssets(meta["totalItems"]);
      })
      .catch(() => {
        setErrorMessage("Error while fetching assets");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function loadMoreAssets() {
    if (!hasNextPage) return;
    let updatedPageNumber = pageNumber + 1;
    setPageNumber(updatedPageNumber);
    return fetchAssets(updatedPageNumber);
  }

  useEffect(() => {
    fetchAssets(pageNumber);
  }, []);

  useEffect(() => {
    let filteredAssetsList = assetsList.filter((asset) => {
      return searchText
        ? asset.file_name.toLowerCase().includes(searchText.toLowerCase())
        : asset;
    });
    if (filterBy !== "all") {
      filteredAssetsList = filteredAssetsList.filter((asset) => {
        return asset.asset_type == filterBy;
      });
    }
    setFilteredAssetsList(filteredAssetsList);
  }, [filterBy, searchText, assetsList]);

  function deleteAsset(id) {
    //Make API call to delete the asset
    setAssetsList(
      assetsList.filter((asset) => {
        return asset.id != id;
      })
    );
  }

  function showLoadingOrErrorState() {
    if (isLoading) {
      return <CircularProgress />;
    } else if (errorMessage) {
      return <div className="text-red-700	font-semibold">{errorMessage}</div>;
    } else {
      return (
        <div className="text-indigo-800 font-semibold">
          No assets found with the search criteria
        </div>
      );
    }
  }
  return filteredAssetsList.length ? (
    <AssetListGridRenderer
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      assetsList={filteredAssetsList}
      totalAssets={totalAssets}
      deleteAsset={deleteAsset}
      loadMoreAssets={loadMoreAssets}
    />
  ) : (
    <div className="flex justify-center items-center h-full">
      {showLoadingOrErrorState()}
    </div>
  );
}

export default AssetsListPage;
