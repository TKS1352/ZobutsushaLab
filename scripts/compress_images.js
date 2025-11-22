import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.join(__dirname, '../public/assets/images/works');

async function compressImages() {
    try {
        const files = await fs.readdir(TARGET_DIR);

        for (const file of files) {
            if (file.match(/\.(png|jpg|jpeg)$/i)) {
                const inputPath = path.join(TARGET_DIR, file);
                const outputPath = path.join(TARGET_DIR, file.replace(/\.[^.]+$/, '.webp'));

                console.log(`Processing: ${file}`);

                await sharp(inputPath)
                    .resize(1600, null, { // Max width 1600px, maintain aspect ratio
                        withoutEnlargement: true
                    })
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`Saved to: ${path.basename(outputPath)}`);

                // Optional: Remove original file if you want to save space immediately
                // await fs.unlink(inputPath);
            }
        }
        console.log('Compression complete!');
    } catch (error) {
        console.error('Error compressing images:', error);
    }
}

compressImages();
