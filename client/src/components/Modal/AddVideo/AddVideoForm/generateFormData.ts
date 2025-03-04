interface IArg {
  channelId: number;
  title: string;
  description: string;
  videoFile: File;
  imgFile: File;
}

const generateFormData = (data: IArg): FormData => {
  const formData = new FormData();
  formData.append("channelId", `${data.channelId}`);
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("video", data.videoFile);
  formData.append("preview", data.imgFile);
  return formData;
};

export default generateFormData;
