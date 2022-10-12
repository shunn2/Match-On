const imageExtension = ["jpeg", "jpg", "png"];

const getFileExtension = (fileVal: string) => {
  const fileLength = fileVal.length;
  const fileDot = fileVal.lastIndexOf(".");
  const fileExtension = fileVal
    .substring(fileDot + 1, fileLength)
    .toLowerCase();

  return imageExtension.includes(fileExtension);
};

export default getFileExtension;
