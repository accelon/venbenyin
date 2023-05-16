import { filesFromPattern, nodefs, writeChanged, readTextContent } from 'ptk/nodebundle.cjs'
import { convertSubtitle } from 'ptk/cli/subtitle.js'
// need ptk 1.5.15
await nodefs;
const infolder = 'srt/';  //輸入
const outfolder = 'off/';  //輸出
const files = filesFromPattern("*/*.srt", infolder);

const shortcaption = (fn) => { //從檔名取得短一點的名稱，做為搜尋範圍名
    let akcaption = fn.slice(4);
    const at1 = akcaption.indexOf(' ');
    const at2 = akcaption.indexOf('(');
    if (~at1) return akcaption.slice(0, at1);//去掉 ( 之後文字
    if (~at2) return akcaption.slice(0, at2);//去掉 之後文字
    return akcaption;
}
let prevsubdir = '', out = '', bkcount = 0;
const fileheader = () => { //每個off 的第一行
    return '^bk' + bkcount + '【' + prevsubdir.slice(4) + '】' + '^ak' + bkcount + '【' + shortcaption(prevsubdir) + '】' + '\n';
}
files.forEach(file => {
    const srtcontent = readTextContent(infolder + file);
    const at = file.indexOf('/');
    const subdir = file.slice(0, at); //子目錄，作為 off檔名
    let fn = file.slice(at + 1);     // srt 檔名

    if (subdir !== prevsubdir) { //換目錄
        out = fileheader() + out; //加上off檔頭  ak 同bk 
        if (prevsubdir) {
            writeChanged(outfolder + prevsubdir + '.off', out, true);
        }
        bkcount++;
        out = '';
    }
    const ck = parseInt(fn.slice(0, 3).replace('-', ''));
    const content = '^ck' + ck + '【第' + ck + '講】' + '^mpeg<id=' + fn.replace('.srt', '.mp4') + '>\n' + convertSubtitle(srtcontent, fn);
    out += content;
    prevsubdir = subdir;
})
out = fileheader() + out; //加上off檔頭
writeChanged(outfolder + prevsubdir + '.off', out, true);
