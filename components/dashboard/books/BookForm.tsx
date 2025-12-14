"use client";
import FormImageInput from "@/components/form-components/FormImageInput";
import FormInput from "@/components/form-components/FormInput";
import FormTextarea from "@/components/form-components/FormTextarea";
import { Button } from "@/components/ui/Button";
import { useAddBook, useUpdateBook } from "@/hooks/useBooks";
import { useToast } from "@/hooks/useToast";
import { getBookImageUrl, urlToObject } from "@/utils";
import { BookFormSchema } from "@/validations/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";
import { useForm } from "react-hook-form";

const BookForm = ({ editBook }: { editBook?: BookRow }) => {
  const [imagePreview, setImagePreview] = useState<string | null>();

  const { showToast } = useToast();

  const { mutate: addBook, isPending: pendingAdd } = useAddBook();
  const { mutate: updateBook, isPending: pendingUpdate } = useUpdateBook();
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<BookFormData>({
    resolver: yupResolver(BookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      image: null,
      summary: "",
      total_books: 0,
    },
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = (data: BookFormData) => {
    if (!editBook) {
      addBook(
        { BookFormData: data },
        {
          onSuccess: (data) => {
            showToast(data.message, "success");
            reset();
            setImagePreview("");
            router.refresh();
          },
          onError: (error) => {
            showToast(error.message, "error");
          },
        }
      );
    } else {
      const imageKey = editBook?.image?.split("/")[2] ?? "";
      updateBook(
        { BookFormData: data, bookId: editBook.id, imageKey },
        {
          onSuccess: (data) => {
            showToast(data.message, "success");
            router.refresh();
          },
          onError: (error) => {
            showToast(error.message, "error");
          },
        }
      );
    }
  };

  const setEditBook = useEffectEvent(async (editBook: BookRow) => {
    setImagePreview(
      `${getBookImageUrl(editBook.image)}?v=${editBook.updated_at}`
    );
    reset({
      ...editBook,
      image: await urlToObject(editBook.image ?? ""),
      genre: Array(editBook.genre).join(" "),
    });
  });

  useEffect(() => {
    if (editBook) {
      setEditBook(editBook);
    }
  }, [editBook]);

  return (
    <div className="w-2/3">
      <Button
        className="max-w-[110]! max-h-10! mt-0! pr-2!"
        label="Go back"
        prefixIcon={<ArrowLeft />}
        variant="white"
        onClick={() => router.back()}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-5">
        <FormInput
          control={control}
          name="title"
          errors={errors}
          label="Book Title"
          inputClassName="bg-white border-[#CBD5E1]!"
          labelClassName="text-black"
          placeholder="Enter the book title"
        />
        <FormInput
          control={control}
          name="author"
          errors={errors}
          label="Author"
          inputClassName="bg-white border-[#CBD5E1]!"
          labelClassName="text-black"
          placeholder="Enter the author name"
        />
        <FormInput
          control={control}
          name="genre"
          errors={errors}
          label="Genre"
          inputClassName="bg-white border-[#CBD5E1]!"
          labelClassName="text-black"
          placeholder="Enter the genre of the book"
        />
        <FormInput
          control={control}
          name="total_books"
          errors={errors}
          label="Total number of books"
          inputClassName="bg-white border-[#CBD5E1]!"
          labelClassName="text-black"
          placeholder="Enter the total number of books"
        />
        <FormImageInput
          control={control}
          name="image"
          errors={errors}
          setImagePreview={setImagePreview}
          labelClassName="text-black"
          uploadTrigger={
            <button
              type="button"
              className={`bg-white w-full border ${errors && errors.image ? "border-red-500" : "border-[#CBD5E1]"}  flex items-center justify-center rounded px-5 py-4`}>
              <Upload className="text-[#64748B] mr-3" />
              <p className="text-[#64748B]">Upload an image</p>
            </button>
          }
          label="Book image"
        />

        <div className="relative w-full mt-5 max-w-[120px] h-32 rounded-sm border overflow-hidden">
          {imagePreview && (
            <button
              type="button"
              onClick={() => {
                setValue("image", null, { shouldValidate: true });
                setImagePreview("");
              }}
              className="absolute top-1 right-1 z-20 p-1 bg-white/80 hover:bg-white rounded-full shadow"
              aria-label="Remove image">
              <X className="size-4 text-red-600" />
            </button>
          )}

          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Book cover preview"
              fill
              className="object-contain p-1"
            />
          ) : (
            <p className="flex h-full items-center justify-center text-xs text-gray-500 text-center px-2">
              No image uploaded yet
            </p>
          )}
        </div>

        <FormTextarea
          control={control}
          name="summary"
          errors={errors}
          label="Book Summary"
          inputClassName="bg-white border-[#CBD5E1]! h-40!"
          labelClassName="text-black"
          placeholder="Write a brief summary of the book"
        />
        <Button
          isPending={pendingAdd || pendingUpdate}
          label={editBook ? "Update Book" : "Create Book"}
          variant="brand1"
        />
      </form>
    </div>
  );
};

export default BookForm;
