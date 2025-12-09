import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, ReactNode } from "react";

interface BaseDialogProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  trigger?: ReactNode;
  children?: ReactNode;
  className?: string;
  title: string;
  description: ReactNode;
  headerIcon?: ReactNode;
  footer?: ReactNode;
}

const BaseDialog: FC<BaseDialogProps> = ({
  isOpen,
  onOpenChange,
  trigger,
  title,
  description,
  headerIcon,
  children,
  footer,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-sm rounded-2xl border border-gray-200 p-6 bg-white">
        <DialogHeader className="flex flex-col items-center space-y-4">
          {headerIcon && <div>{headerIcon}</div>}
          <DialogTitle className="text-xl text-center font-semibold">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children}

        {footer && (
          <DialogFooter className="mt-6 flex justify-center gap-3">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BaseDialog;

/* <Dialog open={dialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="text-black hover:text-red-600 transition-colors duration-200">
            <FaRegTrashAlt />
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-sm rounded-2xl border border-gray-200  p-6 bg-white">
          <DialogHeader className="space-y-4">
            <div className="flex justify-center">
              <Image
                src={warningIcon}
                alt="Warning-icon"
                width={90}
                height={90}
              />
            </div>

            <DialogTitle className="text-xl font-semibold text-center text-gray-900">
              Delete User
            </DialogTitle>

            <DialogDescription className="text-sm text-gray-600 leading-relaxed text-center">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">{row.full_name}</span>
              ?
              <br />
              <span className="text-red-600 font-medium">
                This action cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex justify-center gap-3">
            <DialogClose asChild>
              <button
                disabled={pendingDelete}
                onClick={() => setIsDialogOpen(false)}
                className="
            px-4 py-2 rounded-md 
            bg-gray-100 text-gray-700 
            hover:bg-gray-200 
            disabled:opacity-50 
            transition-colors duration-200
          ">
                Cancel
              </button>
            </DialogClose>

            <DialogClose asChild>
              <button
                disabled={pendingDelete}
                onClick={() => handleDeleteUser({ userId: row.id })}
                className="
            px-4 py-2 rounded-md 
            bg-brand5 text-white 
            hover:bg-red-700 
            disabled:opacity-50 
            transition-colors duration-200 
            flex items-center gap-2
          ">
                {pendingDelete ? (
                  <Oval
                    height={18}
                    width={18}
                    color="white"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#ffffff"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                ) : null}
                Delete
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
       */
