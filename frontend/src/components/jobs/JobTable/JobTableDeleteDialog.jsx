import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const JobTableDeleteDialog = ({
    open,
    onClose,
    onConfirm,
    jobToDelete,
    error,
}) => {
    const { t } = useTranslation();
    const showOnlyError = Boolean(error);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {showOnlyError ? t("common.errors.title") : t("jobs.delete")}
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {showOnlyError ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    t("common.deleteConfirm.message", {
                        resource: t("jobs.resourceType"),
                        name: jobToDelete,
                    })
                )}
            </DialogContent>

            <DialogActions>
                {!showOnlyError && (
                    <Button onClick={onClose} color="primary">
                        {t("common.actions.cancel")}
                    </Button>
                )}
                {!showOnlyError && (
                    <Button
                        onClick={onConfirm}
                        color="error"
                        variant="contained"
                    >
                        {t("common.actions.delete")}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default JobTableDeleteDialog;
