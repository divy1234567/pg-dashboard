import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { localiseFilterValue } from "../../utils";

const FilterMenu = ({ anchorEl, handleClose, items, filterType }) => {
    const { t } = useTranslation();
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose(filterType, null)}
        >
            {items.map((item) => (
                <MenuItem
                    key={item}
                    onClick={() => handleClose(filterType, item)}
                >
                    {localiseFilterValue(t, filterType, item)}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default FilterMenu;
