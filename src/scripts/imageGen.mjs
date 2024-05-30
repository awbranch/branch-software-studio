/*
This function will loop through all images in the public folder and
generate responive images for each one. It will also generate the images.json
file that will provide the responsive versions for each image.
*/

import fs from "fs";
import path from "path";
import sharp from "sharp";

const imageDir = "public";
const indexFile = "src/images.json";
const respWidths = [512, 1024, 2048];
const quality = 90;

function findImages(dir) {
  let results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(findImages(filePath));
    } else if (
      path.extname(filePath) === ".jpg" ||
      path.extname(filePath) === ".png"
    ) {
      results.push(filePath);
    }
  }

  return results;
}

function toKb(bytes) {
  return (bytes / 1024).toFixed();
}

async function optimizeImage(imagePath, outputPath, width) {
  const sharpImage = sharp(imagePath);
  const metadata = await sharpImage.metadata();
  const stats = fs.statSync(imagePath);
  const beforeSize = stats.size;

  if (path.extname(imagePath) === ".jpg") {
    const newMeta = await sharpImage
      .resize(width)
      .webp({ quality: quality })
      .toFile(outputPath);
    console.log(
      `Optimized ${imagePath}\n  to: ${path.basename(outputPath)}\n  quality: ${quality}\n  width: ${metadata.width} to ${width}\n  size: ${toKb(beforeSize)}kb to ${toKb(newMeta.size)}kb\n`,
    );
    return newMeta;
  } else {
    const newMeta = await sharpImage
      .resize(width)
      .webp({ nearLossless: true })
      .toFile(outputPath);
    console.log(
      `Optimized ${imagePath}\n  to: ${path.basename(outputPath)}\n  quality: nearLossless\n  width: ${metadata.width} to ${width}\n  size: ${toKb(beforeSize)}kb to ${toKb(newMeta.size)}kb\n`,
    );
    return newMeta;
  }
}

async function generateImages(imagePath, baseDir) {
  const variants = [];
  const metadata = await sharp(imagePath).metadata();

  const fileName = path.basename(imagePath, path.extname(imagePath));

  for (const width of respWidths) {
    if (width >= metadata.width) {
      continue;
    }
    const outputPath = path.join(
      path.dirname(imagePath),
      `${fileName}-${width}w.webp`,
    );

    await optimizeImage(imagePath, outputPath, width);

    variants.push({ width: width, src: '/' + path.relative(baseDir, outputPath) });
  }

  // Then generate one more at the original width
  const outputPath = path.join(
    path.dirname(imagePath),
    `${fileName}-${metadata.width}w.webp`,
  );
  await optimizeImage(imagePath, outputPath, metadata.width);

  return {
    width: metadata.width,
    height: metadata.height,
    src: '/' + path.relative(baseDir, outputPath),
    variants: variants,
  };

  return variants;
}
const output = {};
const images = findImages(imageDir);
console.log("Generating Responsive Images...");
for (const image of images) {
  output['/' + path.relative(imageDir, image)] = await generateImages(
    image,
    imageDir,
  );
}

fs.writeFileSync(indexFile, JSON.stringify(output, null, 3));
