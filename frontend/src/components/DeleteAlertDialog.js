import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const DeleteAlertDialog = ({ isOpen, onClose, cancelRef, handleDelete, t }) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("donor:deleteTitleDonor")}
          </AlertDialogHeader>

          <AlertDialogBody>{t("donor:deleteSubtitleDonor")}</AlertDialogBody>

          <AlertDialogFooter>
            <button
              ref={cancelRef}
              onClick={onClose}
              className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded mr-2"
            >
              {t("donor:deleteCancelDonor")}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              {t("common:deleteButtonLabel")}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
