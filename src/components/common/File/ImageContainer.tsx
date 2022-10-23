import Image from "next/image";

interface FileProps {
  fileName: string;
  url: string;
  size?: number[];
}

const ImageContainer: React.FC<FileProps> = (props) => {
  return (
    <div>
      <Image
        src={props.url}
        alt={props.fileName}
        width={props.size ? props.size[0] : 300}
        height={props.size ? props.size[1] : 300}
      />
    </div>
  );
};

export default ImageContainer;
