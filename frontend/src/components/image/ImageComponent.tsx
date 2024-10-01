import React, {
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from 'axios'

interface ImageComponentProps {
  id?: string;
  disabled?: boolean;
  label?: string;
  onChange?: (attachment: File) => void;
  placeholder?: string;
  image?: string;
}

const ImageComponent: FunctionComponent<ImageComponentProps> = ({
  id,
  disabled = false,
  placeholder = 'upload attachment here',
  // onChange,
  image,
}): ReactElement => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  const handleSubmit = async (event) => {
    event?.preventDefault();
    console.log("we here")
    console.log(file)
    if (!file) return

    const formData = new FormData();
    formData.append('image', file)

    try {
      const response = await axios.post('http://localhost:8000/api/color-palette', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response)
    } catch (error) {
      console.error("submit error: ", error)
    }
  }

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      const selectedFile = files && files[0];
      if (selectedFile) {
        // onChange(selectedFile);
        setFile(selectedFile)

        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) setImgSrc(e.target.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    },
    [setImgSrc]
    // [onChange, setImgSrc]
  );

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add('border-gray-500');
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-gray-500');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-gray-500');
    }

    const files = event.dataTransfer.files;
    handleFileSelect(files);
  };

  return (
      <div
        ref={dropAreaRef}
        className="flex h-[200px] w-[300px] items-center justify-center rounded-lg border border-gray-300"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imgSrc ? (
          <img src={imgSrc} alt="Preview" className="size-full rounded-lg object-cover" />
        ) : (
          <p>{placeholder}</p>
        )}
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={disabled}
          style={{ display: 'none' }}
        />
      <button
        onClick={handleSubmit}
      />
      </div>
  );
};

export default ImageComponent;
