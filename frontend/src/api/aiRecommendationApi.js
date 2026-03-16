import axios from "axios";

export const getAiRecommendation = async (payload) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/appointments/ai-recommendation`,
      payload
    );
    return response.data;
  } catch (err) {
    console.error("AI Recommendation API error:", err.response || err);
    return { busyLabel: "unknown" }; // fallback so your frontend doesn't break
  }
};
