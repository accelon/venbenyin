# venbenyin
戒律對修行的重要

## 步驟
      執行 ptk js ，得到 venbenyin/*.js  (000.js ~016.js)

      cd accelon22\dist
      mklink/j  venbenyin \2023\venbenyin\venbenyin 

     修改  accelon22\dist\config.js ，載入 venbenyin
     
     window.accelon22={preload:"venbenyin"} 
## youtube VideoId 
   修改 youtube.js ，srt 到youtube videoId 之對應表

## 標記說明

      0.off  檔頭，template=subtitle ，指定類型為 subtitle ，在accelon22 左上角點「釋本因」會帶出所有影片連結。
      000.off ~ 006.off 影片對應字幕。
 
     ^mpeg  指定 mp4 檔名。
     ^ts          時間戳  (起始秒 - 持續秒)
    
   壓縮指令（安裝 ffmpeg) 
    ffmpeg -i 006-戒律對修道的重要.mp4 -vcodec libx264 -crf 35 006.mp4