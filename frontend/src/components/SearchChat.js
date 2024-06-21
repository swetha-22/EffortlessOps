import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchChat.css";
import { createChat,findChat } from "../api/ChatRequests";

const SearchChat = ({handleSetCurrentChat}) => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const senderId=localStorage.getItem("emp_id");

  const fetchData = (value) => {
    fetch("https://effortlessops-backend.onrender.com/api/employees/search")
      .then((response) => response.json())
      .then((employeeIds) => {
        const filteredResults = employeeIds.filter((empId) => {
          return (
            value &&
            empId.toLowerCase().includes(value.toLowerCase())&&
            empId !== senderId
          );
        });
        setResults(filteredResults);
      });
  };
    const handleClick = async(result)=> {
        const chat = {
        senderId : senderId,
        receiverId:result
    }
    
    try {
        await createChat(chat);
        const newchat= await findChat(senderId, result);
        handleSetCurrentChat(newchat.data); 
        setInput("");
        setResults([]);

    }
    catch
    {
        console.log("error")
    }
    }

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const SearchResult = ({ result }) => {
    return (
      <div
        className="search-result"
        onClick={(e) => {handleClick(result)}}
      >
        {result}
      </div>
    );
  };

  const SearchResultsList = ({ results }) => {
    return (
      <div className="results-list">
        {results.map((result, id) => {
          return <SearchResult result={result} key={id} />;
        })}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="search-bar-container my-2" style={{position:"relative", right:"6px"}}>
        <div className="input-wrapper">
          <FaSearch id="search-icon" style={{position:"relative", right:"5px"}} />
          <input
            className="input-chat"
            placeholder="Type to search..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
};

export default SearchChat;