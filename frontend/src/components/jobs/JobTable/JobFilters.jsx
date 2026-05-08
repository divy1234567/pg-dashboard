import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { localiseFilterValue } from "../../utils";

const JobFilters = ({
    filterType,
    currentValue,
    options,
    handleFilterClick,
    handleFilterClose,
    anchorEl,
}) => {
    const { t } = useTranslation();
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
        >
            {options.map((option) => (
                <MenuItem
                    key={option}
                    selected={option === currentValue}
                    onClick={() => handleFilterClick(filterType, option)}
                >
                    {localiseFilterValue(t, filterType, option)}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default JobFilters;
