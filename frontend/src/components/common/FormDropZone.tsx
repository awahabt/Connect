import { useId } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { File, X } from "lucide-react";

const FormDropZone = ({
  form,
  label,
  uploadType = "image",
  mimeTypes = ".jpg, .jpeg, .png, .gif, .webp",
  maxFileSize = 5 * 1024 * 1024, // Add a max file size prop
}: {
  form: any;
  label: string;
  mimeTypes: string;
  uploadType: any;
  maxFileSize?: number; // Define the prop type
}) => {
  const id = useId();

  function extractFileName(url: string) {
    // Extract the part after '@'
    const afterAt = url.split("@")[1];

    // If there is no '@' in the URL, return an empty string
    if (!afterAt) return "";

    // Remove the file extension by splitting on '.' and taking the first part
    const fileName = afterAt.split(".")[0];

    return fileName;
  }

  return (
    <div className="w-full mb-4">
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <div className="bg-[#F0F0F0] text-center outline-dashed outline-2 outline-primary rounded-lg relative cursor-pointer">
              <FormLabel htmlFor={id}>
                <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary text-[16px] font-medium">
                  {label}
                </h2>
              </FormLabel>
              <FormControl>
                <Input
                  id={id}
                  multiple={true}
                  className="h-16 opacity-0 cursor-pointer"
                  accept={mimeTypes}
                  type="file"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];

                        // Check file size
                        if (maxFileSize && file.size > maxFileSize) {
                          toast.warning(
                            `File ${file.name} exceeds the maximum size of ${maxFileSize / 1024 / 1024} MB`,
                          );
                          continue; // Skip this file
                        }

                        const duplicateImages = form
                          .getValues()
                          .file?.find(
                            (attachment: any) => attachment.name === file.name,
                          );

                        if (duplicateImages) {
                          toast.warning("Duplicate Image");
                          continue;
                        } else {
                          const newFiles = [...form.getValues().file, file];
                          field.onChange(newFiles);
                        }
                      }
                    }
                  }}
                />
              </FormControl>
            </div>
            {form.getValues()?.file?.length > 0 && (
              <div className="my-4">
                {form
                  .getValues()
                  ?.file?.map((attachment: any, index: number) => (
                    <div
                      className="inline-flex flex-wrap items-center justify-center"
                      key={index}
                    >
                      <div className="relative">
                        {uploadType === "image" ? (
                          <img
                            src={
                              typeof attachment === "string"
                                ? attachment
                                : URL.createObjectURL(attachment)
                            }
                            alt="preview"
                            className="h-24 w-40 border-2 object-cover rounded-xl mx-2"
                          />
                        ) : uploadType === "video" ? (
                          <video
                            src={
                              typeof attachment === "string"
                                ? attachment
                                : URL.createObjectURL(attachment)
                            }
                            controls
                            className="h-24 w-40 border-2 object-cover rounded-xl mx-2"
                          />
                        ) : uploadType === "file" ? (
                          <div className="max:w-40 flex flex-col items-center border-2 p-2 mx-2 rounded-xl">
                            <File size={80} color="black" />
                            <a
                              href={
                                typeof attachment === "string"
                                  ? attachment
                                  : URL.createObjectURL(attachment)
                              }
                              download
                              className="object-contain rounded-xl mx-2 line-clamp-1 max-w-32"
                            >
                              {attachment.name
                                ? attachment.name
                                : extractFileName(attachment)}
                            </a>
                          </div>
                        ) : null}

                        <X
                          className="absolute top-0 right-0 cursor-pointer bg-red-700 rounded-full p-1"
                          size={20}
                          color="white"
                          onClick={() => {
                            const newAttachments = form
                              .getValues()
                              .file?.filter((attach: any) =>
                                typeof attach === "string"
                                  ? attach !== attachment
                                  : attach.name !== attachment.name,
                              );

                            field.onChange(newAttachments);
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormDropZone;
