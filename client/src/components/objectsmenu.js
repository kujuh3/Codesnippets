import * as React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css';
import SearchBar from './searchbar';
import { Link } from 'react-scroll';
import Chip from '@mui/material/Chip';

export default function ObjectsMenu({objects, setSearchInput}) {

    return (
        <ProSidebar style={{position: "fixed", right: "0", top: "0", zIndex: "0"}}>
        <Menu style={{ background: "#272822 !important", width: "100%"}} iconShape="square">
        <SearchBar setSearchInput={setSearchInput}/>
            {objects.map((object, idx) => {
                return(
                    <MenuItem key={idx}><Link smooth={true} duration={200} to={object.description.name}>{object.description.name} <Chip size="small" sx={{color: "white",fontVariant: "all-petite-caps", float: "right"}} label={object.name.split('.').pop()} variant="outlined"/></Link></MenuItem>
                )
            })}
        </Menu>
        </ProSidebar>
    );
}