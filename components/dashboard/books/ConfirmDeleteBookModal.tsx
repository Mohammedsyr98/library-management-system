import BaseDialog from "@/components/BaseDialog";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import warningIcon from "@/public/images/Warning.png";

interface ConfirmDeleteBookModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedBook: BookRow | null;
  setSelectedBook: (value: BookRow | null) => void;
  isPending: boolean;
  onDelete: () => void;
}
const ConfirmDeleteBookModal = ({
  isOpen,
  setIsOpen,
  selectedBook,
  setSelectedBook,
  isPending,
  onDelete,
}: ConfirmDeleteBookModalProps) => {
  return (
    <BaseDialog
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open)
          setTimeout(() => {
            setSelectedBook(null);
          }, 200);
      }}
      title="Delete Book"
      description={
        <>
          Are you sure you want to delete{" "}
          <span className="font-medium">{selectedBook?.title} </span>book?
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
                setSelectedBook(null);
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

export default ConfirmDeleteBookModal;
