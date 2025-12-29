import BaseDialog from "@/components/BaseDialog";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import warningIcon from "@/public/images/Warning.png";

interface ConfirmDeletUserModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedUser: AllUsersWithBorrowedCountRow | null;
  setSelectedUser: (value: AllUsersWithBorrowedCountRow | null) => void;
  isPending: boolean;
  onDelete: () => void;
}
const ConfirmDeleteUserModal = ({
  isOpen,
  setIsOpen,
  selectedUser,
  setSelectedUser,
  isPending,
  onDelete,
}: ConfirmDeletUserModalProps) => {
  return (
    <BaseDialog
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open)
          setTimeout(() => {
            setSelectedUser(null);
          }, 200);
      }}
      title="Delete User"
      description={
        <>
          Are you sure you want to delete{" "}
          <span className="font-medium">{selectedUser?.full_name}</span>?
          <br />
          <span className="text-red-600 font-medium">
            This action cannot be undone.
          </span>
        </>
      }
      headerIcon={
        <Image src={warningIcon} alt="Warning" width={90} height={90} />
      }
      footer={
        <div className="flex items-center w-full gap-x-4">
          <Button
            onClick={() => {
              setIsOpen(false);
              setTimeout(() => {
                setSelectedUser(null);
              }, 200);
            }}
            variant="gray"
            label="Cancel"
            height="h-12"
          />

          <Button
            onClick={onDelete}
            variant="red"
            isPending={isPending}
            label="Delete"
            height="h-12"
          />
        </div>
      }
    />
  );
};

export default ConfirmDeleteUserModal;
