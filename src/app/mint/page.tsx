/** @format */

import dynamic from "next/dynamic";
import UploadBox from "../../components/UploadBox";

export default function MintPage() {
	return (
		<section className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
			<h2 className="text-xl sm:text-2xl font-bold mb-4">
				Mint Property Deed (UI only)
			</h2>
			<div className="card-glass p-4 sm:p-6">
				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Title</label>
						<input
							className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base"
							placeholder="3-bedroom duplex, Lekki"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Location</label>
						<input
							className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base"
							placeholder="Lekki Phase 1, Lagos"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Valuation</label>
						<input
							className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base"
							placeholder="₦120,000,000"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Description
						</label>
						<textarea
							className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base"
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
							className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-mantle-amber text-white font-semibold shadow-soft min-h-[48px]">
							Prepare Mint (UI Only)
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
