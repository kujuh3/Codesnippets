import React, {useState} from 'react';
import TextField from '@mui/material/TextField';


function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [codeName, setCodeName] = useState("");
    const [codeDescription, setCodeDescription] = useState("");

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
        /* Before we allow post, lets check if everything is in order 
           First check if description or name are given*/
        if(codeName.length < 1 || codeDescription.length < 1) {
            alert("Name and description are required")
            return;
        }
        /* Then check if the file given is of acceptable extension */
        if(!selectedFile || selectedFile.name.split('.').pop() === "py" || selectedFile.name.split('.').pop() === "js") {
		const formData = new FormData();
        formData.append('name', codeName);
        formData.append('file', selectedFile);
        formData.append('description', codeDescription);
		fetch(
			'http://localhost:3001/newsnippet',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
                alert("Filed uploaded - it'll appear in listing in about 1min")
                setCodeName("");
                setCodeDescription("");
                setSelectedFile();
                setIsFilePicked(false);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
        } else {
            alert("Wrong file extension or missing a file")
            return;
        }
	};
	return(
        <div style={{padding: "10px", boxShadow: "black 1px 1px 3px", zIndex: "2", position: "fixed", left: "0", top: "0", margin: "30px", width: "300px", backgroundColor: "rgb(39, 40, 34)", color: "white"}}>
           <p style={{fontSize: "13px"}}>For now only Python and JavaScript files are accepted</p>
            <TextField 
                id="standard-basic" 
                label="Name" 
                variant="standard" 
                color="warning"
                value={codeName}
                onChange={(e) => setCodeName(e.target.value)}
                sx={{width: "90%", marginBottom: "20px", input: {color: "white", borderBottom: "1px solid white"}, label: {color: "#ffffffa3"}}} 
            />
            <TextField 
                multiline 
                rows={4} 
                id="standard-basic" 
                label="Description" 
                variant="standard" 
                color="warning" 
                value={codeDescription}
                onChange={(e) => setCodeDescription(e.target.value)}
                sx={{width: "90%", marginBottom: "20px", label: {color: "#ffffffa3"}}} 
            />
            <input style={{width: "90%"}} type="file" name="file" accept=".js,.py" onChange={changeHandler} />
			{isFilePicked ? (
				<div style={{textAlign: "left", width: "90%"}}>
					<p>File: {selectedFile.name}</p>
                    <p>Size: {Math.round(selectedFile.size/1000)}KB</p>
				</div>
			):(
				<></>
			)}
			<div style={{marginTop: "10px"}}>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
};

export default FileUploadPage;