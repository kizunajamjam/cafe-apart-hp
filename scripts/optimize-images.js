/**
 * 画像一括圧縮スクリプト
 * assets/images 直下の JPG/PNG を、ファイル名・形式を変えずに圧縮して上書きする。
 * - 長辺 1600px を超える画像は縮小（メニュー写真・店内写真には十分な解像度）
 * - JPEG: quality 80 / progressive、PNG: 最大圧縮
 * - 圧縮後のほうが小さい場合のみ上書きするので、何度実行しても安全
 *
 * 実行: node scripts/optimize-images.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');
const MAX_DIMENSION = 1600;

async function optimize(file) {
    const filePath = path.join(IMAGES_DIR, file);
    const original = fs.readFileSync(filePath); // 環境によってはlibvipsのパス直接オープンが失敗するためバッファ経由で渡す
    const before = original.length;
    const ext = path.extname(file).toLowerCase();

    const image = sharp(original).rotate(); // EXIFの向きを反映してから回転情報を除去
    const meta = await image.metadata();

    if (Math.max(meta.width, meta.height) > MAX_DIMENSION) {
        image.resize(MAX_DIMENSION, MAX_DIMENSION, { fit: 'inside', withoutEnlargement: true });
    }

    let buffer;
    if (ext === '.jpg' || ext === '.jpeg') {
        buffer = await image.jpeg({ quality: 80, progressive: true, mozjpeg: true }).toBuffer();
    } else if (ext === '.png') {
        buffer = await image.png({ compressionLevel: 9, palette: true }).toBuffer();
    } else {
        return null;
    }

    if (buffer.length < before) {
        fs.writeFileSync(filePath, buffer);
        return { file, before, after: buffer.length };
    }
    return { file, before, after: before };
}

(async () => {
    const files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(jpe?g|png)$/i.test(f));
    let totalBefore = 0, totalAfter = 0;

    for (const file of files) {
        try {
            const result = await optimize(file);
            if (!result) continue;
            totalBefore += result.before;
            totalAfter += result.after;
            const saved = result.before - result.after;
            if (saved > 0) {
                console.log(`${file}: ${(result.before / 1024).toFixed(0)}KB -> ${(result.after / 1024).toFixed(0)}KB`);
            }
        } catch (err) {
            console.error(`SKIP ${file}: ${err.message}`);
        }
    }

    console.log(`\nTotal: ${(totalBefore / 1048576).toFixed(1)}MB -> ${(totalAfter / 1048576).toFixed(1)}MB`);
})();
