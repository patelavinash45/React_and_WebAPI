import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { Cart } from "../../../Store/Store";
import { useEffect } from "react";
import { GetCartList } from "../../../API/APICall";
import { useState } from "react";
import MenuList from "./MenuList";
import CartModal from "./CartModal";

const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [isShowModal, setIsShowModal] = useState(false);
    const cartList = useSelector(state => state);
    let count = 0;
    cartList.map(cart => {
        count += cart.getcart[2];
    });
    const addDataDispatch = useDispatch();

    const fetchCartData = async () => {
        const result = await GetCartList(1);
        if (result.IsSusses) {
            addDataDispatch(Cart.actions.storeCartData(result.Data));
        }
    }

    const onCartIconsClick = () => {
        if (count > 0) {
            setIsShowModal(true);
        }
    }

    const onModelClose = () => {
        setIsShowModal(false);
    }

    const onAvatarIconsClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    useEffect(() => {
        fetchCartData();
    });

    return (
        <AppBar>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                >
                    Welcome
                </Typography>
                <Badge
                    badgeContent={count}
                    color="secondary"
                    sx={{ marginRight: '1.5rem' }}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        onClick={onCartIconsClick}
                        sx={{ p: '0' }}
                    >
                        <AddShoppingCartIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Badge>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={onAvatarIconsClick}
                    sx={{ p: '0' }}
                >
                    <AccountCircleIcon sx={{ color: 'white' }} />
                </IconButton>
                <MenuList open={Boolean(anchorEl)} anchorEl={anchorEl} />
            </Toolbar>
            {
                isShowModal && <CartModal onModelClose={onModelClose} />
            }
        </AppBar>
    );
};

export default Header;