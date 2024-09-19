import { useState } from "react"; // Import the useState hook from React to manage state in functional components
import "./App.css"; // Import the CSS file for styling the App component
import Header from "./components/Header"; // Import the Header component for the top of the page
import AllNews from "./components/AllNews"; // Import the AllNews component to show a list of news articles
// import Footer from "./components/Footer"; // Uncomment to include the Footer component at the bottom of the page
import TopHeadlines from "./components/TopHeadlines"; // Import the TopHeadlines component to show top news headlines

import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import routing components for navigation
import CountryNews from "./components/CountryNews"; // Import the CountryNews component to show news by country

// Define the main App component
function App() {
  // Define a state variable 'count' with its setter function 'setCount', initialized to 0
  const [count, setCount] = useState(0);

  return (
    <div className="w-full"> {/* Full-width container for the app */}
      <BrowserRouter> {/* This component manages the routing for the application */}
        <Header /> {/* Display the Header component */}
        <Routes> {/* Define the different routes (pages) for the app */}
          <Route path="/" element={<AllNews />} /> {/* Route for the homepage, displaying the AllNews component */}
          <Route path="/top-headlines/:category" element={<TopHeadlines />} /> {/* Route for top headlines, where ':category' is a dynamic segment */}
          <Route path="/country/:iso" element={<CountryNews />} /> {/* Route for news by country, where ':iso' is a dynamic segment for the country code */}
        </Routes>
        {/* <Cards />  */} {/* Uncomment to include the Cards component */}
        {/* <Footer />   */} {/* Uncomment to include the Footer component */}
      </BrowserRouter>
    </div>
  );
}

export default App; // Export the App component so it can be used elsewhere in the project
