const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
const fileNameDisplay = document.getElementById("fileName");
const resumeDisplay = document.getElementById("summaryText");

const preventDefaults = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  uploadBox.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach(() => {
  uploadBox.addEventListener(
    "dragenter",
    () => {
      uploadBox.classList.add("dragged");
    },
    false,
  );
});

["dragleave", "drop"].forEach((eventName) => {
  uploadBox.addEventListener(eventName, () => {
    uploadBox.classList.remove("dragged");
  });
});

const handleDrop = (e) => {
  let dt = e.dataTransfer;
  let files = dt.files;
  processFiles(files);
};

uploadBox.addEventListener("drop", handleDrop, false);

uploadBox.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  processFiles(e.target.files);
});

const processFiles = (files) => {
  const arrayFiles = [...files];

  if (arrayFiles.length > 0) {
    sendToAI(arrayFiles[0]);
  } else {
    alert("Error uploading the file");
    return;
  }
};

const GEMINI_API_KEY = "your-actual-api-key-here";

const fileToGenerativePart = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.readAsDataURL(file);
  });
};

const sendToAI = async (file) => {
  fileNameDisplay.textContent = `Gemini is reading: ${file.name} ⏳...`;

  try {
    const filePart = await fileToGenerativePart(file);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Summarize this document in the same language as the original document." },
                filePart,
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Complete response from Gemini:", data);

    const resume = data.candidates[0].content.parts[0].text;

    resumeDisplay.textContent = resume;
    fileNameDisplay.textContent = `✅ Summary completed!`;
  } catch (error) {
    console.error("Error processing with AI:", error);
    fileNameDisplay.textContent = `❌ Failed to summarize the file.`;
  }
};
