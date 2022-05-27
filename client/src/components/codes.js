import { useState, useEffect } from 'react';
import { CopyBlock, nord, monokai } from "react-code-blocks";
import Container from '@mui/material/Container';
import BottomNavigation from './bottomnavigation';
import Divider from '@mui/material/Divider';
import ObjectsMenu from './objectsmenu';
import Chip from '@mui/material/Chip';

function App() {
    const [items, setItems] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [selection, setSelection] = useState();
    const [searchInput, setSearchInput] = useState();

    /* Code snippets and their descriptions */
    useEffect(() => {
        fetch('http://localhost:3001/snippets', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        },
        ).then(response => {
        if (response.ok) {
            response.json().then(json => {
            setItems(json.data);
            setSearchItems(json.data);
            setDescriptions(json.descriptions);
            console.log(json);
            });
        }
        });
    }, [])
    
    /* useEffect hook for bottom navigation tabs */
    useEffect(() =>{
      if(selection === "all"){
          setSearchItems(items);
      } else{
          setSearchItems(items.filter(item => item.extension === selection));
      }
    }, [selection]);

    /* UseEffect hook for the search from all input field */
    useEffect(() => {
        if(!searchInput){
            setSearchItems(items);
        } else {
            setSearchItems(items.filter(item => item.content.toLowerCase().includes(searchInput.toLowerCase()) || item.description.description.toLowerCase().includes(searchInput.toLowerCase()) || item.description.name.toLowerCase().includes(searchInput.toLowerCase())));
        }
    }, [searchInput])

  return (
      <>
      <Container sx={{textAlign: "left", padding: "10px", marginBottom: "10vh"}}>
        {searchItems.map((item, idx) => {
            return(
                <>
                <div id={item.description.name} key={idx} style={{boxShadow: "1px 1px 3px black",margin: "10px", backgroundColor: "rgb(39, 40, 34)", color: "white", borderRadius: "4px", paddingTop: "3px"}}>
                <header style={{borderBottom: "1px solid white", paddingLeft: "15px"}}>
                    <div style={{display: "flex"}}>
                        <h2>{item.description.name}</h2>
                        <Chip sx={{marginTop: "auto",marginBottom: "auto",marginLeft: "auto",marginRight: "30px",color: "white",fontVariant: "all-petite-caps"}} label={item.extension} variant="outlined"/>
                    </div>
                    <p>{item.description.description}</p>
                </header>
                <CopyBlock
                    text={item.content}
                    language={item.extension}
                    theme={monokai}
                    codeBlock
                />
                </div>
                <Divider/>
                </>
                );
        })}
      </Container>
      <ObjectsMenu objects={searchItems} setSearchInput={setSearchInput}/>
      <BottomNavigation language={selection} setLanguage={setSelection}/>
      </>
  )
};


export default App;
