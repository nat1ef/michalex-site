import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const ffmpeg = (await import("ffmpeg-static")).default;

if (!ffmpeg || !existsSync(ffmpeg)) {
  throw new Error("ffmpeg-static binary not found");
}

const ogIn = path.join(root, "public/images/og-share.jpg");
const ogOut = path.join(root, "public/images/og-share.tmp.jpg");
const heroIn = path.join(root, "public/videos/workshop-hero.mp4");
const heroLoop = path.join(root, "public/videos/workshop-hero-loop.mp4");
const heroPoster = path.join(root, "public/images/hero-loop-poster.jpg");
const loopStart = 3.2;
const loopDuration = 6.5;

function runFfmpeg(args) {
  execFileSync(ffmpeg, args, { stdio: "inherit" });
}

console.log("Compressing OG share image...");
const ogBuffer = await sharp(ogIn)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();

await sharp(ogBuffer).toFile(ogOut);
renameSync(ogOut, ogIn);
const ogStats = await sharp(ogBuffer).metadata();
console.log(`OG image: ${Math.round(ogBuffer.length / 1024)}KB (${ogStats.width}x${ogStats.height})`);

const transforms = path.join(root, "tmp/vidstab.trf");
mkdirSync(path.dirname(transforms), { recursive: true });
console.log(`Stabilizing and trimming hero video from ${loopStart}s (${loopDuration}s)...`);
runFfmpeg([
  "-y",
  "-ss",
  String(loopStart),
  "-t",
  String(loopDuration),
  "-i",
  heroIn,
  "-an",
  "-vf",
  "vidstabdetect=shakiness=8:accuracy=15:result=" + transforms.replace(/\\/g, "/"),
  "-f",
  "null",
  "-",
]);
runFfmpeg([
  "-y",
  "-ss",
  String(loopStart),
  "-t",
  String(loopDuration),
  "-i",
  heroIn,
  "-an",
  "-vf",
  "vidstabtransform=smoothing=30:input=" +
    transforms.replace(/\\/g, "/") +
    ",scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "21",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  heroLoop,
]);

console.log("Extracting calm hero poster frame...");
runFfmpeg([
  "-y",
  "-ss",
  "0.5",
  "-i",
  heroLoop,
  "-frames:v",
  "1",
  "-q:v",
  "2",
  "-update",
  "1",
  heroPoster,
]);

const posterBuffer = await sharp(heroPoster)
  .resize(1920, 1080, { fit: "cover" })
  .jpeg({ quality: 85, mozjpeg: true })
  .toBuffer();
await sharp(posterBuffer).toFile(heroPoster);
console.log(`Poster: ${Math.round(posterBuffer.length / 1024)}KB`);
console.log("Done.");
