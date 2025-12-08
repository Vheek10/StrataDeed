/** @format */

import dynamic from "next/dynamic";
import UploadBox from "../../components/UploadBox";

export default function MintPage() {
	return (
		<section className="max-w-3xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">Mint Property Deed (UI only)</h2>
			<div className="card-glass p-6">
				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Title</label>
						<input
							className="w-full border border-gray-200 rounded-lg px-4 py-2"
							placeholder="3-bedroom duplex, Lekki"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Location</label>
						<input
							className="w-full border border-gray-200 rounded-lg px-4 py-2"
							placeholder="Lekki Phase 1, Lagos"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Valuation</label>
						<input
							className="w-full border border-gray-200 rounded-lg px-4 py-2"
							placeholder="₦120,000,000"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Description
						</label>
						<textarea
							className="w-full border border-gray-200 rounded-lg px-4 py-2"
							rows={5}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Upload Images / Documents
						</label>
						<UploadBox />
					</div>

					<div className="pt-4">
						<button
							type="button"
							className="px-5 py-3 rounded-xl bg-mantle-amber text-white font-semibold shadow-soft">
							Prepare Mint (UI Only)
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
