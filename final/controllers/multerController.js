export const multerController = (req, res) => {
	const file = req.file;
	//console.log(file);
	if (!file) {
		const error = new Error('Please upload a file');
		error.httpStatusCode = 400;
		res.json({ error });
	}
	res.send(file.path);
};
