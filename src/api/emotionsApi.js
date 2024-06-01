//post
const API_URL = "http://localhost:5000/api/emotions";

export const createEmotionRecord = async (emotionData) => {
  // check the emotionData for the required props: videoId, emotion["neutral","happy","sad","angry","fearful","disgusted","surprised"],videoTimestamp, timestamp (optional)
  if (
    !emotionData.videoId ||
    !emotionData.emotion ||
    emotionData.videoTimestamp === undefined
  ) {
    throw new Error("Missing required properties for emotion record");
  }

  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emotionData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating emotion record:", error);
    throw error;
  }
};

//get
export const getEmotionRecords = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching emotion records:", error);
    throw error;
  }
};

//put
export const updateEmotionRecord = async (id, emotionData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emotionData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating emotion record:", error);
    throw error;
  }
};

//delete
export const deleteEmotionRecord = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting emotion record:", error);
    throw error;
  }
};
