import React from "react";
import {
    TableHead,
    TableRow,
    TableCell,
    Typography,
    Button,
    Box,
    useTheme,
    alpha,
} from "@mui/material";
import { ArrowDownward, ArrowUpward, UnfoldMore } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import JobFilters from "./JobFilters";

const JobTableHeader = ({
    filters,
    uniqueStatuses,
    allNamespaces,
    allQueues,
    anchorEl,
    handleFilterClick,
    handleFilterClose,
    sortDirection,
    toggleSortDirection,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    // Filterable columns. `key` is the filter identifier (matches the
    // shape of `filters`/`anchorEl`) — `label` is what we render.
    const filterColumns = [
        {
            key: "namespace",
            label: t("common.table.namespace"),
            options: allNamespaces,
        },
        {
            key: "queue",
            label: t("common.table.queue"),
            options: allQueues,
        },
    ];

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    sx={{
                        backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.8,
                        ),
                        backdropFilter: "blur(8px)",
                        padding: "16px 24px",
                        minWidth: 140,
                        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight="700"
                        color="text.primary"
                    >
                        {t("common.table.name")}
                    </Typography>
                </TableCell>

                {filterColumns.map(({ key, label, options }) => (
                    <TableCell
                        key={key}
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.background.paper,
                                0.8,
                            ),
                            backdropFilter: "blur(8px)",
                            padding: "16px 24px",
                            borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="700"
                                color="text.primary"
                            >
                                {label}
                            </Typography>
                            <JobFilters
                                filterType={key}
                                currentValue={filters[key]}
                                options={options}
                                handleFilterClick={handleFilterClick}
                                handleFilterClose={handleFilterClose}
                                anchorEl={anchorEl[key]}
                            />
                        </Box>
                    </TableCell>
                ))}

                <TableCell
                    sx={{
                        backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.8,
                        ),
                        backdropFilter: "blur(8px)",
                        padding: "16px 24px",
                        minWidth: 140,
                        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight="700"
                        color="text.primary"
                    >
                        {t("common.table.creationTime")}
                    </Typography>
                    <Button
                        size="small"
                        onClick={toggleSortDirection}
                        startIcon={
                            sortDirection === "desc" ? (
                                <ArrowDownward fontSize="small" />
                            ) : sortDirection === "asc" ? (
                                <ArrowUpward fontSize="small" />
                            ) : (
                                <UnfoldMore fontSize="small" />
                            )
                        }
                        sx={{
                            textTransform: "none",
                            padding: "4px 12px",
                            minWidth: "auto",
                            borderRadius: "20px",
                            marginTop: "8px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            letterSpacing: "0.02em",
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1,
                            ),
                            color: theme.palette.primary.main,
                            "&:hover": {
                                backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.15,
                                ),
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        {t("common.actions.sort")}
                    </Button>
                </TableCell>

                <TableCell
                    sx={{
                        backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.8,
                        ),
                        backdropFilter: "blur(8px)",
                        padding: "16px 24px",
                        minWidth: 140,
                        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight="700"
                        color="text.primary"
                    >
                        {t("common.table.status")}
                    </Typography>
                    <JobFilters
                        filterType="status"
                        currentValue={filters.status}
                        options={uniqueStatuses}
                        handleFilterClick={handleFilterClick}
                        handleFilterClose={handleFilterClose}
                        anchorEl={anchorEl.status}
                    />
                </TableCell>

                {/* New Actions Column */}
                <TableCell
                    sx={{
                        backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.8,
                        ),
                        backdropFilter: "blur(8px)",
                        padding: "16px 24px",
                        minWidth: 140,
                        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight="700"
                        color="text.primary"
                        sx={{ letterSpacing: "0.02em" }}
                    >
                        {t("common.table.actions")}
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default JobTableHeader;
