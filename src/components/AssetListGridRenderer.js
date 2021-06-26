import React, { useEffect, useState, useRef } from "react";
import Asset from "./Asset.js";
import useWidth from "../hooks/useWidth";
import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const ItemWidth = 300;
function AssetListGridRenderer({
  isLoading,
  assetsList,
  hasNextPage,
  totalAssets,
  deleteAsset,
  loadMoreAssets,
}) {
  const containerRef = useRef();
  const [containerWidth] = useWidth(containerRef);
  const containerHeight = containerRef.current?.offsetHeight || 0;
  const [gridCols, setGridCols] = useState(1);

  useEffect(() => {
    setGridCols(Math.max(Math.floor(containerWidth / ItemWidth), 1));
  }, [containerWidth]);

  const getIdByGridPosition = (col, row) => row * gridCols + col;

  const rowRenderer = React.memo(({ columnIndex, rowIndex, style }) => {
    const id = getIdByGridPosition(columnIndex, rowIndex);
    if (!assetsList || assetsList.length === 0 || id >= assetsList.length)
      return null;
    let asset = assetsList[id];
    return (
      <div style={style}>
        <Asset asset={asset} deleteAsset={deleteAsset} key={asset.id} />
      </div>
    );
  });

  const isItemLoaded = (index) => !!assetsList[index];
  const loadMoreItems = isLoading || !hasNextPage ? () => {} : loadMoreAssets;

  const onItemsRenderedHandling =
    (onItemsRendered) =>
    ({
      visibleColumnStartIndex,
      visibleColumnStopIndex,
      visibleRowStartIndex,
      visibleRowStopIndex,
    }) => {
      const visibleStartIndex =
        visibleRowStartIndex * gridCols + visibleColumnStartIndex;
      const visibleStopIndex =
        visibleRowStopIndex * gridCols + visibleColumnStopIndex;

      onItemsRendered({
        visibleStartIndex,
        visibleStopIndex,
      });
    };

  return (
    <div ref={containerRef} className="h-full">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={totalAssets}
        loadMoreItems={loadMoreItems}
        threshold={3}
      >
        {({ onItemsRendered, ref }) => (
          <section>
            <Grid
              columnCount={gridCols}
              columnWidth={containerWidth / gridCols}
              height={containerHeight}
              rowCount={assetsList.length / gridCols}
              overscanRowCount={3}
              rowHeight={380}
              width={containerWidth}
              onItemsRendered={onItemsRenderedHandling(onItemsRendered)}
              ref={ref}
            >
              {rowRenderer}
            </Grid>
          </section>
        )}
      </InfiniteLoader>
    </div>
  );
}

export default AssetListGridRenderer;
