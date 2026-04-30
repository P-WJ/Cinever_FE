import axios from "axios";
import { mockKeywords } from "./mockData";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";

export const fetchKeywords = async (review) => {
  if (useMockApi) {
    const lowerReview = review?.toLowerCase() || "";
    const matchedKeywords = mockKeywords.filter((keyword) =>
      lowerReview.includes(keyword)
    );

    return matchedKeywords.length ? matchedKeywords : mockKeywords.slice(0, 3);
  }

  try {
    // [TODO] Update this URL when the AI server is deployed.
    const res = await axios.post("http://localhost:5050/analyze", {
      review,
    });
    return res.data.keywords;
  } catch (err) {
    console.error("Keyword extraction failed:", err);
    return [];
  }
};
