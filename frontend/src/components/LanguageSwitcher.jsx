import React, { useState } from "react";
import {
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    ListItemText,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../i18n";

/**
 * Compact language picker rendered in the AppBar. Persists the selection
 * via i18next's LanguageDetector (localStorage), so the chosen language
 * survives reloads.
 */
const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSelect = (lng) => {
        i18n.changeLanguage(lng);
        handleClose();
    };

    // i18n.resolvedLanguage normalises "zh-CN" → "zh" for us.
    const current = i18n.resolvedLanguage || i18n.language;

    return (
        <>
            <Tooltip title={t("common.language")}>
                <IconButton
                    aria-label={t("common.language")}
                    onClick={handleOpen}
                    sx={{ color: "white" }}
                    size="large"
                >
                    <TranslateIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                {supportedLanguages.map(({ code, labelKey }) => (
                    <MenuItem
                        key={code}
                        selected={code === current}
                        onClick={() => handleSelect(code)}
                    >
                        <ListItemText primary={t(labelKey)} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LanguageSwitcher;
