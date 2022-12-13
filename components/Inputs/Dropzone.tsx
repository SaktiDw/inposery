import imageCompression from "browser-image-compression";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  setFieldValue: any;
  value: string;
  name: string;
  label: string;
  errors: any;
};

const Dropzone = (props: Props) => {
  const [img, setImg] = useState<any>();

  const { getRootProps, getInputProps, fileRejections, isDragReject } =
    useDropzone({
      maxFiles: 1,
      maxSize: 5048000,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".*"],
      },
      onDrop: (acceptedFiles, fileRejections) => {
        setImg("");
        props.setFieldValue("image", "");
        if (acceptedFiles[0]) {
          var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          imageCompression(acceptedFiles[0], options)
            .then(function (compressedFile) {
              alert(
                `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
              ); // smaller than maxSizeMB
              setImg(URL.createObjectURL(compressedFile));
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  return props.setFieldValue("image", fileReader.result);
                }
              };
              fileReader.readAsDataURL(compressedFile);
            })
            .catch(function (error) {
              alert(error.message);
            });
        }
      },
    });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(img);
  }, [img]);

  return (
    <section className="container flex flex-col gap-4">
      <label
        htmlFor={props.name}
        className="font-semibold leading-tight text-slate-800 dark:text-white"
      >
        {props.label}
      </label>

      <div
        {...getRootProps({
          className:
            "dropzone w-full h-[150px] bg-slate-50 dark:bg-slate-800 border-4 border-dashed border-slate-400 dark:border-slate-700 rounded-lg flex items-center justify-center text-center",
        })}
      >
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>

      {props.value && img && (
        <section className="relative flex items-center justify-center w-full h-[300px] rounded-lg overflow-hidden">
          <Image
            src={img}
            blurDataURL={img}
            placeholder="blur"
            alt=""
            quality={50}
            fill
            className="object-cover"
            loading="eager"
            onLoad={() => {
              URL.revokeObjectURL(img);
            }}
          />
        </section>
      )}

      <ul>
        {fileRejections[0]?.errors.map((item: any) => {
          if (item.code === "file-too-large")
            return (
              <li key={item.code} className="text-red-500">
                Max file size is 2Mb!
              </li>
            );
          if (item.code === "file-invalid-type")
            return (
              <li key={item.code} className="text-red-500">
                File must be an Image!
              </li>
            );
          return;
        })}
      </ul>
    </section>
  );
};

export default Dropzone;
