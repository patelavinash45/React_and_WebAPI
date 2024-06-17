import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MenuList = ({ open, anchorEl }) => {

    const navigate = useNavigate();
    const onLogOutClick = () => {
        navigate('/');
    }

    return (
        <Menu
            open={open}
            anchorEl={anchorEl}
        >
            <MenuItem>My Profile</MenuItem>
            <MenuItem>Log Out</MenuItem>
            <MenuItem onClick={onLogOutClick}>Log Out</MenuItem>
        </Menu>
    );
};

export default MenuList;