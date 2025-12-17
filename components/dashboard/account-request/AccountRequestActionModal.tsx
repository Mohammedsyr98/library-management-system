import BaseDialog from "@/components/BaseDialog";
import successIcon from "@/public/images/success.png";
import warningIcon from "@/public/images/Warning.png";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface AccountRequestActionModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedRequest: AccountRequestDecision | null;
  setSelectedRequest: (value: AccountRequestDecision | null) => void;
  isPending: boolean;
  onConfirm: () => void;
}

const AccountRequestActionModal = ({
  isOpen,
  setIsOpen,
  selectedRequest,
  setSelectedRequest,
  isPending,
  onConfirm,
}: AccountRequestActionModalProps) => {
  const isApproveAction = selectedRequest?.action === "Approve";
  return (
    <BaseDialog
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open)
          setTimeout(() => {
            setSelectedRequest(null);
          }, 200);
      }}
      title={
        isApproveAction ? "Approve Account Request" : "Deny Account Request"
      }
      description={
        <span>
          {isApproveAction
            ? "Approve the student’s account request and grant access."
            : "Deny this request based on unsuccessful ID card verification."}
        </span>
      }
      headerIcon={
        isApproveAction ? (
          <Image src={successIcon} alt="Approve" width={90} height={90} />
        ) : (
          <Image src={warningIcon} alt="Reject" width={90} height={90} />
        )
      }
      footer={
        <div className="flex items-center w-full gap-x-4">
          <Button
            onClick={onConfirm}
            variant={isApproveAction ? "green" : "red"}
            isPending={isPending}
            label={isApproveAction ? "Approve" : "Deny"}
            height="h-12"
          />
        </div>
      }
    />
  );
};

export default AccountRequestActionModal;
