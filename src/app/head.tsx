/** @format */

// This file customizes the <head> for all routes in the Next.js app directory.
// It sets the favicon to /logo.png.

export default function Head() {
	return (
		<>
			<title>StrataDeed</title>
			<meta
				name="description"
				content="Privacy-Preserving RealFi Platform on Mantle Network"
			/>
			<link
				rel="icon"
				href="/logo.png"
				type="image/png"
			/>
		</>
	);
}
