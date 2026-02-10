export async function handleRevertReserveStock(job) {
	console.log("Reserving stock:", job.data);

	return { ok: true };
}
