import cloudinary from "cloudinary";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: "dzvtmt1im", // Replace with your Cloudinary cloud name
  api_key: "316277894717156",       // Replace with your Cloudinary API key
  api_secret: "IPkIcl_MRNunRKGBQcs72q7T07E", // Replace with your Cloudinary API secret
});

// Upload a video
const uploadVideo = async () => {
  try {
    const result = await cloudinary.v2.uploader.upload("path_to_video/video.mp4", {
      resource_type: "video", // Specify that the resource is a video
      folder: "my_videos",    // Optional: Specify folder name in Cloudinary
    });
    console.log("Video uploaded successfully:", result);
  } catch (error) {
    console.error("Error uploading video:", error);
  }
};

uploadVideo();
