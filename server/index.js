// Load environment variables from a .env file (like API keys or the port number)
require("dotenv").config(); // This lets us use variables from .env file without hardcoding them

// Import the necessary libraries we'll be using
const express = require("express"); // This is used to create our web server
const axios = require("axios"); // Axios is used for making HTTP requests (to APIs)
const cors = require("cors"); // CORS is a security thing that allows our server to handle requests from different domains

const app = express(); // Here we initialize our Express app

// CORS settings
app.use(cors({
  origin: '*', // Allows requests from any domain (in real projects, you'd want to limit this to specific domains)
  methods: ['GET', 'POST', 'OPTIONS'], // We only allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // These are the headers we will accept in requests
}));

// Middleware to help process incoming data
app.use(express.urlencoded({ extended: true })); // Allows us to handle form data
app.use(express.json()); // Allows us to handle JSON data

// A helper function that makes requests to an external API
async function makeApiRequest(url) {
  try {
    // Make a GET request to the provided URL
    const response = await axios.get(url);
    
    // Return the response if everything goes well
    return {
      status: 200, // HTTP success status code
      success: true,
      message: "Successfully fetched the data", // Friendly success message
      data: response.data, // The actual data returned by the API
    };
  } catch (error) {
    // Handle errors (if the request fails)
    console.error("API request error:", error.response ? error.response.data : error); // Log the error details for debugging
    return {
      status: 500, // Internal server error status code
      success: false,
      message: "Failed to fetch data from the API", // Friendly error message
      error: error.response ? error.response.data : error.message, // Send back the error details
    };
  }
}

// Route to get all news based on a search query (if the user provides one)
app.get("/all-news", async (req, res) => {
  // Parse query parameters from the URL (like pageSize, page number, and search term)
  let pageSize = parseInt(req.query.pageSize) || 10; // Default is 80 articles if not specified
  let page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  let q = req.query.q || 'world'; // Default search term is 'world' if the user doesn't provide one

  // Build the URL for the news API using the search term, page size, and page number
 let url = `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIACSTACK_API_KEY}&keywords=${encodeURIComponent(q)}&limit=${pageSize}&offset=${(page - 1) * pageSize}`;
  
  // Make the API request using our helper function
  const result = await makeApiRequest(url);
  
  // Send the result back to the user
  res.status(result.status).json(result);
});

// Route to get top headlines based on a category (like sports, technology, etc.)
app.get("/top-headlines", async (req, res) => {
  // Parse query parameters from the URL (page size, page number, and category)
  let pageSize = parseInt(req.query.pageSize) || 80; // Default to 80 articles if not specified
  let page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  let category = req.query.category || "general"; // Default category is 'general' if not provided

  // Build the URL for the news API to fetch top headlines by category
  let url = `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIACSTACK_API_KEY}&categories=${category}&limit=${pageSize}&offset=${(page - 1) * pageSize}`;
  // Make the API request using our helper function
  const result = await makeApiRequest(url);
  
  // Send the result back to the user
  res.status(result.status).json(result);
});

// Route to get top headlines for a specific country (identified by its ISO code, like 'us' for the USA)
app.get("/country/:iso", async (req, res) => {
  // Parse query parameters (page size, page number) and get the country code from the URL
  let pageSize = parseInt(req.query.pageSize) || 80; // Default to 80 articles
  let page = parseInt(req.query.page) || 1; // Default to page 1
  const country = req.params.iso; // Get the country code from the URL

  // Console log to verify the country code and other parameters
  console.log(`Fetching news for country: ${country}, page: ${page}, pageSize: ${pageSize}`);

  // Build the URL for the news API to fetch top headlines for the country
  let url =`http://api.mediastack.com/v1/news?access_key=${process.env.MEDIACSTACK_API_KEY}&countries=${country}&limit=${pageSize}&offset=${(page - 1) * pageSize}`;

  
  // Console log to verify the constructed URL
  console.log(`Request URL: ${url}`);

  // Make the API request using our helper function
  const result = await makeApiRequest(url);
  
  // If the country is invalid or NewsAPI fails, handle the error gracefully
  if (!result.success) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: `Unable to fetch news for country: ${country}. Check if the ISO code is correct.`,
      error: result.error,
    });
  }

  // Send the result back to the user
  res.status(result.status).json(result);
});


// Start the Express server on the port defined in .env (or default to port 3000 if none is defined)
const PORT = process.env.PORT || 3000; // If no port is specified, use 3000 as the default
app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`); // Display a message when the server starts
});
