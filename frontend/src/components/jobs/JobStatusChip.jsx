import React from "react";
import { Chip, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { localiseFilterValue } from "../utils";

const JobStatusChip = ({ status }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const getStatusColor = (status) => {
        switch (status) {
            case "Failed":
                return theme.palette.error.main;
            case "Pending":
                return theme.palette.warning.main;
            case "Running":
                return theme.palette.success.main;
            case "Completed":
                return theme.palette.info.main;
            default:
                return theme.palette.grey[500];
        }
    };

    // Reuse the same lookup the filter UI uses so podgroup/pod phases also
    // localise correctly when this chip is shared across resource pages.
    const displayLabel = status
        ? localiseFilterValue(t, "status", status)
        : t("common.table.unknown");

    return (
        <Chip
            label={displayLabel}
            sx={{
                bgcolor: getStatusColor(status),
                color: "common.white",
            }}
        />
    );
};

export default JobStatusChip;
