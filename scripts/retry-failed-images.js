import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Failed images with their original URLs
const failedImages = [
	{
		photoId: '15e82a2c9a9a',
		urls: [
			'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
			'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=2000&q=80',
			'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a',
		],
	},
	{
		photoId: '91eab0a51dc7',
		urls: [
			'https://images.unsplash.com/photo-1616587226154-91eab0a51dc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
			'https://images.unsplash.com/photo-1616587226154-91eab0a51dc7?w=2000&q=80',
			'https://images.unsplash.com/photo-1616587226154-91eab0a51dc7',
		],
	},
	{
		photoId: '4871e5fcd7a4',
		urls: [
			'https://images.unsplash.com/photo-1613977257592-4871e5fcd7a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
			'https://images.unsplash.com/photo-1613977257592-4871e5fcd7a4?w=2000&q=80',
			'https://images.unsplash.com/photo-1613977257592-4871e5fcd7a4',
		],
	},
];

function downloadImage(url, filepath) {
	return new Promise((resolve, reject) => {
		https.get(url, (response) => {
			if (response.statusCode === 301 || response.statusCode === 302) {
				return downloadImage(response.headers.location, filepath)
					.then(resolve)
					.catch(reject);
			}
			
			if (response.statusCode !== 200) {
				reject(new Error(`Failed: ${response.statusCode}`));
				return;
			}
			
			const fileStream = fs.createWriteStream(filepath);
			response.pipe(fileStream);
			
			fileStream.on('finish', () => {
				fileStream.close();
				resolve();
			});
			
			fileStream.on('error', reject);
		}).on('error', reject);
	});
}

async function retryFailedImages() {
	for (const image of failedImages) {
		const filename = `unsplash-${image.photoId}.jpg`;
		const filepath = path.join(imagesDir, filename);
		
		if (fs.existsSync(filepath)) {
			console.log(`✓ ${filename} already exists`);
			continue;
		}
		
		let downloaded = false;
		for (const url of image.urls) {
			try {
				console.log(`Trying to download ${filename} from: ${url.substring(0, 60)}...`);
				await downloadImage(url, filepath);
				console.log(`✓ Successfully downloaded ${filename}`);
				downloaded = true;
				break;
			} catch (error) {
				console.log(`✗ Failed: ${error.message}`);
			}
			await new Promise(resolve => setTimeout(resolve, 500));
		}
		
		if (!downloaded) {
			console.log(`⚠ Could not download ${filename} - will need replacement`);
		}
	}
}

retryFailedImages().catch(console.error);

