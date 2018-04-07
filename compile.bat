rd /s /q dist
echo '删除所有文件'
set WEBPACK_ENV=online && webpack
echo '执行webpack'