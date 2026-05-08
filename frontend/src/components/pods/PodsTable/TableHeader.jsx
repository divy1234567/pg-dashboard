import React from "react";
import {
    TableHead,
    TableRow,
    TableCell,
    Button,
    Typography,
    useTheme,
    alpha,
} from "@mui/material";
import {
    ArrowDownward,
    ArrowUpward,
    FilterList,
    UnfoldMore,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { localiseFilterValue } from "../../utils";
import FilterMenu from "./FilterMenu";

const TableHeader = ({
    filters,
    anchorEl,
    handleFilterClick,
    handleFilterClose,
    allNamespaces,
    onSortDirectionToggle,
    sortDirection,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    // Each header keeps a stable English `key` (used for filter lookup
    // and behaviour switches) while exposing a localised `label`.
    const columns = [
        { key: "name", label: t("common.table.name") },
        {
            key: "namespace",
            label: t("common.table.namespace"),
            filterable: true,
        },
        {
            key: "creationTime",
            label: t("common.table.creationTime"),
            sortable: true,
        },
        { key: "status", label: t("common.table.status"), filterable: true },
        { key: "age", label: t("common.table.age") },
    ];

    return (
        <TableHead>
            <TableRow>
                {columns.map(({ key, label, filterable, sortable }) => (
                    <TableCell
                        key={key}
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.background.paper,
                                0.8,
                            ),
                            backdropFilter: "blur(8px)",
                            padding: "16px 24px",
                            minWidth: 140,
                            borderBottom: `2px solid ${alpha(
                                theme.palette.primary.main,
                                0.2,
                            )}`,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight="700"
                            color="text.primary"
                            sx={{ letterSpacing: "0.02em" }}
                        >
                            {label}
                        </Typography>
                        {filterable && (
                            <Button
                                size="small"
                                startIcon={<FilterList fontSize="small" />}
                                onClick={(e) => handleFilterClick(key, e)}
                                sx={{
                                    textTransform: "none",
                                    padding: "4px 12px",
                                    minWidth: "auto",
                                    borderRadius: "20px",
                                    marginTop: "8px",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.02em",
                                    transition:
                                        "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    backgroundColor:
                                        filters[key] !== "All"
                                            ? alpha(
                                                  theme.palette.primary.main,
                                                  0.2,
                                              )
                                            : alpha(
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
                                        boxShadow: `0 4px 8px ${alpha(
                                            theme.palette.primary.main,
                                            0.2,
                                        )}`,
                                    },
                                }}
                            >
                                {t("common.table.filter", {
                                    value: localiseFilterValue(
                                        t,
                                        key,
                                        filters[key],
                                    ),
                                })}
                            </Button>
                        )}
                        {sortable && (
                            <Button
                                size="small"
                                onClick={onSortDirectionToggle}
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
                                    transition:
                                        "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
                                        boxShadow: `0 4px 8px ${alpha(
                                            theme.palette.primary.main,
                                            0.2,
                                        )}`,
                                    },
                                }}
                            >
                                {t("common.actions.sort")}
                            </Button>
                        )}
                    </TableCell>
                ))}
            </TableRow>
            <FilterMenu
                anchorEl={anchorEl.namespace}
                handleClose={handleFilterClose}
                items={allNamespaces}
                filterType="namespace"
            />
            <FilterMenu
                anchorEl={anchorEl.status}
                handleClose={handleFilterClose}
                items={["All", "Running", "Pending", "Succeeded", "Failed"]}
                filterType="status"
            />
        </TableHead>
    );
};

export default TableHeader;
