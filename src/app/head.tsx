/** @format */

// This file customizes the <head> for all routes in the Next.js app directory.
// It sets the favicon to /logo.png.

export default function Head() {
	return (
		<>
			<link
				rel="icon"
				href="/logo.png"
				type="image/png"
			/>
		</>
	);
}
