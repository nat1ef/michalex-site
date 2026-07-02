import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const ffmpeg = (await import("ffmpeg-static")).default;

if (!ffmpeg || !existsSync(ffmpeg)) {
  throw new Error("ffmpeg-static binary not found");
}

const ogIn = path.join(root, "public/images/og-share.jpg");
const ogOut = path.join(root, "public/images/og-share.jpg");
const heroIn = path.join(root, "public/videos/workshop-hero.mp4");
const heroLoop = path.join(root, "public/videos/workshop-hero-loop.mp4");
const heroPoster = path.join(root, "public/images/hero-loop-poster.jpg");
const loopStart = 2.4;

function runFfmpeg(args) {
  execFileSync(ffmpeg, args, { stdio: "inherit" });
}

console.log("Compressing OG share image...");
const ogBuffer = await sharp(ogIn)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();

await sharp(ogBuffer).toFile(ogOut);
const ogStats = await sharp(ogBuffer).metadata();
console.log(`OG image: ${Math.round(ogBuffer.length / 1024)}KB (${ogStats.width}x${ogStats.height})`);

console.log(`Trimming hero video from ${loopStart}s...`);
runFfmpeg([
  "-y",
  "-ss",
  String(loopStart),
  "-i",
  heroIn,
  "-an",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "22",
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
