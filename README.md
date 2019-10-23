
## Canada Food Environment Map (CFEM)

An interactive map to visualize access to food retailers across Canada

Currently under development / waiting for data:



### Some Notes

Base-map is built in [Mapbox Studio](https://www.mapbox.com/mapbox-studio/).

Input data is tabular data linked to census geographies, specifically Dissemination Areas.

To upload data, first convert it into .MBTiles format via [Tippecanue](https://github.com/mapbox/tippecanoe), `tippecanoe -o ada.mbtiles ada.geojson`, then upload it Mapbox Studio's tileset upload functionality.

Currently uploaded
- Dissemination Areas with fake data
- Aggregate Dissemination Areas, also with fake data
- Natural Earth country polygons to fade out the US and Greenland

To Do:
- upload spatial boundaries for download somewhere - to big to upload to GitHub at the moment
