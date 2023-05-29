const express = require('express');
const Web3 = require('web3');
const fs = require('fs');

const app = express();
const port = 3000;

const web3 = new Web3('<YOUR_INFURA_ENDPOINT>');
const contractAddress = '<YOUR_CONTRACT_ADDRESS>';
const contractABI = JSON.parse(fs.readFileSync('<PATH_TO_CONTRACT_ABI_JSON>'));

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Endpoint to upload an image to the smart contract
app.post('/upload', async (req, res) => {
  try {
    // Perform image upload and obtain the image hash
    const imageHash = await performImageUpload(req);

    // Send a transaction to the smart contract to upload the image
    const accounts = await web3.eth.getAccounts();
    await contract.methods.uploadImage(imageHash).send({ from: accounts[0] });

    res.status(200).json({ success: true, message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload image', error: error.message });
  }
});

// Endpoint to retrieve the image hash for a given user
app.get('/image/:user', async (req, res) => {
  try {
    const { user } = req.params;

    // Call the smart contract to retrieve the image hash
    const imageHash = await contract.methods.getImage(user).call();

    res.status(200).json({ success: true, imageHash });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve image', error: error.message });
  }
});

// Function to perform image upload (replace with your own logic)
async function performImageUpload(req) {
  // Implement your image upload logic here and return the image hash
  // For example, you can use a library like IPFS to store the image and get its hash
  // Ensure you properly handle the asynchronous nature of image uploading

  // Example using IPFS
  const imageBuffer = req.file.buffer; // Assuming you are using a middleware like multer to handle file uploads
  const ipfsResponse = await ipfsClient.add(imageBuffer);
  const imageHash = ipfsResponse.cid.toString();

  return imageHash;
}

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
