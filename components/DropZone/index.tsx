import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";

export default function DropZone(props: {
  onUploadedFile: (field: string, value: any) => Promise<any>;
  fieldName: string;
  label?: string;
  className?: string;
  value: string;
}): JSX.Element {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(!!props.value);
  const [imageURL, setImageURL] = useState(props.value ?? "");
  const [imageBlob, setImageBlob] = useState("");

  console.log(props.value);

  return (
    <Dropzone
      onDrop={async (acceptedFiles) => {
        // setUploading(true);
        setImageBlob(URL.createObjectURL(acceptedFiles[0]));
        //  setImageURL(result);
        //  setUploaded(true);
        //  props.onUploadedFile(props.fieldName, result);
        // setUploading(false);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div
              className={cn(
                "shadow-sm border border-dashed w-full text-center p-3 min-h-[100px] flex items-center flex-col justify-center gap-3 rounded-md cursor-pointer hover:opacity-70 transition-all",
                props.className
              )}
            >
              <small className="opacity-50">
                {uploading === true ? (
                  "uploading..."
                ) : (
                  <>{props.label ?? "Drop or click to select an image"}</>
                )}
              </small>
              {imageBlob && (
                <div className="h-[100px]">
                  <Image
                    src={imageBlob}
                    alt="uploaded image"
                    width={500}
                    height={500}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
}
